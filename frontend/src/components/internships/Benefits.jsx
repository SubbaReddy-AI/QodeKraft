import {
  Rocket,
  Users,
  Code2,
  Award
} from "lucide-react";

import Container from "../common/Container";

function Benefits() {
  const benefits = [
    {
      icon: Rocket,
      title: "Real Projects"
    },
    {
      icon: Users,
      title: "Mentorship"
    },
    {
      icon: Code2,
      title: "Technical Skills"
    },
    {
      icon: Award,
      title: "Career Growth"
    }
  ];

  return (
    <section className="section benefits-section">
      <Container>
        <div className="benefits-grid">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                className="benefit-card"
                key={benefit.title}
              >
                <Icon size={28} />

                <h3>
                  {benefit.title}
                </h3>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Benefits;