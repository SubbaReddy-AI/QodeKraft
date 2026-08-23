import { useParams, Link } from "react-router-dom";
import Container from "../../components/common/Container";

function JobDetails() {
  const { jobId } = useParams();

  return (
    <section className="detail-page">
      <Container>
        <span className="section-eyebrow">
          Careers
        </span>

        <h1>
          Join the
          <span className="gradient-text">
            {" "}team.
          </span>
        </h1>

        <p className="detail-description">
          Explore the role, responsibilities,
          requirements and growth opportunities.
        </p>

        <div className="detail-info-card">
          <span>Position</span>
          <strong>{jobId}</strong>
        </div>

        <Link
          to="/careers/apply"
          className="btn btn-primary"
        >
          Apply for this position
        </Link>
      </Container>
    </section>
  );
}

export default JobDetails;