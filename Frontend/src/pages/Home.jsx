import Hero from "../components/Hero";
import Stats from "../components/Stats";
import VideoMessage from "../components/VideoMessage";
import LatestCourses from "../components/LatestCourses";
import LatestPlacements from "../components/LatestPlacements";
import CompaniesHiring from "../components/CompaniesHiring";
import Testimonials from "../components/Testimonials";
import ContactUs from "../components/ContactUs";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <VideoMessage />  
      <LatestCourses />
      <LatestPlacements />
      <CompaniesHiring />
      <Testimonials />
      <ContactUs />
      
    </>
  );
}
