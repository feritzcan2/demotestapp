import { useEffect, useState } from "react";

const CLOCK_SIZE = 180;
const CENTER = CLOCK_SIZE / 2;

function formatTime(date: Date) {
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((part) => String(part).padStart(2, "0"))
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

  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6;
  const hourAngle = hours * 30;

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
        aria-label={`Analog clock showing ${formatTime(now)}`}
        role="img"
        width={CLOCK_SIZE}
        height={CLOCK_SIZE}
        viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`}
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r="86"
          fill="var(--panel-2)"
          stroke="var(--border)"
          strokeWidth="4"
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r="76"
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />

        {[0, 90, 180, 270].map((angle) => (
          <line
            key={angle}
            x1={CENTER}
            y1="14"
            x2={CENTER}
            y2="28"
            stroke="var(--muted)"
            strokeLinecap="round"
            strokeWidth="4"
            transform={`rotate(${angle} ${CENTER} ${CENTER})`}
          />
        ))}

        <line
          x1={CENTER}
          y1={CENTER + 10}
          x2={CENTER}
          y2="45"
          stroke="var(--accent)"
          strokeLinecap="round"
          strokeWidth="7"
          transform={`rotate(${hourAngle} ${CENTER} ${CENTER})`}
        />
        <line
          x1={CENTER}
          y1={CENTER + 14}
          x2={CENTER}
          y2="30"
          stroke="var(--accent-2)"
          strokeLinecap="round"
          strokeWidth="5"
          transform={`rotate(${minuteAngle} ${CENTER} ${CENTER})`}
        />
        <line
          x1={CENTER}
          y1={CENTER + 18}
          x2={CENTER}
          y2="22"
          stroke="#ff6bcb"
          strokeLinecap="round"
          strokeWidth="2"
          transform={`rotate(${secondAngle} ${CENTER} ${CENTER})`}
        />
        <circle cx={CENTER} cy={CENTER} r="7" fill="var(--accent)" />
        <circle cx={CENTER} cy={CENTER} r="3" fill="var(--text)" />
      </svg>

      <time
        dateTime={now.toTimeString().slice(0, 8)}
        style={{
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
          fontSize: 22,
          letterSpacing: "0.08em",
          color: "var(--text)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {formatTime(now)}
      </time>
    </div>
  );
}
