import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import CourseCard from "./CourseCard";
import courses from "../../data/courses";

function CourseGrid() {
  return (
    <section className="section academy-courses">
      <Container>
        <SectionTitle
          eyebrow="Learning paths"
          title="Choose your technology path."
          description="Practical learning paths built around skills, projects and modern technology."
        />
        <div className="course-grid premium-data-grid">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CourseGrid;
