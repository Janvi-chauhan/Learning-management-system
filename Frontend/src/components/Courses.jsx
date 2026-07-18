import { useEffect, useState } from "react";
import api from "../services/api.js";
import {
  BookOpen,
  Clock,
  CheckCircle,
} from "lucide-react";


export default function Courses() {
  console.log("NEW COURSES FILE LOADED");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
//   const [teacherStatsData, setTeacherStatsData] = useState({
//   liveClasses: 0,
//   assignments: 0,
//   questions: 0,
//   schedules: 0,
// });

  const fetchCourses = async () => {
  try {
    const response = await api.get(
  role === "student"
    ? "/student/courses"
    : "/teacher/courses"
);
    const formattedCourses =
      response.data.map((course) => ({
        ...course,

        description:
          course.category ||
          "No description available",
      }));

    setCourses(formattedCourses);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchCourses();
}, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <h2 className="text-xl font-semibold text-gray-600">
          Loading Courses...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          My Courses
        </h1>

        <p className="text-gray-500 mt-2">
          Explore and continue your learning
          journey.
        </p>
      </div>

      {/* Course Count */}
      <div className="mb-6">
        <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-medium">
          Total Courses: {courses.length}
        </span>
      </div>

      {/* Courses Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Thumbnail Placeholder */}
              <div className="h-48 overflow-hidden">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                 />
         ) : (
           <div className="h-full bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-center">
             <BookOpen
               size={60}
               className="text-white"
             />
           </div>
         )}
       </div>

              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {course.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4">
                  {course.description ||
                    "No description available"}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span>
                      Duration:
                      {" "}
                      {course.duration || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle
                      size={16}
                      className={
                        course.status === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    />

                    <span
                      className={
                        course.status === "active"
                          ? "text-green-600 font-medium"
                          : "text-red-600 font-medium"
                      }
                    >
                      {course.status}
                    </span>
                  </div>
                </div>

                <button className="w-full mt-5 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition">
                  View Course
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No Courses Available
          </h2>

          <p className="text-gray-500 mt-2">
            Courses will appear here once added by
            the admin.
          </p>
        </div>
      )}
    </div>
  );
}