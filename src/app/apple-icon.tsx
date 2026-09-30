import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0d0c",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 32 32" fill="none">
          <path d="M3 17 16 6l13 11" stroke="#b3261e" strokeWidth="3" strokeLinecap="square" />
          <path d="M8 16v11h16V16" stroke="#f4efe6" strokeWidth="2.5" />
        </svg>
      </div>
    ),
    size,
  );
}
