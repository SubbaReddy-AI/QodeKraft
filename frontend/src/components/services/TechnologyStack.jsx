import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

function TechnologyStack() {
  const technologies = [
    "Python",
    "JavaScript",
    "React",
    "FastAPI",
    "Node.js",
    "PostgreSQL",
    "MySQL",
    "Docker",
    "Git",
    "GitHub",
    "TensorFlow",
    "PyTorch",
    "LangChain",
    "LLMs",
    "Cloud"
  ];

  return (
    <section className="section technology-section">
      <Container>
        <SectionTitle
          eyebrow="Technology"
          title="The tools behind the work."
          description="We select technologies based on the problem, product requirements, scalability and long-term maintainability."
        />

        <div className="technology-cloud">
          {technologies.map((technology) => (
            <span key={technology}>
              {technology}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TechnologyStack;