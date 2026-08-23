import CareersHero from "../../components/careers/CareersHero";
import WhyWorkWithUs from "../../components/careers/WhyWorkWithUs";
import JobGrid from "../../components/careers/JobGrid";
import Benefits from "../../components/careers/Benefits";
import LifeAtQodeKraft from "../../components/careers/LifeAtQodeKraft";

function Careers() {
  return (
    <main className="qk-page qk-page-careers">
      <CareersHero />
      <WhyWorkWithUs />
      <JobGrid />
      <Benefits />
      <LifeAtQodeKraft />
    </main>
  );
}

export default Careers;