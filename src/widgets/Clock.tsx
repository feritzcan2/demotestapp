import { useEffect, useState } from "react";

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function handCoords(angleDeg: number, length: number, cx: number, cy: number) {
  const r = toRad(angleDeg - 90);
  return {
    x: cx + length * Math.cos(r),
    y: cy + length * Math.sin(r),
  };
}

export function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = now.getHours() % 12;
  const m = now.getMinutes();
  const s = now.getSeconds();

  const hourDeg = h * 30 + m * 0.5;
  const minDeg = m * 6;
  const secDeg = s * 6;

  const cx = 90;
  const cy = 90;
  const r = 80;

  const hourEnd = handCoords(hourDeg, 48, cx, cy);
  const minEnd = handCoords(minDeg, 64, cx, cy);
  const secEnd = handCoords(secDeg, 70, cx, cy);

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");

  const marks = [
    { label: "12", deg: 0 },
    { label: "3", deg: 90 },
    { label: "6", deg: 180 },
    { label: "9", deg: 270 },
  ];

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

        {/* Hour marks */}
        {marks.map(({ label, deg }) => {
          const pos = handCoords(deg, r - 12, cx, cy);
          return (
            <text
              key={label}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--muted)"
              fontSize={11}
              fontFamily="inherit"
            >
              {label}
            </text>
          );
        })}

        {/* Hour hand */}
        <line
          x1={cx}
          y1={cy}
          x2={hourEnd.x}
          y2={hourEnd.y}
          stroke="var(--text)"
          strokeWidth={4}
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
        {hh}:{mm}:{ss}
      </span>
    </div>
  );
}
