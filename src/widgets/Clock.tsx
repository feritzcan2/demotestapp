import { useEffect, useState } from "react";

const CLOCK_SIZE = 180;
const CENTER = CLOCK_SIZE / 2;
const RADIUS = 78;

function formatTime(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function handPosition(length: number, angleDegrees: number) {
  const angleRadians = ((angleDegrees - 90) * Math.PI) / 180;

  return {
    x: CENTER + length * Math.cos(angleRadians),
    y: CENTER + length * Math.sin(angleRadians),
  };
}

export function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  const secondAngle = seconds * 6;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const hourAngle = (hours + minutes / 60) * 30;

  const hourHand = handPosition(44, hourAngle);
  const minuteHand = handPosition(62, minuteAngle);
  const secondHand = handPosition(68, secondAngle);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        textAlign: "center",
      }}
      aria-label={`Current time ${formatTime(now)}`}
    >
      <svg
        width={CLOCK_SIZE}
        height={CLOCK_SIZE}
        viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`}
        role="img"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        <defs>
          <filter id="clock-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx={CENTER} cy={CENTER} r={RADIUS + 8} fill="var(--panel-2)" />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="#0b0d12"
          stroke="var(--border)"
          strokeWidth="3"
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS - 8}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />

        {[0, 90, 180, 270].map((angle) => {
          const outer = handPosition(RADIUS - 10, angle);
          const inner = handPosition(RADIUS - 22, angle);

          return (
            <line
              key={angle}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="var(--text)"
              strokeLinecap="round"
              strokeWidth="4"
              opacity="0.88"
            />
          );
        })}

        <line
          x1={CENTER}
          y1={CENTER}
          x2={hourHand.x}
          y2={hourHand.y}
          stroke="var(--accent)"
          strokeLinecap="round"
          strokeWidth="7"
          filter="url(#clock-glow)"
        />
        <line
          x1={CENTER}
          y1={CENTER}
          x2={minuteHand.x}
          y2={minuteHand.y}
          stroke="var(--accent)"
          strokeLinecap="round"
          strokeWidth="5"
          opacity="0.95"
        />
        <line
          x1={CENTER}
          y1={CENTER + 12}
          x2={secondHand.x}
          y2={secondHand.y}
          stroke="var(--accent-2)"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <circle cx={CENTER} cy={CENTER} r="7" fill="var(--accent)" />
        <circle cx={CENTER} cy={CENTER} r="3" fill="var(--text)" />
      </svg>

      <time
        dateTime={now.toTimeString().slice(0, 8)}
        style={{
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: 22,
          letterSpacing: "0.08em",
          color: "var(--text)",
        }}
      >
        {formatTime(now)}
      </time>
    </div>
  );
}
