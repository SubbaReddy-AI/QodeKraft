import { Link } from "react-router-dom";

function ServicesDropdown() {
  const services = [
    "AI & Machine Learning",
    "Web Development",
    "Mobile Development",
    "Cloud & DevOps",
    "Data & Analytics",
    "Digital Solutions"
  ];

  return (
    <div className="services-dropdown">
      <div className="services-dropdown-inner">
        {services.map((service) => (
          <Link
            key={service}
            to="/services"
          >
            {service}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ServicesDropdown;