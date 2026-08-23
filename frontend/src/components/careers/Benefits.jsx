import Container from "../common/Container";

function Benefits() {
  const benefits = [
    "Learning & development",
    "Technology exposure",
    "Collaborative environment",
    "Growth opportunities"
  ];

  return (
    <section className="section career-benefits">
      <Container>
        <span className="section-eyebrow">
          Benefits
        </span>

        <h2>
          An environment designed for
          <span className="gradient-text">
            {" "}growth.
          </span>
        </h2>

        <div className="career-benefits-grid">
          {benefits.map((benefit) => (
            <div key={benefit}>
              <span>✓</span>
              {benefit}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Benefits;