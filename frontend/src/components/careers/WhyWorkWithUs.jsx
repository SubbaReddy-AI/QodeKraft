import {
  Rocket,
  BrainCircuit,
  Users,
  Target
} from "lucide-react";

import Container from "../common/Container";

function WhyWorkWithUs() {
  const reasons = [
    [Rocket, "Build meaningful work"],
    [BrainCircuit, "Work with modern technology"],
    [Users, "Learn with strong teams"],
    [Target, "Grow with responsibility"]
  ];

  return (
    <section className="section careers-values">
      <Container>
        <div className="careers-value-grid">
          {reasons.map(
            ([Icon, title]) => (
              <div
                className="careers-value-card"
                key={title}
              >
                <Icon size={28} />

                <h3>{title}</h3>
              </div>
            )
          )}
        </div>
      </Container>
    </section>
  );
}

export default WhyWorkWithUs;