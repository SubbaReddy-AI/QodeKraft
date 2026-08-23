import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import InternshipCard from "./InternshipCard";
import internships from "../../data/internships";

function InternshipGrid() {
  return (
    <section className="section internship-grid-section">
      <Container>
        <SectionTitle
          eyebrow="Open opportunities"
          title="Choose where you want to build."
          description="Explore practical internship tracks designed around projects, mentorship and portfolio-ready outcomes."
        />
        <div className="internship-cards">
          {/* Fixed technology path order: AI/ML → GenAI → Data Science → Full Stack → Cloud/DevOps → AI Agents. */}
          {internships.slice(0, 6).map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default InternshipGrid;
