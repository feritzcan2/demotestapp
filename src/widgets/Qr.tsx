import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export function Qr() {
  const [value, setValue] = useState("https://github.com");
  const hasValue = value.trim().length > 0;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
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
          border: "1px solid var(--border)",
          borderRadius: 10,
          background: "var(--panel-2)",
          color: "var(--text)",
          padding: "12px 14px",
          font: "inherit",
          lineHeight: 1.45,
          outlineColor: "var(--accent)",
        }}
      />

      <div
        style={{
          minHeight: 204,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {hasValue ? (
          <div
            aria-label="Generated QR code"
            style={{
              background: "#fff",
              padding: 12,
              borderRadius: 10,
              boxShadow: "0 18px 40px rgba(0, 0, 0, 0.24)",
            }}
          >
            <QRCodeSVG
              value={value}
              size={180}
              bgColor="#ffffff"
              fgColor="#0b0d12"
              level="M"
            />
          </div>
        ) : (
          <p
            style={{
              margin: 0,
              color: "var(--muted)",
              textAlign: "center",
            }}
          >
            Type something to generate a QR code.
          </p>
        )}
      </div>
    </div>
  );
}
