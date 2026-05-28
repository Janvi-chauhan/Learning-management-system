import CourseHero from "../course-details/CourseHero";
import WhatYouLearn from "../course-details/WhatYouLearn";
import CourseRoadmap from "../course-details/CourseRoadmap";
import Curriculum from "../course-details/Curriculum";
import Projects from "../course-details/Projects";
import Mentors from "../course-details/Mentors";
import Certification from "../course-details/Certification";
import Reviews from "../course-details/Reviews";

export default function CourseDetails() {
  return (
    <div className="bg-white">
      <CourseHero />

      <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-3 gap-10 py-16">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-20">
          <WhatYouLearn />
          <CourseRoadmap />
          <Curriculum />
          <Projects />
          <Mentors />
          <Certification />
          <Reviews />
        </div>
      </div>

    </div>
  );
}
