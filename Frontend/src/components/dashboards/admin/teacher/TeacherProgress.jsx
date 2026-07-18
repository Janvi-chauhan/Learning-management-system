// TeacherProgress.jsx

import React, { useState } from "react";
import {
  Search,
  GraduationCap,
  BookOpen,
  Users,
  Calendar,
  Eye,
} from "lucide-react";
import teachersData from "../../teachersData";

const TeacherProgress = () => {
  const [search, setSearch] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Calculate performance metrics
  const teachers = teachersData.map((teacher) => {
    const courseProgress =
      teacher.totalCourses > 0
        ? (teacher.coursesAssigned / teacher.totalCourses) * 100
        : 0;

    const studentsHandledScore = Math.min(
      teacher.studentsHandled || 0,
      100
    );

    const overallPerformance = Math.round(
      (courseProgress +
        studentsHandledScore +
        (teacher.attendance || 0)) /
        3
    );

    return {
      ...teacher,
      courseProgress: Math.round(courseProgress),
      studentsHandledScore,
      overallPerformance,
    };
  });

  // Search teachers
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(search.toLowerCase())
  );

  // Progress bar component
  const ProgressBar = ({
    value,
    color = "bg-red-500",
  }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
      <div
        className={`${color} h-2.5 rounded-full transition-all duration-500`}
        style={{
          width: `${Math.min(value, 100)}%`,
        }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Teacher Performance Tracking
        </h1>
        <p className="text-gray-500 mt-1">
          Monitor assigned courses, students handled,
          attendance, and overall performance.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex items-center mb-6">
        <Search className="text-gray-400 mr-3" size={18} />
        <input
          type="text"
          placeholder="Search teacher by name..."
          className="w-full outline-none text-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Teacher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                  <GraduationCap size={28} />
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-lg truncate">
                    {teacher.name}
                  </h3>
                  <p className="text-red-100 text-sm truncate">
                    {teacher.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              {/* Specialization */}
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  Subject
                </p>
                <p className="font-medium text-gray-900">
                  {teacher.subject}
                </p>
              </div>

              {/* Courses Assigned */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Courses Assigned
                </p>

                <div className="flex flex-wrap gap-2">
                  {teacher.courses &&
                  teacher.courses.length > 0 ? (
                    <>
                      {teacher.courses
                        .slice(0, 3)
                        .map((course, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100"
                          >
                            {course}
                          </span>
                        ))}

                      {teacher.courses.length > 3 && (
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                          +{teacher.courses.length - 3} more
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-gray-400 text-xs">
                      No courses assigned
                    </span>
                  )}
                </div>
              </div>

              {/* Overall Performance */}
              <div className="mb-5">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">
                    Overall Performance
                  </span>
                  <span className="font-semibold text-red-600">
                    {teacher.overallPerformance}%
                  </span>
                </div>
                <ProgressBar
                  value={teacher.overallPerformance}
                />
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 text-sm mb-5">
                {/* Courses Progress */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="flex items-center gap-1 text-gray-600">
                      <BookOpen size={14} />
                      Courses
                    </span>
                    <span>
                      {teacher.coursesAssigned}/
                      {teacher.totalCourses}
                    </span>
                  </div>
                  <ProgressBar
                    value={teacher.courseProgress}
                    color="bg-blue-500"
                  />
                </div>

                {/* Students Handled */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Users size={14} />
                      Students
                    </span>
                    <span>
                      {teacher.studentsHandled}
                    </span>
                  </div>
                  <ProgressBar
                    value={
                      teacher.studentsHandledScore
                    }
                    color="bg-green-500"
                  />
                </div>

                {/* Attendance */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Calendar size={14} />
                      Attendance
                    </span>
                    <span>{teacher.attendance}%</span>
                  </div>
                  <ProgressBar
                    value={teacher.attendance}
                    color="bg-yellow-500"
                  />
                </div>
              </div>

              {/* View Details Button */}
              <button
                onClick={() =>
                  setSelectedTeacher(teacher)
                }
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#EF0000] to-[#C40000] text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
              >
                <Eye size={16} />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Teachers Found */}
      {filteredTeachers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No teachers found.
        </div>
      )}

      {/* Details Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedTeacher.name}
            </h2>

            {/* Email */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">
                Email
              </p>
              <p className="font-medium">
                {selectedTeacher.email}
              </p>
            </div>

            {/* Subject */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">
                Subject
              </p>
              <p className="font-medium">
                {selectedTeacher.subject}
              </p>
            </div>

            {/* Courses Assigned */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">
                Courses Assigned
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedTeacher.courses &&
                selectedTeacher.courses.length > 0 ? (
                  selectedTeacher.courses.map(
                    (course, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-700 border border-red-100"
                      >
                        {course}
                      </span>
                    )
                  )
                ) : (
                  <p className="text-gray-400 text-sm">
                    No courses assigned
                  </p>
                )}
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">
                  Courses Assigned
                </p>
                <p className="text-lg font-semibold">
                  {selectedTeacher.coursesAssigned}/
                  {selectedTeacher.totalCourses}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">
                  Students Handled
                </p>
                <p className="text-lg font-semibold">
                  {selectedTeacher.studentsHandled}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">
                  Attendance
                </p>
                <p className="text-lg font-semibold">
                  {selectedTeacher.attendance}%
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                <p className="text-sm text-gray-500">
                  Overall Performance
                </p>
                <p className="text-lg font-bold text-red-600">
                  {
                    selectedTeacher.overallPerformance
                  }
                  %
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() =>
                setSelectedTeacher(null)
              }
              className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherProgress;