import Container from "../common/Container";

function Eligibility() {
  return (
    <section className="section eligibility-section">
      <Container>
        <div className="eligibility-layout">
          <div>
            <span className="section-eyebrow">
              Eligibility
            </span>

            <h2>
              Bring curiosity.
              <span className="gradient-text">
                {" "}We'll build from there.
              </span>
            </h2>
          </div>

          <div className="eligibility-list">
            <div>
              <strong>01</strong>
              Interest in technology
            </div>

            <div>
              <strong>02</strong>
              Willingness to learn
            </div>

            <div>
              <strong>03</strong>
              Basic technical foundation
            </div>

            <div>
              <strong>04</strong>
              Commitment to project work
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Eligibility;