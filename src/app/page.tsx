import CaseSnapshots from "@/components/case-snapshots";
import DriftWallSnapshots from "@/components/drift-wall-snapshots";
import { integrationStructuredData } from "@/lib/site-metadata";

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(integrationStructuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <CaseSnapshots />
      <DriftWallSnapshots />
    </main>
  );
}
