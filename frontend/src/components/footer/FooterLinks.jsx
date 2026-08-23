import { Link } from "react-router-dom";

function FooterLinks() {
  return (
    <div className="footer-column">
      <h3>Company</h3>

      <Link to="/about">About</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/careers">Careers</Link>
      <Link to="/contact">Contact</Link>
    </div>
  );
}

export default FooterLinks;