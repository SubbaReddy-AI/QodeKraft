import { useLocation } from "react-router-dom";
import "./WorkspaceBanner.css";

const pageNames = {
  "/about": "Inside QodeKraft",
  "/services": "Technology & Engineering",
  "/academy": "QodeKraft Academy",
  "/academy/courses": "Learn With QodeKraft",
  "/internships": "Build Experience",
  "/projects": "What We Build",
  "/careers": "Build Your Career",
  "/contact": "Start a Conversation",
};

function WorkspaceBanner() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  const title = pageNames[pathname] || "QodeKraft Workspace";

  return (
    <section className="qk-workspace-banner" aria-label="QodeKraft workspace">
      <div className="qk-workspace-banner-image" />
      <div className="qk-workspace-banner-overlay" />
      <div className="container qk-workspace-banner-content">
        <div>
          <span className="qk-workspace-banner-kicker">QODEKRAFT / WORKSPACE</span>
          <h2>{title}</h2>
          <p>People, ideas and technology working together.</p>
        </div>
        <img src="/logo/qodekraft-icon.png" alt="QodeKraft" />
      </div>
    </section>
  );
}

export default WorkspaceBanner;
