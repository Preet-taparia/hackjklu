import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Theme from '@/components/Theme/Theme';
import RetroPrizesSection from '@/components/Prizes/Prizes';
import Sponsors from '@/components/Sponsors/Sponsors';
import Itenary from '@/components/Itenary/Itenary';
import GalleryHome from '@/components/Gallery/GalleryHome';
import WhoShouldApply from '@/components/WhoShouldApply/WhoShouldApply';
import Speakers from '@/components/Speakers/Speakers';
// import People from '@/components/PeopleSections/PeopleSections';
import FAQ from '@/components/FAQ/FAQ';
import TimerPage from '@/app/timer/page';

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
      <Speakers />
      {/* <People /> */}
      <GalleryHome />
      <FAQ />
      <TimerPage /> {/* Add TimerPage component here */}
    </>
  );
}
