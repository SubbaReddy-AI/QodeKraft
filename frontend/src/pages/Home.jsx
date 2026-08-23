import Hero from "../components/home/Hero";
import ServicesOverview from "../components/home/ServicesOverview";
import StatsSection from "../components/home/StatsSection";
import AboutPreview from "../components/home/AboutPreview";
import WhyQodeKraft from "../components/home/WhyQodeKraft";
import FeaturedProjects from "../components/home/FeaturedProjects";
import AcademyPreview from "../components/home/AcademyPreview";
import InternshipPreview from "../components/home/InternshipPreview";
import Testimonials from "../components/home/Testimonials";
import LatestNews from "../components/home/LatestNews";
import Newsletter from "../components/home/Newsletter";
import FinalCTA from "../components/home/FinalCTA";

import "../styles/home.css";

function Home() {
  return (
    <main className="qk-home qk-page qk-page-home">

      <Hero />

      <ServicesOverview />

      <StatsSection />

      <AboutPreview />

      <WhyQodeKraft />

      <FeaturedProjects />

      <AcademyPreview />

      <InternshipPreview />

      <Testimonials />

      <LatestNews />

      <Newsletter />

      <FinalCTA />

    </main>
  );
}

export default Home;