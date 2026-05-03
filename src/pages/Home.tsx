import { Link } from "react-router-dom";

const TOOLS = [
  { to: "/clock", icon: "⏰", title: "Clock", desc: "Live analog + digital clock that ticks every second." },
  { to: "/qr", icon: "▦", title: "QR Generator", desc: "Type text, get a QR code rendered live." },
  { to: "/markdown", icon: "✎", title: "Markdown Preview", desc: "Type markdown on the left, see it rendered on the right." },
  { to: "/color", icon: "🎨", title: "Color Picker", desc: "Move RGB sliders, preview the color, copy the hex." },
];

export function Home() {
  return (
    <div className="home-grid">
      {TOOLS.map((t) => (
        <Link key={t.to} to={t.to} className="card">
          <div className="icon">{t.icon}</div>
          <h3>{t.title}</h3>
          <p>{t.desc}</p>
        </Link>
      ))}
    </div>
  );
}
