import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const DEFAULT_QR_VALUE = "https://github.com";

export function Qr() {
  const [value, setValue] = useState(DEFAULT_QR_VALUE);
  const hasValue = value.trim().length > 0;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <textarea
        rows={2}
        value={value}
        placeholder="Type anything…"
        onChange={(event) => setValue(event.target.value)}
        aria-label="QR code text"
        style={{
          width: "100%",
          resize: "vertical",
          border: "1px solid var(--border)",
          borderRadius: 10,
          padding: "10px 12px",
          background: "var(--panel-2)",
          color: "var(--text)",
          font: "inherit",
          lineHeight: 1.45,
          outlineColor: "var(--accent)",
        }}
      />

      <div
        style={{
          flex: 1,
          minHeight: 210,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {hasValue ? (
          <div
            style={{
              padding: 12,
              borderRadius: 10,
              background: "#ffffff",
              boxShadow: "0 14px 30px rgba(0, 0, 0, 0.28)",
            }}
          >
            <QRCodeSVG
              value={value}
              size={180}
              bgColor="#ffffff"
              fgColor="#111827"
              marginSize={0}
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
