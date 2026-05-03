import { Link } from "react-router-dom";

export function ColorPage() {
  return (
    <div className="page">
      <Link to="/" className="back">← Back</Link>
      <div className="placeholder">
        <span className="badge">TODO · color</span>
        <p>An agent will build the Color Picker here.</p>
      </div>
    </div>
  );
}
