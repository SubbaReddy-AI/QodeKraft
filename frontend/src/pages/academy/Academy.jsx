import AcademyHero from "../../components/academy/AcademyHero";
import CourseGrid from "../../components/academy/CourseGrid";
import ProgramSection from "../../components/academy/ProgramSection";
import MentorSection from "../../components/academy/MentorSection";
import CertificationSection from "../../components/academy/CertificationSection";
import StudentProjects from "../../components/academy/StudentProjects";
import FAQ from "../../components/academy/FAQ";

function Academy() {
  return (
    <main className="qk-page qk-page-academy">
      <AcademyHero />
      <CourseGrid />
      <ProgramSection />
      <MentorSection />
      <CertificationSection />
      <StudentProjects />
      <FAQ />
    </main>
  );
}

export default Academy;