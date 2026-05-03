import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const defaultValue = "https://github.com";

export function Qr() {
  const [value, setValue] = useState(defaultValue);
  const trimmedValue = value.trim();

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 24,
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
          minHeight: 64,
          border: "1px solid var(--border)",
          borderRadius: 10,
          padding: "12px 14px",
          background: "var(--panel-2)",
          color: "var(--text)",
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
          textAlign: "center",
        }}
      >
        {trimmedValue ? (
          <div
            style={{
              padding: 12,
              borderRadius: 10,
              background: "#fff",
              boxShadow: "0 14px 34px rgba(0, 0, 0, 0.24)",
            }}
            aria-label="Generated QR code"
          >
            <QRCodeSVG value={trimmedValue} size={180} />
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
