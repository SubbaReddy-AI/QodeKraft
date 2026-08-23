import { useParams } from "react-router-dom";
import Container from "../../components/common/Container";

function ProjectDetails() {
  const { projectId } = useParams();

  return (
    <section className="detail-page">
      <Container>
        <span className="section-eyebrow">
          Case Study
        </span>

        <h1>
          Project
          <span className="gradient-text">
            {" "}Overview
          </span>
        </h1>

        <p className="detail-description">
          Explore the problem, solution, technology
          and implementation behind this project.
        </p>

        <div className="detail-info-card">
          <span>Project ID</span>
          <strong>{projectId}</strong>
        </div>
      </Container>
    </section>
  );
}

export default ProjectDetails;