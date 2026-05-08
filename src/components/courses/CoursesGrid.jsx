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
    title: "C C++ DSA",
    tech: "DSA, Logic Building, Problem Solving",
    image: cCppDsa,
    badge: "Trending",
    category: "job", // 👈
  },
  {
    title: "C Python DSA",
    tech: "Python, DSA, Algorithms",
    image: cPythonDsa,
    badge: "New",
    category: "job",
  },
  {
    title: "DSA with C++",
    tech: "STL, Arrays, Trees, Graphs",
    image: dsaCpp,
    badge: "Popular",
    category: "job",
  },
  {
    title: "DSA with Python",
    tech: "Python, Data Structures",
    image: dsaPython,
    badge: "Job Ready",
    category: "job",
  },
  {
    title: "Java Backend",
    tech: "Core Java, Spring Boot",
    image: javaImg,
    category: "upcoming",
  },
  {
    title: "Web Frontend",
    tech: "HTML, CSS, JavaScript, React",
    image: webFrontend,
    category: "upcoming",
  },
  {
    title: "Web Full Stack",
    tech: "React, Node, MongoDB",
    image: webFullStack,
    category: "upcoming",
  },
];

export default function CoursesGrid({ activeTab }) {

  const filteredCourses =
    activeTab === "all"
      ? courses
      : courses.filter((course) => course.category === activeTab);

  return (
    <section className="bg-[#fffdf9] py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}

