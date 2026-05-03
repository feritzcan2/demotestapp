import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export function Qr() {
  const [value, setValue] = useState("https://github.com");
  const trimmedValue = value.trim();

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        justifyContent: "center",
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
          minHeight: 62,
          border: "1px solid var(--border)",
          borderRadius: 10,
          padding: "12px 14px",
          background: "var(--panel-2)",
          color: "var(--text)",
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
        }}
      >
        {trimmedValue ? (
          <div
            style={{
              padding: 12,
              borderRadius: 10,
              background: "#fff",
              boxShadow: "0 18px 45px rgba(0, 0, 0, 0.22)",
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
