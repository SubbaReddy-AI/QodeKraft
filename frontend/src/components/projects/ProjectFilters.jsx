import { useState } from "react";
import Container from "../common/Container";

function ProjectFilters() {
  const [active, setActive] =
    useState("All");

  const filters = [
    "All",
    "AI",
    "Web",
    "Data",
    "Cloud"
  ];

  return (
    <section className="project-filters">
      <Container>
        <div className="filter-list">
          {filters.map((filter) => (
            <button
              key={filter}
              className={
                active === filter
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActive(filter)
              }
            >
              {filter}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProjectFilters;