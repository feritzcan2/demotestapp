import { Link } from "react-router-dom";

export function QrPage() {
  return (
    <div className="page">
      <Link to="/" className="back">← Back</Link>
      <div className="placeholder">
        <span className="badge">TODO · qr</span>
        <p>An agent will build the QR Generator here.</p>
      </div>
    </div>
  );
}
