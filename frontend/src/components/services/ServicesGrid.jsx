import {
  BrainCircuit,
  Code2,
  Database,
  Cloud,
  Smartphone,
  Lightbulb
} from "lucide-react";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

function ServicesGrid() {
  const services = [
    {
      icon: BrainCircuit,
      number: "01",
      title: "AI & Machine Learning",
      description:
        "Build intelligent systems using machine learning, deep learning, generative AI and automation.",
      image: "/imge/technology/04-ai-machine-learning.png"
    },
    {
      icon: Code2,
      number: "02",
      title: "Web Development",
      description:
        "Modern, responsive and scalable web applications built around strong engineering foundations.",
      image: "/imge/technology/03-software-development.png"
    },
    {
      icon: Smartphone,
      number: "03",
      title: "Mobile Development",
      description:
        "Mobile experiences designed for usability, performance and reliable user experiences.",
      image: "/imge/technology/03-software-development.png"
    },
    {
      icon: Database,
      number: "04",
      title: "Data & Analytics",
      description:
        "Transform raw information into dashboards, analytics and actionable business intelligence.",
      image: "/imge/technology/02-data-analytics.png"
    },
    {
      icon: Cloud,
      number: "05",
      title: "Cloud & DevOps",
      description:
        "Build deployment pipelines, cloud infrastructure and scalable technology environments.",
      image: "/imge/technology/01-cloud-devops.png"
    },
    {
      icon: Lightbulb,
      number: "06",
      title: "Technology Consulting",
      description:
        "Architecture, technology strategy and engineering guidance for ambitious digital products.",
      image: "/imge/technology/03-software-development.png"
    }
  ];

  return (
    <section className="section services-page-grid">
      <Container>
        <SectionTitle
          eyebrow="Our capabilities"
          title="One technology partner. Multiple capabilities."
          description="Choose the capability that matches your current challenge, or combine multiple disciplines into one complete solution."
        />

        <div className="services-detail-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                className="service-detail-card"
                key={service.number}
              >
                <div className="service-detail-image"><img src={service.image} alt={service.title} loading="lazy" /></div>
                <div className="qk-media-caption"><span>Service</span><strong>{service.title}</strong></div>

                <div className="service-detail-top">
                  <span>
                    {service.number}
                  </span>

                  <div className="service-detail-icon">
                    <Icon size={25} />
                  </div>
                </div>

                <h3>{service.title}</h3>

                <p>
                  {service.description}
                </p>

                <div className="service-detail-line" />
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default ServicesGrid;