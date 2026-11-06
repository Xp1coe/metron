"""Import the user-supplied platform workbook with Python's standard library.

Run: python scripts/import-platforms.py [--check]
No network lookups or invented descriptions are used.
"""
import collections
import colorsys
import html
import json
from pathlib import Path
import re
import struct
import sys
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tests" / "Platform List.xlsx"
TARGET = ROOT / "src" / "data" / "integrations.ts"
NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def slug(value):
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def read_platforms():
    groups = collections.OrderedDict()
    with zipfile.ZipFile(SOURCE) as workbook:
        strings = ["".join(node.itertext()) for node in ET.fromstring(workbook.read("xl/sharedStrings.xml")).findall("m:si", NS)]
        sheet = ET.fromstring(workbook.read("xl/worksheets/sheet1.xml"))
        for row in sheet.findall("m:sheetData/m:row", NS):
            cells = {}
            for cell in row.findall("m:c", NS):
                value = cell.find("m:v", NS)
                if value is not None:
                    cells[re.sub(r"\d", "", cell.get("r"))] = strings[int(value.text)] if cell.get("t") == "s" else value.text
            category, names = cells.get("A"), cells.get("B")
            if not category or not names or category == "Categories":
                continue
            for name in names.split(","):
                name = name.strip()
                if name:
                    categories = groups.setdefault(name, [])
                    if category not in categories:
                        categories.append(category)
    return groups


groups = read_platforms()

# Match identifiable company tiles and share vendor artwork with product entries.
def normalize_company(value):
    return re.sub(r"[^a-z0-9]", "", value.lower())


company_images = {}
for image in sorted((ROOT / "public" / "companies").glob("*.png")):
    data = image.read_bytes()
    if data[:8] != b"\x89PNG\r\n\x1a\n":
        continue
    width, height = struct.unpack(">II", data[16:24])
    if min(width, height) < 160 or not 0.8 <= width / height <= 1.25:
        continue
    name = re.sub(r"_[0-9a-f]{10}$", "", image.stem, flags=re.IGNORECASE)
    name = re.sub(r"(?:_\d+)+$", "", name)
    company_images[normalize_company(name)] = f"/companies/{image.name}"

VENDOR_ALIASES = {
    "Palo Alto Networks Prisma Cloud": "Palo Alto Networks",
    "Check Point CloudGuard": "Check Point",
    "Microsoft Defender for Cloud": "Microsoft",
    "Google Security Command Center": "Google",
    "Tenable Cloud Security": "Tenable",
    "Rapid7 InsightCloudSec": "Rapid7",
    "Qualys TotalCloud": "Qualys",
    "Lacework FortiCNAPP": "Lacework",
    "Zscaler Posture Control": "Zscaler",
    "F5 Distributed Cloud Services": "F5 Networks",
}


def image_source(name):
    vendor = VENDOR_ALIASES.get(name, name)
    return company_images.get(normalize_company(vendor), f"/images/services/{slug(name)}.svg")


def palette(index):
    # Golden-angle spacing gives every record a distinct hue and readable text.
    hue = (index * 0.618033988749895) % 1
    def color(lightness, saturation):
        return "#" + "".join(f"{round(channel * 255):02x}" for channel in colorsys.hls_to_rgb(hue, lightness, saturation))
    return {"foreground": color(0.28, 0.62), "background": color(0.97, 0.55), "border": color(0.82, 0.42)}


records = [{
    "id": slug(name),
    "serviceName": name,
    "image": {"src": image_source(name), "alt": f"{name} platform integration listed under {' and '.join(categories)}"},
    "platform": name,
    "category": ", ".join(categories),
    "categories": categories,
    "palette": palette(index),
    "integrations": [{"id": f"{slug(name)}-integration", "name": name, "description": ""}],
} for index, (name, categories) in enumerate(groups.items())]
assert len({record["id"] for record in records}) == len(records), "Platform ID collision"

header = '''import type { Integration } from "@/features/integrations/types";

/** Imported from tests/Platform List.xlsx. Names and category assignments are preserved.
 * The workbook does not supply logos, integration titles, or descriptions.
 * Platform names serve as integration labels; descriptions remain empty.
 * Supplied company images are used when matched; colored SVGs are fallbacks.
 * Regenerate with: python scripts/import-platforms.py
 */
export const integrationCatalog: Integration[] = '''
content = header + json.dumps(records, ensure_ascii=False, indent=2) + ";\n"
if "--check" in sys.argv:
    assert TARGET.read_text(encoding="utf-8") == content, "Catalog differs from workbook; rerun the import"
    for record in records:
        assert (ROOT / "public" / record["image"]["src"].lstrip("/")).exists(), record["image"]["src"]
else:
    TARGET.write_text(content, encoding="utf-8")
    image_dir = ROOT / "public" / "images" / "services"
    image_dir.mkdir(parents=True, exist_ok=True)
    for record in records:
        name = record["platform"]
        # textLength keeps long platform names readable within every card.
        text_width = min(150, len(name) * 13)
        colors = record["palette"]
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="180" height="150" viewBox="0 0 180 150"><rect x="0.5" y="0.5" width="179" height="149" rx="12" fill="{colors["background"]}" stroke="{colors["border"]}"/><text x="90" y="78" text-anchor="middle" dominant-baseline="middle" font-family="Arial,sans-serif" font-size="24" font-weight="700" fill="{colors["foreground"]}" textLength="{text_width}" lengthAdjust="spacingAndGlyphs">{html.escape(name)}</text></svg>\n'
        # Keep supplied PNGs unchanged when regenerating fallback artwork.
        image_path = image_dir / f'{record["id"]}.svg'
        image_path.write_text(svg, encoding="utf-8")

print(f'{len(records)} platforms; {sum(len(categories) for categories in groups.values())} category assignments; {len({c for categories in groups.values() for c in categories})} categories. ' + ("Verified." if "--check" in sys.argv else "Imported."))
print(f'{sum(record["image"]["src"].startswith("/companies/") for record in records)} platforms use supplied company images; the remainder use colored fallbacks.')
