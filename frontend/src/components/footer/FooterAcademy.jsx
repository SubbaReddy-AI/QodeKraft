import { Link } from "react-router-dom";

function FooterAcademy() {
  return (
    <div className="footer-column">
      <h3>Learning</h3>

      <Link to="/academy">Academy</Link>
      <Link to="/academy/courses">Courses</Link>
      <Link to="/internships">Internships</Link>
      <Link to="/projects">Student Projects</Link>
    </div>
  );
}

export default FooterAcademy;