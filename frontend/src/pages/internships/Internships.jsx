import InternshipHero from "../../components/internships/InternshipHero";
import InternshipGrid from "../../components/internships/InternshipGrid";
import Benefits from "../../components/internships/Benefits";
import Eligibility from "../../components/internships/Eligibility";
import InternshipProcess from "../../components/internships/InternshipProcess";

function Internships() {
  return (
    <main className="qk-page qk-page-internships">
      <InternshipHero />
      <InternshipGrid />
      <Benefits />
      <Eligibility />
      <InternshipProcess />
    </main>
  );
}

export default Internships;