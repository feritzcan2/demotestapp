import { Link, Outlet, useLocation } from "react-router-dom";

const TITLES: Record<string, string> = {
  "/": "demotestapp",
  "/clock": "Clock",
  "/qr": "QR Generator",
  "/markdown": "Markdown Preview",
  "/color": "Color Picker",
};

export function Layout() {
  const { pathname } = useLocation();
  const title = TITLES[pathname] ?? "demotestapp";
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/">
          <h1>{title}</h1>
        </Link>
        <span className="crumb">4 mini tools, 4 agents</span>
      </header>
      <Outlet />
    </div>
  );
}
