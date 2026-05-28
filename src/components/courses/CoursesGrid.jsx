import CourseCard from "./CourseCard";

import cCppDsa from "../../assets/course/c_c++_dsa.jpeg";
import cPythonDsa from "../../assets/course/c_python_dsa.jpeg";
import dsaCpp from "../../assets/course/dsa_C++.jpeg";
import dsaPython from "../../assets/course/dsa_Python.jpeg";
import javaImg from "../../assets/course/java.jpeg";
import webFrontend from "../../assets/course/web-frontend.jpeg";
import webFullStack from "../../assets/course/WebFullStack.jpeg";

const courses = [
  {
    id: 1,
    title: "C C++ DSA",
    tech: "DSA, Logic Building, Problem Solving",
    image: cCppDsa,
    badge: "Trending",
    duration: "4 Months",
    timing: "7:00 PM - 8:30 PM",
    category: "job",
    latest: false,
  },

  {
    id: 2,
    title: "C Python DSA",
    tech: "Python, DSA, Algorithms",
    image: cPythonDsa,
    badge: "New",
    duration: "5 Months",
    timing: "6:00 PM - 7:30 PM",
    category: "job",
    latest: false,
  },

  {
    id: 3,
    title: "DSA with C++",
    tech: "STL, Arrays, Trees, Graphs",
    image: dsaCpp,
    badge: "Popular",
    duration: "6 Months",
    timing: "8:00 AM - 9:30 AM",
    category: "job",
    latest: false,
  },

  {
    id: 4,
    title: "DSA with Python",
    tech: "Python, Data Structures",
    image: dsaPython,
    badge: "Latest Batch",
    duration: "5 Months",
    timing: "5:00 PM - 6:30 PM",
    category: "job",
    latest: true,
  },

  {
    id: 5,
    title: "Java Backend",
    tech: "Core Java, Spring Boot",
    image: javaImg,
    badge: "Upcoming",
    duration: "6 Months",
    timing: "9:00 AM - 10:30 AM",
    category: "upcoming",
    latest: false,
  },

  {
    id: 6,
    title: "Web Frontend",
    tech: "HTML, CSS, JavaScript, React",
    image: webFrontend,
    badge: "Upcoming",
    duration: "4 Months",
    timing: "4:00 PM - 5:30 PM",
    category: "upcoming",
    latest: false,
  },

  {
    id: 7,
    title: "Web Full Stack",
    tech: "React, Node, MongoDB",
    image: webFullStack,
    badge: "Newest",
    duration: "8 Months",
    timing: "10:00 AM - 12:00 PM",
    category: "upcoming",
    latest: true,
  },
];

export default function CoursesGrid({ activeTab }) {

  // FILTER CATEGORY
  const filteredCourses =
    activeTab === "all"
      ? courses
      : courses.filter(
          (course) =>
            course.category === activeTab
        );

  // SORT LATEST COURSES FIRST
  const sortedCourses = [...filteredCourses].sort(
    (a, b) => b.latest - a.latest
  );

  return (
    <section className="bg-[#fffdf9] py-20">
      <div className="max-w-[1200px] mx-auto px-6">


        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      </div>
    </section>
  );
}