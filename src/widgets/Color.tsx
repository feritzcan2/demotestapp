import { useEffect, useMemo, useState } from "react";

const DEFAULT_RGB = {
  r: 124,
  g: 92,
  b: 255,
};

function toHex(value: number) {
  return value.toString(16).padStart(2, "0").toUpperCase();
}

export function Color() {
  const [red, setRed] = useState(DEFAULT_RGB.r);
  const [green, setGreen] = useState(DEFAULT_RGB.g);
  const [blue, setBlue] = useState(DEFAULT_RGB.b);
  const [copied, setCopied] = useState(false);

  const hex = useMemo(
    () => `#${toHex(red)}${toHex(green)}${toHex(blue)}`,
    [red, green, blue],
  );
  const rgb = `rgb(${red}, ${green}, ${blue})`;

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copyHex = async () => {
    await navigator.clipboard.writeText(hex);
    setCopied(true);
  };

  const sliders = [
    { label: "R", value: red, setValue: setRed, color: "#ff5c7a" },
    { label: "G", value: green, setValue: setGreen, color: "#22d3ee" },
    { label: "B", value: blue, setValue: setBlue, color: "#7c5cff" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        gap: 18,
        justifyContent: "center",
      }}
    >
      <div style={{ display: "grid", gap: 14 }}>
        {sliders.map(({ label, value, setValue, color }) => (
          <label
            key={label}
            style={{
              display: "grid",
              gap: 8,
              gridTemplateColumns: "32px 1fr 42px",
              alignItems: "center",
              color: "var(--text)",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <span>{label}</span>
            <input
              type="range"
              min="0"
              max="255"
              value={value}
              onChange={(event) => setValue(Number(event.target.value))}
              style={{ accentColor: color, width: "100%" }}
              aria-label={`${label} color channel`}
            />
            <span
              style={{
                color: "var(--muted)",
                fontVariantNumeric: "tabular-nums",
                textAlign: "right",
              }}
            >
              {value}
            </span>
          </label>
        ))}
      </div>

      <div
        aria-label={`Color preview ${hex}`}
        style={{
          height: 64,
          width: "100%",
          borderRadius: 12,
          background: rgb,
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: `0 18px 44px ${rgb.replace("rgb", "rgba").replace(")", ", 0.24)")}`,
        }}
      />

      <div style={{ display: "grid", gap: 6 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <code
            style={{
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              fontSize: 20,
              letterSpacing: "0.04em",
            }}
          >
            {hex}
          </code>
          <button
            type="button"
            onClick={copyHex}
            style={{
              border: "1px solid var(--border)",
              borderRadius: 999,
              background: "var(--panel-2)",
              color: copied ? "var(--accent-2)" : "var(--text)",
              padding: "6px 12px",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {copied ? "Copied!" : "Copy hex"}
          </button>
        </div>
        <div
          style={{
            color: "var(--muted)",
            fontSize: 14,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {rgb}
        </div>
      </div>
    </div>
  );
}
