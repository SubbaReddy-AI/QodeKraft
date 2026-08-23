import { ArrowUpRight } from "lucide-react";

import Container from "../common/Container";

function ServiceCTA() {
  return (
    <section className="inner-cta">
      <Container>
        <div className="inner-cta-content">
          <span className="section-eyebrow">
            Have a challenge?
          </span>

          <h2>
            Let's engineer
            <span className="gradient-text">
              {" "}the solution.
            </span>
          </h2>

          <p>
            Tell us what you are trying to build
            and we'll explore the right technology
            approach with you.
          </p>

          <a
            href="/contact"
            className="btn btn-primary"
          >
            Register for a Course
            <ArrowUpRight size={18} />
          </a>
        </div>
      </Container>
    </section>
  );
}

export default ServiceCTA;