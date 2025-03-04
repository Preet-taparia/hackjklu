import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Theme from '@/components/Theme/Theme';
import RetroPrizesSection from '@/components/Prizes/Prizes';
import Sponsors from '@/components/Sponsors/Sponsors';
import Itinary from '@/components/Itenary/Itenary';
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
      <Itinary />
      <Speakers />
      {/* <People /> */}
      <GalleryHome />
      <FAQ />
      <a
        href="#itinerary"
        className="hidden lg:flex fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        Go to Itinerary
      </a>
    </>
  );
}
