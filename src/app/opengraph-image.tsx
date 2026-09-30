import { ImageResponse } from "next/og";

export const alt = "Elite Restorations: remodeling and restoration in Houston";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0d0d0c",
          color: "#f4efe6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 6, background: "#b3261e" }} />
          <div style={{ fontSize: 26, letterSpacing: 8, textTransform: "uppercase", opacity: 0.75 }}>
            Houston, TX · Since 1993
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, lineHeight: 1.02, fontWeight: 600 }}>From storm damage</div>
          <div style={{ fontSize: 112, lineHeight: 1.02, fontWeight: 600, color: "#e0554b" }}>
            to finished room.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, opacity: 0.85 }}>
          <div style={{ letterSpacing: 6, textTransform: "uppercase" }}>Elite Restorations</div>
          <div>(713) 909-0034</div>
        </div>
      </div>
    ),
    size,
  );
}
