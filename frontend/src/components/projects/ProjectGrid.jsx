import Container from "../common/Container";
import ProjectCard from "./ProjectCard";
import projects from "../../data/projects";

function ProjectGrid() {
  return (
    <section className="section project-page-grid">
      <Container>
        <div className="all-project-grid">
          {projects.slice(0, 6).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProjectGrid;
