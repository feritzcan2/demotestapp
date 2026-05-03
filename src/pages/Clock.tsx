import { Link } from "react-router-dom";

export function ClockPage() {
  return (
    <div className="page">
      <Link to="/" className="back">← Back</Link>
      <div className="placeholder">
        <span className="badge">TODO · clock</span>
        <p>An agent will build the Clock here.</p>
      </div>
    </div>
  );
}
