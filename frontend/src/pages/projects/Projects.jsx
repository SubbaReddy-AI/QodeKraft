import ProjectsHero from "../../components/projects/ProjectsHero";
import ProjectFilters from "../../components/projects/ProjectFilters";
import ProjectGrid from "../../components/projects/ProjectGrid";
import FeaturedProjects from "../../components/projects/FeaturedProjects";
import ProjectTechnology from "../../components/projects/ProjectTechnology";

function Projects() {
  return (
    <main className="qk-page qk-page-projects">
      <ProjectsHero />
      <FeaturedProjects />
      <ProjectFilters />
      <ProjectGrid />
      <ProjectTechnology />
    </main>
  );
}

export default Projects;