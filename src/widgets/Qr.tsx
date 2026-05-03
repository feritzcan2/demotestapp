import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export function Qr() {
  const [value, setValue] = useState("https://github.com");
  const qrValue = value.trim();

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
      }}
    >
      <textarea
        rows={2}
        placeholder="Type anything…"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        style={{
          width: "100%",
          resize: "vertical",
          minHeight: 64,
          borderRadius: 10,
          border: "1px solid var(--border)",
          background: "var(--panel-2)",
          color: "var(--text)",
          padding: "12px 14px",
          font: "inherit",
          lineHeight: 1.4,
          outlineColor: "var(--accent)",
        }}
      />

      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 220,
          textAlign: "center",
        }}
      >
        {qrValue ? (
          <div
            style={{
              padding: 12,
              borderRadius: 10,
              background: "#ffffff",
              lineHeight: 0,
              boxShadow: "0 18px 45px rgba(0, 0, 0, 0.22)",
            }}
            aria-label="Generated QR code"
          >
            <QRCodeSVG
              value={qrValue}
              size={180}
              bgColor="#ffffff"
              fgColor="#111827"
              level="M"
            />
          </div>
        ) : (
          <p style={{ margin: 0, color: "var(--muted)" }}>
            Type something to generate a QR code.
          </p>
        )}
      </div>
    </div>
  );
}
