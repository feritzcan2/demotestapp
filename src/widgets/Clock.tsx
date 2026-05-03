import { useEffect, useMemo, useState } from "react";

const pad = (value: number) => value.toString().padStart(2, "0");

export function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const { hourAngle, minuteAngle, secondAngle, timeLabel } = useMemo(() => {
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return {
      hourAngle: ((hours % 12) + minutes / 60) * 30,
      minuteAngle: (minutes + seconds / 60) * 6,
      secondAngle: seconds * 6,
      timeLabel: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
    };
  }, [now]);

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
      aria-label={`Current time ${timeLabel}`}
    >
      <svg
        width="180"
        height="180"
        viewBox="0 0 180 180"
        role="img"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        <defs>
          <radialGradient id="clock-face" cx="50%" cy="42%" r="62%">
            <stop offset="0%" stopColor="var(--panel-2)" />
            <stop offset="100%" stopColor="#090b10" />
          </radialGradient>
          <filter id="clock-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000" floodOpacity="0.32" />
          </filter>
        </defs>

        <circle
          cx="90"
          cy="90"
          r="84"
          fill="url(#clock-face)"
          stroke="var(--border)"
          strokeWidth="3"
          filter="url(#clock-shadow)"
        />
        <circle cx="90" cy="90" r="73" fill="none" stroke="rgba(255,255,255,0.05)" />

        <g stroke="var(--accent-2)" strokeLinecap="round" strokeWidth="5">
          <line x1="90" y1="17" x2="90" y2="31" />
          <line x1="90" y1="149" x2="90" y2="163" />
          <line x1="17" y1="90" x2="31" y2="90" />
          <line x1="149" y1="90" x2="163" y2="90" />
        </g>

        <g stroke="rgba(230,234,242,0.22)" strokeLinecap="round" strokeWidth="2">
          {Array.from({ length: 8 }, (_, index) => {
            const angle = index * 30 + 30;
            if (angle % 90 === 0) return null;

            return (
              <line
                key={angle}
                x1="90"
                y1="22"
                x2="90"
                y2="29"
                transform={`rotate(${angle} 90 90)`}
              />
            );
          })}
        </g>

        <line
          x1="90"
          y1="96"
          x2="90"
          y2="47"
          transform={`rotate(${hourAngle} 90 90)`}
          stroke="var(--accent)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <line
          x1="90"
          y1="99"
          x2="90"
          y2="32"
          transform={`rotate(${minuteAngle} 90 90)`}
          stroke="var(--accent)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1="90"
          y1="104"
          x2="90"
          y2="25"
          transform={`rotate(${secondAngle} 90 90)`}
          stroke="var(--accent-2)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="90" cy="90" r="7" fill="var(--accent-2)" />
        <circle cx="90" cy="90" r="3" fill="var(--panel)" />
      </svg>

      <time
        dateTime={timeLabel}
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "var(--text)",
          lineHeight: 1,
        }}
      >
        {timeLabel}
      </time>
    </div>
  );
}
