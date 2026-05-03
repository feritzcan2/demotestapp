import { useEffect, useState } from "react";

function handCoords(angleDeg: number, length: number, cx: number, cy: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + length * Math.cos(rad),
    y: cy + length * Math.sin(rad),
  };
}

export function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const s = now.getSeconds();
  const m = now.getMinutes();
  const h = now.getHours() % 12;

  const secDeg = s * 6;
  const minDeg = m * 6 + s * 0.1;
  const hourDeg = h * 30 + m * 0.5;

  const cx = 90;
  const cy = 90;
  const r = 84;

  const secEnd = handCoords(secDeg, 76, cx, cy);
  const minEnd = handCoords(minDeg, 62, cx, cy);
  const hourEnd = handCoords(hourDeg, 44, cx, cy);

  const timeStr = now.toTimeString().slice(0, 8);

  const minorTicks = Array.from({ length: 60 }, (_, i) => {
    const isMajor = i % 15 === 0;
    if (isMajor) return null;
    const deg = i * 6 - 90;
    const rad = (deg * Math.PI) / 180;
    const inner = r - (i % 5 === 0 ? 10 : 5);
    return {
      x1: cx + inner * Math.cos(rad),
      y1: cy + inner * Math.sin(rad),
      x2: cx + r * Math.cos(rad),
      y2: cy + r * Math.sin(rad),
      isFive: i % 5 === 0,
    };
  }).filter(Boolean);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <svg width={180} height={180} viewBox="0 0 180 180">
        {/* Face */}
        <circle cx={cx} cy={cy} r={r} fill="#0b0d12" stroke="var(--border)" strokeWidth={2} />

        {/* Minor ticks */}
        {minorTicks.map((t, i) =>
          t ? (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.isFive ? "var(--muted)" : "#2a3040"}
              strokeWidth={t.isFive ? 1.5 : 1}
              strokeLinecap="round"
            />
          ) : null
        )}

        {/* Hour marks at 12/3/6/9 */}
        {[0, 90, 180, 270].map((deg) => {
          const rad = ((deg - 90) * Math.PI) / 180;
          const inner = r - 16;
          return (
            <line
              key={deg}
              x1={cx + inner * Math.cos(rad)}
              y1={cy + inner * Math.sin(rad)}
              x2={cx + r * Math.cos(rad)}
              y2={cy + r * Math.sin(rad)}
              stroke="var(--accent)"
              strokeWidth={3}
              strokeLinecap="round"
            />
          );
        })}

        {/* Hour hand */}
        <line
          x1={cx}
          y1={cy}
          x2={hourEnd.x}
          y2={hourEnd.y}
          stroke="var(--text)"
          strokeWidth={5}
          strokeLinecap="round"
        />

        {/* Minute hand */}
        <line
          x1={cx}
          y1={cy}
          x2={minEnd.x}
          y2={minEnd.y}
          stroke="var(--accent)"
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* Second hand */}
        <line
          x1={cx}
          y1={cy}
          x2={secEnd.x}
          y2={secEnd.y}
          stroke="var(--accent-2)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={4} fill="var(--accent)" />
      </svg>

      <span
        style={{
          fontFamily: "monospace",
          fontSize: 22,
          color: "var(--text)",
          letterSpacing: "0.05em",
        }}
      >
        {timeStr}
      </span>
    </div>
  );
}
