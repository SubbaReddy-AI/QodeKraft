import Container from "../common/Container";
import JobCard from "./JobCard";
import careers from "../../data/careers";

function JobGrid() {
  return (
    <section className="section job-section">
      <Container>
        <div className="section-header">
          <span className="section-eyebrow">Open positions</span>
          <h2>Find your next <span className="gradient-text">challenge.</span></h2>
          <p>Explore roles across AI, data, engineering, cloud, product and technology operations.</p>
        </div>
        <div className="job-grid">
          {careers.slice(0, 6).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default JobGrid;
