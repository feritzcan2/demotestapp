import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export function Qr() {
  const [value, setValue] = useState("https://github.com");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", width: "100%" }}>
      <textarea
        rows={2}
        placeholder="Type anything…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: "100%", resize: "vertical", boxSizing: "border-box" }}
      />
      {value ? (
        <div style={{ background: "#fff", padding: "12px", borderRadius: "10px", display: "inline-flex" }}>
          <QRCodeSVG value={value} size={180} />
        </div>
      ) : (
        <p style={{ color: "var(--muted)", textAlign: "center", margin: 0 }}>
          Type something to generate a QR code.
        </p>
      )}
    </div>
  );
}
