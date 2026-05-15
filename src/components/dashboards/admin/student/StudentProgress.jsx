// StudentProgress.jsx

import React, { useState } from "react";
import {
  Search,
  GraduationCap,
  FileText,
  ClipboardCheck,
  Calendar,
  Eye,
  BookOpen,
  Mail,
} from "lucide-react";
import studentsData from "../../studentData";

const initialStudents = studentsData

const StudentProgress = () => {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Calculate progress
  const students = initialStudents.map((student) => {
    const assignmentProgress =
      (student.assignmentsCompleted /
        student.totalAssignments) *
      100;

    const testProgress =
      (student.testsCompleted / student.totalTests) *
      100;

    const overallProgress = Math.round(
      (assignmentProgress +
        testProgress +
        student.attendance) /
        3
    );

    return {
      ...student,
      assignmentProgress: Math.round(assignmentProgress),
      testProgress: Math.round(testProgress),
      overallProgress,
    };
  });

  // Search filter
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  // Reusable progress bar
  const ProgressBar = ({ value, color = "bg-red-500" }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
      <div
        className={`${color} h-2.5 rounded-full transition-all duration-500`}
        style={{ width: `${value}%` }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Student Progress Tracking
        </h1>
        <p className="text-gray-500 mt-1">
          Monitor enrolled courses, assignments,
          tests, attendance, and overall progress.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex items-center mb-6">
        <Search className="text-gray-400 mr-3" size={18} />
        <input
          type="text"
          placeholder="Search student by name..."
          className="w-full outline-none text-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                  <GraduationCap size={28} />
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-lg truncate">
                    {student.name}
                  </h3>
                  <p className="text-red-100 text-sm truncate">
                    {student.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Enrolled Courses */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Enrolled Courses
                </p>

                <div className="flex flex-wrap gap-2">
                  {student.course.map((course, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Overall Progress */}
              <div className="mb-5">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">
                    Overall Progress
                  </span>
                  <span className="font-semibold text-red-600">
                    {student.overallProgress}%
                  </span>
                </div>
                <ProgressBar
                  value={student.overallProgress}
                />
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 text-sm mb-5">
                {/* Assignments */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="flex items-center gap-1 text-gray-600">
                      <FileText size={14} />
                      Assignments
                    </span>
                    <span>
                      {student.assignmentsCompleted}/
                      {student.totalAssignments}
                    </span>
                  </div>
                  <ProgressBar
                    value={student.assignmentProgress}
                    color="bg-blue-500"
                  />
                </div>

                {/* Tests */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="flex items-center gap-1 text-gray-600">
                      <ClipboardCheck size={14} />
                      Tests
                    </span>
                    <span>
                      {student.testsCompleted}/
                      {student.totalTests}
                    </span>
                  </div>
                  <ProgressBar
                    value={student.testProgress}
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
                    <span>{student.attendance}%</span>
                  </div>
                  <ProgressBar
                    value={student.attendance}
                    color="bg-yellow-500"
                  />
                </div>
              </div>

              {/* View Details Button */}
              <button
                onClick={() =>
                  setSelectedStudent(student)
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

      {/* No Students */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No students found.
        </div>
      )}

      {/* Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedStudent.name}
            </h2>

            {/* Email */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">
                Email
              </p>
              <p className="font-medium">
                {selectedStudent.email}
              </p>
            </div>

            {/* Courses */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">
                Enrolled Courses
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedStudent.course.map(
                  (course, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-700 border border-red-100"
                    >
                      {course}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">
                  Assignments
                </p>
                <p className="text-lg font-semibold">
                  {selectedStudent.assignmentsCompleted}
                  /
                  {selectedStudent.totalAssignments}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">
                  Tests
                </p>
                <p className="text-lg font-semibold">
                  {selectedStudent.testsCompleted}/
                  {selectedStudent.totalTests}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">
                  Attendance
                </p>
                <p className="text-lg font-semibold">
                  {selectedStudent.attendance}%
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                <p className="text-sm text-gray-500">
                  Overall Progress
                </p>
                <p className="text-lg font-bold text-red-600">
                  {selectedStudent.overallProgress}%
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setSelectedStudent(null)
              }
              className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProgress;