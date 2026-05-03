import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const DEFAULT_VALUE = "https://github.com";

export function Qr() {
  const [value, setValue] = useState(DEFAULT_VALUE);
  const trimmedValue = value.trim();

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <textarea
        rows={2}
        value={value}
        placeholder="Type anything…"
        onChange={(event) => setValue(event.target.value)}
        style={{
          width: "100%",
          resize: "vertical",
          minHeight: 64,
          padding: "12px 14px",
          color: "var(--text)",
          background: "var(--panel-2)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          font: "inherit",
          lineHeight: 1.4,
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
        {trimmedValue ? (
          <div
            style={{
              padding: 12,
              borderRadius: 10,
              background: "#fff",
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.22)",
            }}
            aria-label="Generated QR code"
          >
            <QRCodeSVG
              value={trimmedValue}
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
