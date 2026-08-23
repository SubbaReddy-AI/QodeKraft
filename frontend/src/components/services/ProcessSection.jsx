import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

function ProcessSection() {
  const process = [
    {
      number: "01",
      title: "Understand",
      description:
        "We understand the problem, users, business objectives and technical requirements."
    },
    {
      number: "02",
      title: "Design",
      description:
        "We define the architecture, user experience, technology and implementation strategy."
    },
    {
      number: "03",
      title: "Build",
      description:
        "Our engineering process turns the validated idea into a working product."
    },
    {
      number: "04",
      title: "Improve",
      description:
        "We measure, learn and continuously improve the product after launch."
    }
  ];

  return (
    <section className="section process-section">
      <Container>
        <SectionTitle
          eyebrow="Our process"
          title="From idea to impact."
          description="A structured process keeps ambitious technology projects focused and measurable."
        />

        <div className="process-grid">
          {process.map((item) => (
            <div
              className="process-card"
              key={item.number}
            >
              <span className="process-number">
                {item.number}
              </span>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProcessSection;