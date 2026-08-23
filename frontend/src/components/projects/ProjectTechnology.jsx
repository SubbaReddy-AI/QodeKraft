import Container from "../common/Container";

function ProjectTechnology() {
  const stack = [
    "React",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "Machine Learning",
    "Generative AI",
    "Docker",
    "Cloud"
  ];

  return (
    <section className="section project-tech">
      <Container>
        <span className="section-eyebrow">
          Technology
        </span>

        <h2>
          Built with modern
          <span className="gradient-text">
            {" "}technology.
          </span>
        </h2>

        <div className="technology-cloud">
          {stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProjectTechnology;