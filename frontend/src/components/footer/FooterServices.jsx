import { Link } from "react-router-dom";

function FooterServices() {
  return (
    <div className="footer-column">
      <h3>Services</h3>

      <Link to="/services">AI & ML</Link>
      <Link to="/services">Web Development</Link>
      <Link to="/services">Mobile Development</Link>
      <Link to="/services">Cloud & DevOps</Link>
    </div>
  );
}

export default FooterServices;