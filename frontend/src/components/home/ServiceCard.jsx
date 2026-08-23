import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  return (
    <Link to={service.path} className="qk-service-card card">
      <div className="qk-service-image">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
        />
      </div>

      <div className="qk-service-top">
        <span className="qk-service-number">{service.number}</span>
        <span className="qk-service-icon">{service.icon}</span>
      </div>

      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <span className="qk-service-link">
        Explore <span>↗</span>
      </span>
    </Link>
  );
}

export default ServiceCard;
