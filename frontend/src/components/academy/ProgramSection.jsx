import Container from "../common/Container";

function ProgramSection() {
  const programs = [
    {
      number: "01",
      title: "Learn",
      text:
        "Understand the concepts and foundations."
    },
    {
      number: "02",
      title: "Practice",
      text:
        "Apply concepts through guided exercises."
    },
    {
      number: "03",
      title: "Build",
      text:
        "Create projects that demonstrate real skills."
    },
    {
      number: "04",
      title: "Launch",
      text:
        "Turn your learning into portfolio-ready work."
    }
  ];

  return (
    <section className="section program-section">
      <Container>
        <div className="program-header">
          <span className="section-eyebrow">
            Our learning model
          </span>

          <h2>
            Learning should end with
            <span className="gradient-text">
              {" "}something you built.
            </span>
          </h2>
        </div>

        <div className="program-grid">
          {programs.map((program) => (
            <div
              className="program-card"
              key={program.number}
            >
              <span>
                {program.number}
              </span>

              <h3>{program.title}</h3>

              <p>{program.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProgramSection;