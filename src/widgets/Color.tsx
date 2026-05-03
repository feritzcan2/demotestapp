import { useEffect, useMemo, useState } from "react";

const DEFAULT_COLOR = {
  r: 124,
  g: 92,
  b: 255,
};

const channelLabels = ["R", "G", "B"] as const;

function toHex(value: number) {
  return value.toString(16).padStart(2, "0").toUpperCase();
}

export function Color() {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [copied, setCopied] = useState(false);

  const hex = useMemo(
    () => `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`,
    [color],
  );

  const rgb = `rgb(${color.r}, ${color.g}, ${color.b})`;

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyHex() {
    await navigator.clipboard.writeText(hex);
    setCopied(true);
  }

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 22,
      }}
    >
      <div style={{ display: "grid", gap: 14 }}>
        {channelLabels.map((channel) => {
          const key = channel.toLowerCase() as keyof typeof DEFAULT_COLOR;

          return (
            <label
              key={channel}
              style={{
                display: "grid",
                gridTemplateColumns: "28px 1fr 42px",
                alignItems: "center",
                gap: 12,
                color: "var(--muted)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <span style={{ color: "var(--text)" }}>{channel}</span>
              <input
                type="range"
                min="0"
                max="255"
                value={color[key]}
                onChange={(event) =>
                  setColor((current) => ({
                    ...current,
                    [key]: Number(event.currentTarget.value),
                  }))
                }
                aria-label={`${channel} channel`}
                style={{ accentColor: "var(--accent)", width: "100%" }}
              />
              <span
                style={{
                  fontVariantNumeric: "tabular-nums",
                  textAlign: "right",
                }}
              >
                {color[key]}
              </span>
            </label>
          );
        })}
      </div>

      <div
        aria-label={`Selected color ${hex}`}
        style={{
          minHeight: 64,
          width: "100%",
          borderRadius: 12,
          background: rgb,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.18)",
        }}
      />

      <div style={{ display: "grid", gap: 6, justifyItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <code
            style={{
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
              fontSize: 20,
              letterSpacing: "0.03em",
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
              fontWeight: 700,
            }}
          >
            {copied ? "Copied!" : "Copy hex"}
          </button>
        </div>
        <div style={{ color: "var(--muted)", fontSize: 14 }}>{rgb}</div>
      </div>
    </div>
  );
}
