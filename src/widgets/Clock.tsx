import { useEffect, useState } from "react";

const SIZE = 180;
const CENTER = SIZE / 2;
const FACE_RADIUS = CENTER - 4;

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  const marks = [0, 90, 180, 270].map((angle) => {
    const rad = (angle - 90) * (Math.PI / 180);
    const outer = FACE_RADIUS - 6;
    const inner = FACE_RADIUS - 16;
    const x1 = CENTER + outer * Math.cos(rad);
    const y1 = CENTER + outer * Math.sin(rad);
    const x2 = CENTER + inner * Math.cos(rad);
    const y2 = CENTER + inner * Math.sin(rad);
    return { x1, y1, x2, y2, key: angle };
  });

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
      }}
    >
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={FACE_RADIUS}
          fill="var(--panel-2)"
          stroke="var(--border)"
          strokeWidth={2}
        />
        {marks.map((m) => (
          <line
            key={m.key}
            x1={m.x1}
            y1={m.y1}
            x2={m.x2}
            y2={m.y2}
            stroke="var(--muted)"
            strokeWidth={2}
            strokeLinecap="round"
          />
        ))}
        <g transform={`rotate(${hourAngle} ${CENTER} ${CENTER})`}>
          <line
            x1={CENTER}
            y1={CENTER + 10}
            x2={CENTER}
            y2={CENTER - FACE_RADIUS * 0.5}
            stroke="var(--accent)"
            strokeWidth={4}
            strokeLinecap="round"
          />
        </g>
        <g transform={`rotate(${minuteAngle} ${CENTER} ${CENTER})`}>
          <line
            x1={CENTER}
            y1={CENTER + 14}
            x2={CENTER}
            y2={CENTER - FACE_RADIUS * 0.75}
            stroke="var(--accent)"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </g>
        <g transform={`rotate(${secondAngle} ${CENTER} ${CENTER})`}>
          <line
            x1={CENTER}
            y1={CENTER + 16}
            x2={CENTER}
            y2={CENTER - FACE_RADIUS * 0.85}
            stroke="var(--accent-2)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </g>
        <circle cx={CENTER} cy={CENTER} r={4} fill="var(--accent-2)" />
      </svg>
      <div
        style={{
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: 22,
          letterSpacing: "0.04em",
          color: "var(--text)",
        }}
      >
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </div>
    </div>
  );
}
