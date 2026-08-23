import { Link } from "react-router-dom";

function HeroVisual() {
  return (
    <div className="qk-hero-visual qk-workspace-visual">
      <div className="qk-workspace-frame">
        <img
          src="/images/office/qodekraft-workspace.jpg"
          alt="QodeKraft technology workspace"
          className="qk-workspace-image"
        />
        <div className="qk-workspace-frame-overlay" />

        <div className="qk-workspace-brand">
          <img src="/logo/qodekraft-logo-premium.png" alt="QodeKraft" />
          <span>Technology • Learning • Careers</span>
        </div>

        <div className="qk-workspace-chip qk-workspace-chip-one">
          <strong>01</strong>
          <span>Build</span>
        </div>
        <div className="qk-workspace-chip qk-workspace-chip-two">
          <strong>02</strong>
          <span>Learn</span>
        </div>
        <div className="qk-workspace-chip qk-workspace-chip-three">
          <strong>03</strong>
          <span>Grow</span>
        </div>
      </div>

      <Link to="/about" className="qk-workspace-caption">
        <span className="qk-status-dot" />
        Inside the QodeKraft workspace <b>↗</b>
      </Link>
    </div>
  );
}

export default HeroVisual;
