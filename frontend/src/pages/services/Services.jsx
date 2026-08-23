import ServiceHero from "../../components/services/ServiceHero";
import ServicesGrid from "../../components/services/ServicesGrid";
import TechnologyStack from "../../components/services/TechnologyStack";
import ProcessSection from "../../components/services/ProcessSection";
import ServiceCTA from "../../components/services/ServiceCTA";

function Services() {
  return (
    <main className="qk-page qk-page-services">
      <ServiceHero />
      <ServicesGrid />
      <TechnologyStack />
      <ProcessSection />
      <ServiceCTA />
    </main>
  );
}

export default Services;