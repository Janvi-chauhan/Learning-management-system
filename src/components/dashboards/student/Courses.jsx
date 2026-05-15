import React from "react";
import { Sparkles } from "lucide-react";

// ==================== ENROLLED COURSES ====================
const enrolledCourses = [
  {
    id: 1,
    title: "Full Stack Development",
    instructor: "Rahul Sharma",
    duration: "6 Months",
    progress: 75,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    id: 2,
    title: "Data Analysis with AI",
    instructor: "Priya Verma",
    duration: "4 Months",
    progress: 45,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  },
  {
    id: 3,
    title: "Java Backend Development",
    instructor: "Aman Gupta",
    duration: "5 Months",
    progress: 90,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
];

// ==================== NEW COURSE SUGGESTIONS ====================
const suggestedCourses = [
  {
    id: 101,
    title: "AI Agents Development",
    instructor: "Driksha Team",
    duration: "3 Months",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
  {
    id: 102,
    title: "Next.js Masterclass",
    instructor: "Kunal Mehta",
    duration: "2 Months",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  },
  {
    id: 103,
    title: "Cyber Security Fundamentals",
    instructor: "Neha Patil",
    duration: "4 Months",
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87",
  },
];

// ==================== REUSABLE COURSE CARD ====================
function CourseCard({
  course,
  showProgress = false,
  buttonText = "Continue Learning",
}) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition duration-300">
      {/* Image */}
      <div className="w-full h-44 sm:h-52 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2">
          {course.title}
        </h2>

        <div className="mt-3 space-y-1 text-sm sm:text-base text-gray-600">
          <p>
            <span className="font-semibold">
              Instructor:
            </span>{" "}
            {course.instructor}
          </p>

          <p>
            <span className="font-semibold">
              Duration:
            </span>{" "}
            {course.duration}
          </p>
        </div>

        {/* Progress Section */}
        {showProgress && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">
                Progress
              </span>

              <span className="text-red-600 font-semibold">
                {course.progress}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-600 h-2.5 rounded-full"
                style={{
                  width: `${course.progress}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Button */}
        <button className="w-full mt-5 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold text-sm sm:text-base transition">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================
export default function Courses() {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-3 sm:p-5 lg:p-6 overflow-hidden">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          My Courses
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-1">
          View your enrolled courses and discover newly launched courses.
        </p>
      </div>

      {/* ==================== ENROLLED COURSES ==================== */}
      <section className="mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5">
          Enrolled Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
          {enrolledCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              showProgress={true}
              buttonText="Continue Learning"
            />
          ))}
        </div>
      </section>

      {/* ==================== SUGGESTED COURSES ==================== */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="text-yellow-500" size={22} />

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Newly Launched Courses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
          {suggestedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              showProgress={false}
              buttonText="Enroll Now"
            />
          ))}
        </div>
      </section>
    </div>
  );
}