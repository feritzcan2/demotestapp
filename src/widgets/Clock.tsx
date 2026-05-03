import { useEffect, useState } from "react";

function formatTime(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function handRotation(value: number, max: number) {
  return (value / max) * 360;
}

export function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  const secondAngle = handRotation(seconds, 60);
  const minuteAngle = handRotation(minutes, 60);
  const hourAngle = handRotation(hours, 12);
  const timeLabel = formatTime(now);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "18px",
      }}
    >
      <svg
        aria-label={`Analog clock showing ${timeLabel}`}
        role="img"
        viewBox="0 0 200 200"
        width="180"
        height="180"
        style={{
          display: "block",
          filter: "drop-shadow(0 18px 36px rgba(0, 0, 0, 0.28))",
        }}
      >
        <defs>
          <radialGradient id="clock-face" cx="50%" cy="44%" r="62%">
            <stop offset="0%" stopColor="var(--panel-2)" />
            <stop offset="100%" stopColor="#0f131a" />
          </radialGradient>
        </defs>

        <circle
          cx="100"
          cy="100"
          r="92"
          fill="url(#clock-face)"
          stroke="var(--border)"
          strokeWidth="4"
        />
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="rgba(255, 255, 255, 0.04)"
          strokeWidth="1"
        />

        <g
          fill="var(--muted)"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
          fontSize="18"
          fontWeight="700"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          <text x="100" y="32">
            12
          </text>
          <text x="168" y="102">
            3
          </text>
          <text x="100" y="170">
            6
          </text>
          <text x="32" y="102">
            9
          </text>
        </g>

        <g strokeLinecap="round" transform="translate(100 100)">
          <line
            x1="0"
            y1="8"
            x2="0"
            y2="-44"
            stroke="var(--accent)"
            strokeWidth="8"
            transform={`rotate(${hourAngle})`}
          />
          <line
            x1="0"
            y1="10"
            x2="0"
            y2="-66"
            stroke="var(--accent-2)"
            strokeWidth="5"
            transform={`rotate(${minuteAngle})`}
          />
          <line
            x1="0"
            y1="16"
            x2="0"
            y2="-74"
            stroke="#ff6bcb"
            strokeWidth="2.5"
            transform={`rotate(${secondAngle})`}
          />
          <circle cx="0" cy="0" r="7" fill="var(--text)" />
          <circle cx="0" cy="0" r="3.5" fill="var(--accent)" />
        </g>
      </svg>

      <time
        dateTime={now.toTimeString().slice(0, 8)}
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          fontSize: "22px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "var(--text)",
        }}
      >
        {timeLabel}
      </time>
    </div>
  );
}
