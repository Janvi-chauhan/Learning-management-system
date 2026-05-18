// src/components/dashboards/teacher/Courses.jsx

import React from "react";
import {
  BookOpen,
  Users,
  Clock,
  Star,
  Layers,
  CheckCircle,
} from "lucide-react";
import teachersData from "../teachersData";
import coursesData from "../courseData";
export default function Courses() {
  const loggedInTeacher =
    JSON.parse(localStorage.getItem("loggedInTeacher")) || teachersData[0];

  const teacher = teachersData.find(
    (item) => item.id === loggedInTeacher.id
  );

  const assignedCourses = teacher?.courses || [];

  const allCourses = [...coursesData];

  const otherCourses = allCourses
    .filter((course) => !assignedCourses.includes(course.title))
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  const CourseCard = ({ course, isAssigned = false }) => (
    <article className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <BookOpen size={24} />
          </div>

          {isAssigned && (
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex items-center gap-1">
              <CheckCircle size={12} />
              Assigned
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {course.title || course}
        </h3>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {course.description ||
            "Comprehensive course designed to help students master this technology."}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-2xl p-3">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock size={12} />
              Duration
            </p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {course.duration || "8 Weeks"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-3">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Users size={12} />
              Students
            </p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {course.students || Math.floor(Math.random() * 100 + 20)}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-3">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Layers size={12} />
              Level
            </p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {course.level || "Intermediate"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-3">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Star size={12} />
              Rating
            </p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {course.rating || "4.8"}
            </p>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <section className="space-y-10">
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          My Courses
        </h1>
        <p className="mt-2 text-gray-500">
          Manage your assigned courses and explore other available
          courses.
        </p>
      </header>

      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircle size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Assigned Courses
            </h2>
            <p className="text-sm text-gray-500">
              Courses currently assigned to you.
            </p>
          </div>
        </div>

        {assignedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {assignedCourses.map((courseName, index) => (
              <CourseCard
                key={index}
                course={courseName}
                isAssigned={true}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center text-gray-500">
            No courses assigned to you.
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Other Available Courses
            </h2>
            <p className="text-sm text-gray-500">
              Explore additional courses offered by the institute.
            </p>
          </div>
        </div>

        {otherCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {otherCourses.map((course, index) => (
              <CourseCard
                key={course.id || index}
                course={course}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center text-gray-500">
            No additional courses available.
          </div>
        )}
      </div>
    </section>
  );
}