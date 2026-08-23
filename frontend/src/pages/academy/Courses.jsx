import CourseGrid from "../../components/academy/CourseGrid";
import Container from "../../components/common/Container";

function Courses() {
  return (
    <>
      <section className="page-section">
        <Container>
          <span className="section-eyebrow">
            Academy Courses
          </span>

          <h1>
            Choose your
            <span className="gradient-text">
              {" "}learning path.
            </span>
          </h1>

          <p>
            Explore technology-focused learning
            paths designed around practical skills.
          </p>
        </Container>
      </section>

      <CourseGrid />
    </>
  );
}

export default Courses;