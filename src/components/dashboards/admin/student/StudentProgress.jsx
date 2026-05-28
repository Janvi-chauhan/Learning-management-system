import React, { useState } from "react";

import {
  Search,
  GraduationCap,
  FileText,
  ClipboardCheck,
  Calendar,
  Eye,
  Mail,
  X,
} from "lucide-react";

import { motion } from "framer-motion";

import studentsData from "../../studentData";

// ================= INITIAL DATA =================

const initialStudents =
  studentsData;

// ================= COMPONENT =================

const StudentProgress = () => {
  const [search, setSearch] =
    useState("");

  const [
    selectedStudent,
    setSelectedStudent,
  ] = useState(null);

  // ================= CALCULATE PROGRESS =================

  const students =
    initialStudents.map(
      (student) => {
        const assignmentProgress =
          (student.assignmentsCompleted /
            student.totalAssignments) *
          100;

        const testProgress =
          (student.testsCompleted /
            student.totalTests) *
          100;

        const overallProgress =
          Math.round(
            (assignmentProgress +
              testProgress +
              student.attendance) /
              3
          );

        return {
          ...student,

          assignmentProgress:
            Math.round(
              assignmentProgress
            ),

          testProgress:
            Math.round(
              testProgress
            ),

          overallProgress,
        };
      }
    );

  // ================= FILTER =================

  const filteredStudents =
    students.filter(
      (student) =>
        student.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  // ================= PROGRESS BAR =================

  const ProgressBar = ({
    value,
    color =
      "from-[#ff6b3d] to-[#ff9f43]",
  }) => (
    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`}
        style={{
          width: `${value}%`,
        }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f9fafb] to-[#eef2ff] p-6">
      
      {/* ================= HEADER ================= */}

      <div className="mb-8">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-sm">
          
          <div className="w-2 h-2 rounded-full bg-[#ff6b3d]" />

          <span className="text-sm font-medium text-slate-600">
            Progress Workspace
          </span>

        </div>

        <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-800">
          Student Progress Tracking
        </h1>

        <p className="text-slate-500 mt-3 text-lg max-w-3xl">
          Monitor assignments, tests, attendance,
          learning activity and overall student
          performance analytics.
        </p>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="rounded-[28px] border border-white/80 bg-white/75 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.05)] p-4 mb-6">
        
        <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3">
          
          <Search
            className="text-slate-400 mr-3"
            size={18}
          />

          <input
            type="text"
            placeholder="Search student by name..."
            className="w-full outline-none bg-transparent text-slate-700"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

      </div>

      {/* ================= STUDENT CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {filteredStudents.map(
          (student, index) => (
            <motion.div
              key={student.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  index * 0.05,
              }}
              whileHover={{
                y: -4,
              }}
              className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/75 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.05)]"
            >
              
              {/* Glow */}

              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-orange-200/10 blur-3xl" />

              {/* HEADER */}

              <div className="relative bg-gradient-to-r from-[#ff6b3d] to-[#ff9f43] p-6 text-white overflow-hidden">
                
                <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-8 translate-x-8" />

                <div className="relative z-10 flex items-center gap-4">
                  
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <GraduationCap size={28} />
                  </div>

                  <div className="min-w-0">
                    
                    <h3 className="text-xl font-bold truncate">
                      {student.name}
                    </h3>

                    <p className="text-sm text-orange-100 truncate mt-1">
                      {student.email}
                    </p>

                  </div>

                </div>

              </div>

              {/* BODY */}

              <div className="p-6">
                
                {/* COURSES */}

                <div className="mb-5">
                  
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Enrolled Courses
                  </p>

                  <div className="flex flex-wrap gap-2">
                    
                    {student.course.map(
                      (
                        course,
                        index
                      ) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-600"
                        >
                          {course}
                        </span>
                      )
                    )}

                  </div>

                </div>

                {/* OVERALL */}

                <div className="mb-6">
                  
                  <div className="flex justify-between mb-2">
                    
                    <span className="text-sm font-medium text-slate-700">
                      Overall Progress
                    </span>

                    <span className="text-sm font-bold text-[#ff6b3d]">
                      {
                        student.overallProgress
                      }
                      %
                    </span>

                  </div>

                  <ProgressBar
                    value={
                      student.overallProgress
                    }
                  />

                </div>

                {/* STATS */}

                <div className="space-y-4 mb-6">
                  
                  {/* Assignments */}

                  <div>
                    
                    <div className="flex justify-between mb-1">
                      
                      <span className="flex items-center gap-2 text-sm text-slate-600">
                        <FileText size={14} />
                        Assignments
                      </span>

                      <span className="text-sm font-medium text-slate-700">
                        {
                          student.assignmentsCompleted
                        }
                        /
                        {
                          student.totalAssignments
                        }
                      </span>

                    </div>

                    <ProgressBar
                      value={
                        student.assignmentProgress
                      }
                      color="from-sky-500 to-sky-400"
                    />

                  </div>

                  {/* Tests */}

                  <div>
                    
                    <div className="flex justify-between mb-1">
                      
                      <span className="flex items-center gap-2 text-sm text-slate-600">
                        <ClipboardCheck size={14} />
                        Tests
                      </span>

                      <span className="text-sm font-medium text-slate-700">
                        {
                          student.testsCompleted
                        }
                        /
                        {
                          student.totalTests
                        }
                      </span>

                    </div>

                    <ProgressBar
                      value={
                        student.testProgress
                      }
                      color="from-emerald-500 to-emerald-400"
                    />

                  </div>

                  {/* Attendance */}

                  <div>
                    
                    <div className="flex justify-between mb-1">
                      
                      <span className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={14} />
                        Attendance
                      </span>

                      <span className="text-sm font-medium text-slate-700">
                        {
                          student.attendance
                        }
                        %
                      </span>

                    </div>

                    <ProgressBar
                      value={
                        student.attendance
                      }
                      color="from-yellow-500 to-orange-400"
                    />

                  </div>

                </div>

                {/* BUTTON */}

                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() =>
                    setSelectedStudent(
                      student
                    )
                  }
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff6b3d] to-[#ff9f43] text-white py-3 rounded-2xl font-semibold shadow-lg shadow-orange-200"
                >
                  <Eye size={16} />
                  View Details
                </motion.button>

              </div>

            </motion.div>
          )
        )}

      </div>

      {/* ================= NO STUDENTS ================= */}

      {filteredStudents.length ===
        0 && (
        <div className="rounded-[30px] border border-white/80 bg-white/75 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.05)] p-14 text-center text-slate-500 mt-6">
          No students found.
        </div>
      )}

      {/* ================= MODAL ================= */}

      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="w-full max-w-2xl rounded-[32px] border border-white/80 bg-white/90 backdrop-blur-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto"
          >
            
            {/* TOP */}

            <div className="flex items-start justify-between mb-8">
              
              <div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">
                  
                  <div className="w-2 h-2 rounded-full bg-orange-500" />

                  Student Analytics

                </div>

                <h2 className="mt-4 text-4xl font-bold text-slate-800">
                  {
                    selectedStudent.name
                  }
                </h2>

                <div className="flex items-center gap-2 mt-3 text-slate-500">
                  
                  <Mail size={16} />

                  <span>
                    {
                      selectedStudent.email
                    }
                  </span>

                </div>

              </div>

              <button
                onClick={() =>
                  setSelectedStudent(
                    null
                  )
                }
                className="p-2 rounded-xl hover:bg-slate-100 transition-all"
              >
                <X size={20} />
              </button>

            </div>

            {/* COURSES */}

            <div className="mb-8">
              
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Enrolled Courses
              </p>

              <div className="flex flex-wrap gap-2">
                
                {selectedStudent.course.map(
                  (
                    course,
                    index
                  ) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-full text-sm font-semibold bg-orange-100 text-orange-600"
                    >
                      {course}
                    </span>
                  )
                )}

              </div>

            </div>

            {/* ANALYTICS */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              
              {[
                {
                  label:
                    "Assignments",

                  value: `${selectedStudent.assignmentsCompleted}/${selectedStudent.totalAssignments}`,

                  color:
                    "bg-sky-100 text-sky-600",
                },

                {
                  label: "Tests",

                  value: `${selectedStudent.testsCompleted}/${selectedStudent.totalTests}`,

                  color:
                    "bg-emerald-100 text-emerald-600",
                },

                {
                  label:
                    "Attendance",

                  value: `${selectedStudent.attendance}%`,

                  color:
                    "bg-yellow-100 text-yellow-600",
                },

                {
                  label:
                    "Overall Progress",

                  value: `${selectedStudent.overallProgress}%`,

                  color:
                    "bg-orange-100 text-orange-600",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-slate-100 bg-slate-50/80 p-5"
                >
                  
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${item.color}`}>
                    <GraduationCap size={20} />
                  </div>

                  <p className="text-sm text-slate-500">
                    {item.label}
                  </p>

                  <h3 className="text-2xl font-bold text-slate-800 mt-2">
                    {item.value}
                  </h3>

                </div>
              ))}

            </div>

            {/* CLOSE */}

            <button
              onClick={() =>
                setSelectedStudent(
                  null
                )
              }
              className="w-full py-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all font-medium"
            >
              Close
            </button>

          </motion.div>

        </div>
      )}
    </div>
  );
};

export default StudentProgress;