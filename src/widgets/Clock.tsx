import { useEffect, useState } from "react";

function twoDigits(value: number) {
  return value.toString().padStart(2, "0");
}

function formatTime(date: Date) {
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map(twoDigits)
    .join(":");
}

export function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourAngle = hours * 30 + minutes * 0.5 + seconds / 120;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        minHeight: 0,
      }}
      aria-label={`Current time ${formatTime(now)}`}
    >
      <svg
        width="180"
        height="180"
        viewBox="0 0 180 180"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="clock-face" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="var(--panel-2)" />
            <stop offset="100%" stopColor="#0f131a" />
          </radialGradient>
          <filter id="clock-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000" floodOpacity="0.25" />
          </filter>
        </defs>

        <circle
          cx="90"
          cy="90"
          r="82"
          fill="url(#clock-face)"
          stroke="var(--border)"
          strokeWidth="3"
          filter="url(#clock-shadow)"
        />
        <circle
          cx="90"
          cy="90"
          r="68"
          fill="none"
          stroke="rgba(255, 255, 255, 0.04)"
          strokeWidth="1"
        />

        {[0, 90, 180, 270].map((angle) => (
          <line
            key={angle}
            x1="90"
            y1="18"
            x2="90"
            y2="31"
            transform={`rotate(${angle} 90 90)`}
            stroke="var(--text)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.85"
          />
        ))}

        <line
          x1="90"
          y1="94"
          x2="90"
          y2="52"
          transform={`rotate(${hourAngle} 90 90)`}
          stroke="var(--accent)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <line
          x1="90"
          y1="96"
          x2="90"
          y2="36"
          transform={`rotate(${minuteAngle} 90 90)`}
          stroke="var(--accent-2)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1="90"
          y1="104"
          x2="90"
          y2="28"
          transform={`rotate(${secondAngle} 90 90)`}
          stroke="#ff6b9d"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="90" cy="90" r="7" fill="var(--text)" />
        <circle cx="90" cy="90" r="3" fill="var(--accent)" />
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
