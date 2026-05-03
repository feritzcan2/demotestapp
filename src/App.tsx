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
    <div id="top" className="app-shell">
      <header className="top-bar" aria-label="Application header">
        <a className="brand" href="#top" aria-label="demotestapp home">
          <span className="brand-mark" aria-hidden="true">
            d
          </span>
          <span>
            <span className="eyebrow">Agent playground</span>
            <span className="brand-name">demotestapp</span>
          </span>
        </a>

        <nav className="top-nav" aria-label="Workspace sections">
          <a href="#tools" aria-current="page">Tools</a>
          <a href="#status">Status</a>
          <a href="#agents">Agents</a>
        </nav>

        <div className="top-actions" aria-label="Workspace summary">
          <span className="status-pill" id="status">
            <span className="status-dot" aria-hidden="true" />
            Live workspace
          </span>
          <span className="tool-count" id="agents">4 mini tools</span>
        </div>
      </header>

      <main id="tools" className="tile-grid">
        {TILES.map(({ title, Component }) => (
          <section key={title} className="tile">
            <header className="tile-header">{title}</header>
            <div className="tile-body">
              <Component />
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
