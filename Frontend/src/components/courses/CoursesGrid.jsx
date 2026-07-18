import { useEffect, useState } from "react";
import api from "../../services/api";

import CourseCard from "./CourseCard";

import cCppDsa from "../../assets/course/c_c++_dsa.jpeg";
import cPythonDsa from "../../assets/course/c_python_dsa.jpeg";
import dsaCpp from "../../assets/course/dsa_C++.jpeg";
import dsaPython from "../../assets/course/dsa_Python.jpeg";
import javaImg from "../../assets/course/java.jpeg";
import webFrontend from "../../assets/course/web-frontend.jpeg";
import webFullStack from "../../assets/course/WebFullStack.jpeg";



export default function CoursesGrid({ activeTab }) {

const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);

const fetchCourses = async () => {
  try {
    const response = await api.get("/admin/courses");

    console.log(
      "Courses API Response:",
      response.data
    );
setCourses(
  Array.isArray(response.data.data)
    ? response.data.data
    : []
);
  } catch (error) {
    console.error(
      "Error fetching courses:",
      error
    );
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchCourses();
}, []);

console.log(courses);
console.log(loading);

// if (loading) {
//   return (
//     <div className="text-center py-20">
//       Loading Courses...
//     </div>
//   );
// }

  // FILTER CATEGORY
 const filteredCourses = Array.isArray(courses)
  ? activeTab === "all"
    ? courses
    : courses.filter(
        (course) =>
          course.category?.toLowerCase() ===
          activeTab.toLowerCase()
      )
  : [];
  // SORT LATEST COURSES FIRST
  const sortedCourses = [...filteredCourses];

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