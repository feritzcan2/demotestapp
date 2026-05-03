import { Link } from "react-router-dom";

export function MarkdownPage() {
  return (
    <div className="page">
      <Link to="/" className="back">← Back</Link>
      <div className="placeholder">
        <span className="badge">TODO · markdown</span>
        <p>An agent will build the Markdown Preview here.</p>
      </div>
    </div>
  );
}
