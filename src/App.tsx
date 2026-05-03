import { Clock } from "./widgets/Clock";
import { Qr } from "./widgets/Qr";
import { Markdown } from "./widgets/Markdown";
import { Color } from "./widgets/Color";

const TILES = [
  { title: "Clock", Component: Clock },
  { title: "QR Generator", Component: Qr },
  { title: "Markdown Preview", Component: Markdown },
  { title: "Color Picker", Component: Color },
];

export function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>demotestapp</h1>
        <span className="crumb">4 mini tools, 4 agents, one page</span>
      </header>
      <div className="tile-grid">
        {TILES.map(({ title, Component }) => (
          <section key={title} className="tile">
            <header className="tile-header">{title}</header>
            <div className="tile-body">
              <Component />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
