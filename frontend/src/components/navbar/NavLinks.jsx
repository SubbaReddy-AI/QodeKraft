import { NavLink } from "react-router-dom";

function NavLinks() {
  const links = [
    {
      label: "Home",
      path: "/"
    },
    {
      label: "About",
      path: "/about"
    },
    {
      label: "Services",
      path: "/services"
    },
    {
      label: "Academy",
      path: "/academy"
    },
    {
      label: "Internships",
      path: "/internships"
    },
    {
      label: "Projects",
      path: "/projects"
    },
    {
      label: "Careers",
      path: "/careers"
    },
    {
      label: "Contact",
      path: "/contact"
    },
    {
      label: "Verify Certificates",
      path: "/verify-certificate"
    }
  ];

  return (
    <nav className="qk-nav-links">

      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            isActive
              ? "qk-nav-link active"
              : "qk-nav-link"
          }
        >
          {link.label}
        </NavLink>
      ))}

    </nav>
  );
}

export default NavLinks;