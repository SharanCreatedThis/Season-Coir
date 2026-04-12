/**
 * Dynamically generated Open Graph image for Season Coir website.
 * Served at /opengraph-image by Next.js ImageResponse.
 */
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Season Coir — Premium Coir Products from Kerala";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "#1B4332",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Gold accent bar top-left */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 80,
            width: 60,
            height: 4,
            background: "#D4AF37",
          }}
        />

        {/* Watermark circle */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: "50%",
            border: "1px solid rgba(212,175,55,0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 420,
            height: 420,
            borderRadius: "50%",
            border: "1px solid rgba(212,175,55,0.08)",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.35em",
            color: "#D4AF37",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Est. 1980 · Alleppey, Kerala
        </div>

        {/* Main heading */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#F5F0E8",
            lineHeight: 1,
            marginBottom: 24,
            letterSpacing: "-0.02em",
          }}
        >
          Season{" "}
          <span style={{ color: "#D4AF37" }}>Coir</span>
        </div>

        {/* Subheading */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(245,240,232,0.55)",
            letterSpacing: "0.01em",
            marginBottom: 48,
            maxWidth: 640,
          }}
        >
          Premium eco-luxury coir mats — crafted in Kerala, exported worldwide.
        </div>

        {/* Bottom tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ width: 40, height: 1, background: "rgba(212,175,55,0.6)" }} />
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "rgba(245,240,232,0.35)",
              textTransform: "uppercase",
            }}
          >
            seasoncoir.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
