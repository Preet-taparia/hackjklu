import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Theme from '@/components/Theme/Theme';
import RetroPrizesSection from '@/components/Prizes/Prizes';
import Sponsors from '@/components/Sponsors/Sponsors';
import Itinary from '@/components/Itenary/Itenary';
import Itenary  from '@/components/Itenary/Itenary1';
import GalleryHome from '@/components/Gallery/GalleryHome';
import WhoShouldApply from '@/components/WhoShouldApply/WhoShouldApply';
import Speakers from '@/components/Speakers/Speakers';
// import People from '@/components/PeopleSections/PeopleSections';
import FAQ from '@/components/FAQ/FAQ';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Theme />
      <RetroPrizesSection />
      <Sponsors />
      <WhoShouldApply />
      <Itenary />
      <Itinary />
      <Speakers />
      {/* <People /> */}
      <GalleryHome />
      <FAQ />
    </>
  );
}
