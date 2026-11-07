import { ImageResponse } from "next/og";
import { content } from "@/content/content";

export const alt = `${content.profile.name}, ${content.profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { profile } = content;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#07080c",
          backgroundImage:
            "radial-gradient(900px 500px at 85% -10%, rgba(167,139,250,0.35), transparent), radial-gradient(800px 500px at 0% 110%, rgba(110,231,255,0.28), transparent)",
          color: "#e9ecf4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            color: "#6ee7ff",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 44, height: 2, background: "#6ee7ff" }} />
          {profile.role}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            marginTop: 24,
            letterSpacing: -2,
          }}
        >
          Atchi Vamsi Krishna Reddy
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#9aa1b4",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          {profile.yearsExperience} yrs · React · JavaScript · building fast,
          resilient logistics interfaces
        </div>
      </div>
    ),
    size,
  );
}
