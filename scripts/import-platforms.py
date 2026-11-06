"""Import the user-supplied platform workbook with Python's standard library.

Run: python scripts/import-platforms.py [--check]
No network lookups or invented descriptions are used.
"""
import collections
import html
import json
from pathlib import Path
import re
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
records = [{
    "id": slug(name),
    "serviceName": name,
    "image": {"src": f"/images/services/{slug(name)}.svg", "alt": name},
    "platform": name,
    "category": ", ".join(categories),
    "categories": categories,
    "integrations": [{"id": f"{slug(name)}-integration", "name": name, "description": ""}],
} for name, categories in groups.items()]
assert len({record["id"] for record in records}) == len(records), "Platform ID collision"

header = '''import type { Integration } from "@/features/integrations/types";

/** Imported from tests/Platform List.xlsx. Names and category assignments are preserved.
 * The workbook does not supply logos, integration titles, or descriptions.
 * Platform names serve as integration labels; descriptions remain empty.
 * Local SVGs are text placeholders, not official brand artwork.
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
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="180" height="150" viewBox="0 0 180 150"><rect width="180" height="150" rx="12" fill="white"/><text x="90" y="78" text-anchor="middle" dominant-baseline="middle" font-family="Arial,sans-serif" font-size="24" font-weight="700" fill="#0739cf" textLength="{text_width}" lengthAdjust="spacingAndGlyphs">{html.escape(name)}</text></svg>\n'
        image_path = ROOT / "public" / record["image"]["src"].lstrip("/")
        image_path.write_text(svg, encoding="utf-8")

print(f'{len(records)} platforms; {sum(len(categories) for categories in groups.values())} category assignments; {len({c for categories in groups.values() for c in categories})} categories. ' + ("Verified." if "--check" in sys.argv else "Imported."))
