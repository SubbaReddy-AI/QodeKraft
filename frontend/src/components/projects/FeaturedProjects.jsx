import Container from "../common/Container";

function FeaturedProjects() {
  return (
    <section className="section featured-projects-page">
      <Container>
        <div className="featured-project-banner">
          <span className="section-eyebrow">
            Featured
          </span>

          <h2>
            Building technology for
            <span className="gradient-text">
              {" "}real problems.
            </span>
          </h2>

          <p>
            Our featured work demonstrates how
            technology can connect ideas,
            engineering and measurable outcomes.
          </p>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedProjects;