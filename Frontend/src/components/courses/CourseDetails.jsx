import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api.js";
import CourseHero from "../course-details/CourseHero";
import WhatYouLearn from "../course-details/WhatYouLearn";
import CourseRoadmap from "../course-details/CourseRoadmap";
import Curriculum from "../course-details/Curriculum";
import Projects from "../course-details/Projects";
import Mentors from "../course-details/Mentors";
import Certification from "../course-details/Certification";
import Reviews from "../course-details/Reviews";

export default function CourseDetails() {

  const { id } = useParams();

  const [course, setCourse] = useState(null);

  useEffect(() => {

    const fetchCourse = async () => {

      try {

        const response =
          await api.get(`/student/courses/${id}`);

        setCourse(response.data.data);
        console.log(
  "Course Details:",
  response.data.data
);

      } catch (error) {

        console.log(error);

      }
    };

    fetchCourse();

  }, [id]);

  if (!course) {

    return (
      <div className="text-center py-20">
        Loading Course...
      </div>
    );
  }

  return (
    <div className="bg-white">

      <CourseHero course={course} />

      <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-3 gap-10 py-16">

        <div className="lg:col-span-2 space-y-20">

          <WhatYouLearn course={course} />

          <CourseRoadmap course={course} />
          <Curriculum course={course} />
          <Projects course={course} />
          <Mentors course={course} />
          <Certification course={course} />
          <Reviews course={course} />

        </div>

      </div>
    </div>
  );
}

