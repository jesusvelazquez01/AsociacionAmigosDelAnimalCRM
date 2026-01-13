import HeroSection from './home/HeroSection';
import AdoptionCTA from './home/AdoptionCTA';
import OurActivities from './home/OurActivities';
import FeaturedPets from './home/FeaturedPets';
import StatsSection from './home/StatsSection';
import HowToHelp from './home/HowToHelp';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AdoptionCTA />
      <OurActivities />
     
      <StatsSection />
      <HowToHelp />
    </>
  );
}
