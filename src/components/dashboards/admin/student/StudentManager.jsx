import React, { useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  GraduationCap,
  Eye,
  BookOpen,
  ClipboardCheck,
  Calendar,
  Mail,
  User2,
} from "lucide-react";

import { motion } from "framer-motion";

import studentsData from "../../studentData";

// ================= INITIAL FORM =================

const initialForm = {
  name: "",
  email: "",
  course: "",
  year: "",
  batchType: "Online",
  password: "",
  status: "Active",

  assignmentsCompleted: 0,
  totalAssignments: 20,

  testsCompleted: 0,
  totalTests: 5,

  attendance: 0,
};

// ================= COMPONENT =================

const ManageStudents = () => {
  const [students, setStudents] =
    useState(studentsData);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const [formData, setFormData] =
    useState(initialForm);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [
    showProgressModal,
    setShowProgressModal,
  ] = useState(false);

  // ================= HANDLE CHANGE =================

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,

      [target.name]:
        target.type === "number"
          ? Number(target.value)
          : target.value,
    });
  };

  // ================= MODAL =================

  const openModal = (
    student = null
  ) => {
    setEditId(student?.id || null);

    setFormData(
      student || initialForm
    );

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);

    setEditId(null);

    setFormData(initialForm);
  };

  // ================= SUBMIT =================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editId
            ? {
                ...student,
                ...formData,
              }
            : student
        )
      );
    } else {
      setStudents((prev) => [
        ...prev,

        {
          id: Date.now(),
          ...formData,
        },
      ]);
    }

    closeModal();
  };

  // ================= DELETE =================

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Delete this student?"
      )
    ) {
      setStudents((prev) =>
        prev.filter(
          (student) =>
            student.id !== id
        )
      );
    }
  };

  // ================= PROGRESS =================

  const calculateOverallProgress = (
    student
  ) => {
    const assignmentProgress =
      (student.assignmentsCompleted /
        student.totalAssignments) *
      100;

    const testProgress =
      (student.testsCompleted /
        student.totalTests) *
      100;

    return Math.round(
      (assignmentProgress +
        testProgress +
        student.attendance) /
        3
    );
  };

  const openProgressModal = (
    student
  ) => {
    setSelectedStudent({
      ...student,

      overallProgress:
        calculateOverallProgress(
          student
        ),
    });

    setShowProgressModal(true);
  };

  const closeProgressModal = () => {
    setSelectedStudent(null);

    setShowProgressModal(false);
  };

  // ================= FILTER =================

  const filteredStudents =
    students.filter((student) =>
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

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        
        {/* LEFT */}

        <div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-sm">
            
            <div className="w-2 h-2 rounded-full bg-[#ff6b3d]" />

            <span className="text-sm font-medium text-slate-600">
              Student Workspace
            </span>

          </div>

          <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-800">
            Manage Students
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Create student accounts and track learning progress.
          </p>

        </div>

        {/* BUTTON */}

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={() =>
            openModal()
          }
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#ff6b3d] to-[#ff9f43] text-white font-semibold shadow-lg shadow-orange-200 transition-all"
        >
          <Plus size={18} />
          Add Student
        </motion.button>

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
          (student, index) => {
            const overallProgress =
              calculateOverallProgress(
                student
              );

            return (
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

                {/* TOP */}

                <div className="relative bg-gradient-to-r from-[#ff6b3d] to-[#ff9f43] p-6 text-white overflow-hidden">
                  
                  <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-8 translate-x-8" />

                  <div className="flex items-center gap-4 relative z-10">
                    
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <GraduationCap size={28} />
                    </div>

                    <div className="min-w-0">
                      
                      <h3 className="text-xl font-bold truncate">
                        {student.name}
                      </h3>

                      <p className="text-sm text-orange-100 truncate mt-1">
                        {student.course}
                      </p>

                    </div>

                  </div>

                </div>

                {/* BODY */}

                <div className="p-6">
                  
                  {/* DETAILS */}

                  <div className="space-y-4 mb-6">
                    
                    <div className="flex items-center gap-3 text-slate-600">
                      
                      <Mail size={16} />

                      <span className="text-sm truncate">
                        {student.email}
                      </span>

                    </div>

                    <div className="flex items-center justify-between">
                      
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar size={16} />
                        <span className="text-sm">
                          {student.year}
                        </span>
                      </div>

                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          student.batchType ===
                          "Online"
                            ? "bg-sky-100 text-sky-600"
                            : "bg-violet-100 text-violet-600"
                        }`}
                      >
                        {student.batchType}
                      </span>

                    </div>

                    <div className="flex items-center justify-between">
                      
                      <span className="text-sm text-slate-500">
                        Status
                      </span>

                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          student.status ===
                          "Active"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-rose-100 text-rose-600"
                        }`}
                      >
                        {student.status}
                      </span>

                    </div>

                  </div>

                  {/* PROGRESS */}

                  <div className="mb-6">
                    
                    <div className="flex items-center justify-between mb-2">
                      
                      <span className="text-sm font-medium text-slate-700">
                        Overall Progress
                      </span>

                      <span className="text-sm font-bold text-[#ff6b3d]">
                        {overallProgress}%
                      </span>

                    </div>

                    <ProgressBar
                      value={
                        overallProgress
                      }
                    />

                  </div>

                  {/* ACTIONS */}

                  <div className="grid grid-cols-3 gap-3">
                    
                    <motion.button
                      whileHover={{
                        scale: 1.03,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={() =>
                        openModal(
                          student
                        )
                      }
                      className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-orange-100 text-orange-600 hover:bg-orange-200 transition-all"
                    >
                      <Pencil size={16} />

                      <span className="text-xs font-medium">
                        Edit
                      </span>

                    </motion.button>

                    <motion.button
                      whileHover={{
                        scale: 1.03,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={() =>
                        openProgressModal(
                          student
                        )
                      }
                      className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-sky-100 text-sky-600 hover:bg-sky-200 transition-all"
                    >
                      <Eye size={16} />

                      <span className="text-xs font-medium">
                        Progress
                      </span>

                    </motion.button>

                    <motion.button
                      whileHover={{
                        scale: 1.03,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={() =>
                        handleDelete(
                          student.id
                        )
                      }
                      className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-rose-100 text-rose-600 hover:bg-rose-200 transition-all"
                    >
                      <Trash2 size={16} />

                      <span className="text-xs font-medium">
                        Delete
                      </span>

                    </motion.button>

                  </div>

                </div>

              </motion.div>
            );
          }
        )}

      </div>

      {/* ================= NO DATA ================= */}

      {filteredStudents.length ===
        0 && (
        <div className="rounded-[30px] border border-white/80 bg-white/75 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.05)] p-14 text-center text-slate-500 mt-6">
          No students found.
        </div>
      )}

      {/* ================= ADD/EDIT MODAL ================= */}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="w-full max-w-2xl rounded-[32px] border border-white/80 bg-white/90 backdrop-blur-2xl shadow-2xl"
          >
            
            {/* HEADER */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              
              <h2 className="text-3xl font-bold text-slate-800">
                {editId
                  ? "Edit Student"
                  : "Add Student"}
              </h2>

              <button
                onClick={
                  closeModal
                }
                className="p-2 rounded-xl hover:bg-slate-100 transition-all"
              >
                <X size={20} />
              </button>

            </div>

          </motion.div>

        </div>
      )}
    </div>
  );
};

export default ManageStudents;