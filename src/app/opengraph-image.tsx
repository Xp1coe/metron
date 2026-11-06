import { ImageResponse } from "next/og";
import { integrationCatalog } from "@/data/integrations";
import { categoryCount } from "@/lib/site-metadata";

export const alt =
  "Metron Security Case Snapshots: searchable security and ITOps platform integration catalog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#f8faff",
        color: "#0f172a",
        padding: "72px",
        flexDirection: "column",
        justifyContent: "space-between",
        borderTop: "16px solid #0739cf",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "#0739cf",
          fontWeight: 700,
        }}
      >
        METRON SECURITY
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 80,
            fontWeight: 700,
            letterSpacing: "-3px",
          }}
        >
          Case Snapshots
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#475569" }}>
          Security and ITOps platform integrations
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 26, color: "#0739cf" }}>
        {integrationCatalog.length} platforms · {categoryCount} categories
      </div>
    </div>,
    size,
  );
}
