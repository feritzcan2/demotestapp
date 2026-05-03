import { useEffect, useState } from "react";

function formatTime(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
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
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = hours * 30 + minutes * 0.5;

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
    >
      <svg
        width="180"
        height="180"
        viewBox="0 0 180 180"
        role="img"
        aria-label={`Analog clock showing ${formatTime(now)}`}
      >
        <defs>
          <filter id="clock-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>
        <circle cx="90" cy="90" r="82" fill="var(--panel-2)" stroke="var(--border)" strokeWidth="2" filter="url(#clock-shadow)" />
        <circle cx="90" cy="90" r="72" fill="#10141c" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

        <text x="90" y="32" textAnchor="middle" dominantBaseline="middle" fill="var(--muted)" fontSize="14" fontWeight="700">
          12
        </text>
        <text x="148" y="92" textAnchor="middle" dominantBaseline="middle" fill="var(--muted)" fontSize="14" fontWeight="700">
          3
        </text>
        <text x="90" y="151" textAnchor="middle" dominantBaseline="middle" fill="var(--muted)" fontSize="14" fontWeight="700">
          6
        </text>
        <text x="32" y="92" textAnchor="middle" dominantBaseline="middle" fill="var(--muted)" fontSize="14" fontWeight="700">
          9
        </text>

        <line
          x1="90"
          y1="90"
          x2="90"
          y2="48"
          stroke="var(--accent)"
          strokeWidth="7"
          strokeLinecap="round"
          transform={`rotate(${hourAngle} 90 90)`}
        />
        <line
          x1="90"
          y1="90"
          x2="90"
          y2="32"
          stroke="var(--accent-2)"
          strokeWidth="5"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle} 90 90)`}
        />
        <line
          x1="90"
          y1="98"
          x2="90"
          y2="25"
          stroke="#ff6b9a"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${secondAngle} 90 90)`}
        />
        <circle cx="90" cy="90" r="7" fill="var(--accent)" stroke="#10141c" strokeWidth="2" />
      </svg>

      <time
        dateTime={now.toTimeString().slice(0, 8)}
        style={{
          fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
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
