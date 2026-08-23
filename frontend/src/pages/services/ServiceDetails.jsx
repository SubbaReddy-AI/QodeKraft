import { useParams, Link } from "react-router-dom";
import Container from "../../components/common/Container";

const services = {
  "ai-machine-learning": {
    title: "AI & Machine Learning",
    category: "Artificial Intelligence",
    description:
      "Build intelligent products using machine learning, deep learning, generative AI and automation.",
    capabilities: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Generative AI",
      "LLM Applications",
      "AI Automation"
    ]
  },
  "web-development": {
    title: "Web Development",
    category: "Software Engineering",
    description:
      "Build modern, responsive and scalable web applications.",
    capabilities: [
      "React Applications",
      "Frontend Engineering",
      "Backend APIs",
      "Database Systems",
      "Authentication",
      "Cloud Deployment"
    ]
  }
};

function ServiceDetails() {
  const { serviceId } = useParams();

  const service =
    services[serviceId] || services["ai-machine-learning"];

  return (
    <section className="detail-page">
      <Container>
        <span className="section-eyebrow">
          {service.category}
        </span>

        <h1>
          {service.title}
        </h1>

        <p className="detail-description">
          {service.description}
        </p>

        <div className="detail-capabilities">
          {service.capabilities.map(
            (capability) => (
              <div
                key={capability}
                className="detail-capability"
              >
                {capability}
              </div>
            )
          )}
        </div>

        <Link
          to="/contact"
          className="btn btn-primary"
        >
          Discuss Your Project
        </Link>
      </Container>
    </section>
  );
}

export default ServiceDetails;