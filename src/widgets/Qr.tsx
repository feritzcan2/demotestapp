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
          minHeight: 62,
          padding: "12px 14px",
          borderRadius: 10,
          border: "1px solid var(--border)",
          background: "var(--panel-2)",
          color: "var(--text)",
          font: "inherit",
          lineHeight: 1.4,
          outlineColor: "var(--accent)",
        }}
      />

      <div
        style={{
          flex: 1,
          minHeight: 220,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {hasValue ? (
          <div
            style={{
              padding: 12,
              borderRadius: 10,
              background: "#fff",
              boxShadow: "0 14px 30px rgba(0, 0, 0, 0.22)",
            }}
          >
            <QRCodeSVG
              value={value}
              size={180}
              bgColor="#ffffff"
              fgColor="#111827"
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
