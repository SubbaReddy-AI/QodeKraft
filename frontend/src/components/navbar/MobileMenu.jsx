import { Link } from "react-router-dom";
function MobileMenu({ open, onClose }) {
  const links = [["Home","/"],["About","/about"],["Services","/services"],["Academy","/academy"],["Internships","/internships"],["Projects","/projects"],["Careers","/careers"],["Contact","/contact"]];
  if (!open) return null;
  return <div className="mobile-menu">{links.map(([label,path]) => <Link key={path} to={path} onClick={onClose}>{label}</Link>)}<Link to="/register-course" className="mobile-menu-cta" onClick={onClose}>Register for a Course →</Link></div>;
}
export default MobileMenu;
