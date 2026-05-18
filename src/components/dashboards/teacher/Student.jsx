import React from "react";
import studentsData from "../studentData";
import teachersData from "../teachersData";
import {
  Users,
  Mail,
  BookOpen,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function Students() {
  const loggedInTeacher =
    JSON.parse(localStorage.getItem("loggedInTeacher")) || teachersData[0];

  const teacher = teachersData.find(
    (item) => item.id === loggedInTeacher.id
  );

  const teacherStudents = studentsData.filter((student) =>
    teacher?.studentIds?.includes(student.id)
  );

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          My Students
        </h1>
        <p className="mt-2 text-gray-500">
          View all students assigned to your courses.
        </p>
      </header>

      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Assigned Students
            </h2>
            <p className="text-sm text-gray-500">
              Total Students: {teacherStudents.length}
            </p>
          </div>
        </div>

        {teacherStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {teacherStudents.map((student) => (
              <article
                key={student.id}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {student.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2 break-all">
                      <Mail size={14} />
                      {student.email}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      student.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {student.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                      Courses
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {student.course.map((course, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-medium"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-gray-50 rounded-2xl p-3">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar size={12} />
                        Batch Type
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {student.batchType}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-3">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <CheckCircle size={12} />
                        Attendance
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {student.attendance}%
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-3">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <BookOpen size={12} />
                      Duration
                    </p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {student.year}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 rounded-2xl p-3">
                      <p className="text-xs text-blue-600">
                        Assignments
                      </p>
                      <p className="text-sm font-bold text-blue-700 mt-1">
                        {student.assignmentsCompleted}/
                        {student.totalAssignments}
                      </p>
                    </div>

                    <div className="bg-yellow-50 rounded-2xl p-3">
                      <p className="text-xs text-yellow-600">
                        Tests
                      </p>
                      <p className="text-sm font-bold text-yellow-700 mt-1">
                        {student.testsCompleted}/{student.totalTests}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-4">
              <XCircle size={36} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              No Students Assigned
            </h3>
            <p className="text-gray-500 mt-2 max-w-md">
              You currently do not have any students assigned to your
              courses.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}