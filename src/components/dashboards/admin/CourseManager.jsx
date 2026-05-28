import React, {
  useState,
} from "react";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  BookOpen,
  Clock3,
  IndianRupee,
} from "lucide-react";

import { motion } from "framer-motion";

// ================= INITIAL FORM =================

const initialForm = {
  title: "",
  instructor: "",
  duration: "",
  price: "",
  status: "Active",
};

// ================= SAMPLE DATA =================

const sampleCourses = [
  {
    id: 1,
    title:
      "MERN Stack Development",
    instructor:
      "Rahul Sharma",
    duration: "6 Months",
    price: "25000",
    status: "Active",
  },

  {
    id: 2,
    title:
      "Java Full Stack",
    instructor:
      "Priya Verma",
    duration: "5 Months",
    price: "22000",
    status: "Active",
  },

  {
    id: 3,
    title:
      "UI/UX Design",
    instructor:
      "Aman Gupta",
    duration: "3 Months",
    price: "15000",
    status: "Inactive",
  },
];

// ================= COMPONENT =================

const ManageCourses = () => {
  const [courses, setCourses] =
    useState(sampleCourses);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const [formData, setFormData] =
    useState(initialForm);

  // ================= HANDLE CHANGE =================

  const handleChange = ({
    target,
  }) =>
    setFormData({
      ...formData,

      [target.name]:
        target.value,
    });

  // ================= MODAL =================

  const openModal = (
    course = null
  ) => {
    setEditId(
      course?.id || null
    );

    setFormData(
      course || initialForm
    );

    setShowModal(true);
  };

  // ================= SUBMIT =================

  const handleSubmit = (e) => {
    e.preventDefault();

    setCourses(
      editId
        ? courses.map((c) =>
            c.id === editId
              ? {
                  ...c,
                  ...formData,
                }
              : c
          )
        : [
            ...courses,

            {
              id: Date.now(),
              ...formData,
            },
          ]
    );

    setShowModal(false);

    setFormData(initialForm);
  };

  // ================= DELETE =================

  const handleDelete = (
    id
  ) =>
    window.confirm(
      "Delete this course?"
    ) &&
    setCourses(
      courses.filter(
        (c) => c.id !== id
      )
    );

  // ================= FILTER =================

  const filteredCourses =
    courses.filter((c) =>
      Object.values(c)
        .join(" ")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
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
              Course Workspace
            </span>

          </div>

          <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-800">
            Manage Courses
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Explore, manage and organize learning programs.
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
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#ff6b3d] to-[#ff9f43] text-white font-semibold shadow-lg shadow-orange-200 transition-all"
        >
          <Plus size={18} />
          Add Course
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
            placeholder="Search courses..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full bg-transparent outline-none text-slate-700"
          />

        </div>

      </div>

      {/* ================= COURSES ================= */}

      {filteredCourses.length ? (
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {filteredCourses.map(
            (c, index) => (
              <motion.div
                key={c.id}
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
                className="relative overflow-hidden rounded-[30px] border border-white/80 bg-white/75 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.05)] p-6"
              >
                
                {/* Glow */}

                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-orange-200/10 blur-3xl" />

                {/* Top */}

                <div className="relative z-10 flex items-start justify-between mb-5">
                  
                  {/* LEFT */}

                  <div>
                    
                    <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                      <BookOpen size={24} />
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800 leading-snug">
                      {c.title}
                    </h2>

                    <p className="text-slate-500 mt-2">
                      {c.instructor}
                    </p>

                  </div>

                  {/* STATUS */}

                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      c.status ===
                      "Active"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    {c.status}
                  </span>

                </div>

                {/* INFO */}

                <div className="relative z-10 space-y-3">
                  
                  <div className="flex items-center gap-3 text-slate-600">
                    
                    <Clock3 size={17} />

                    <span>
                      {c.duration}
                    </span>

                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    
                    <IndianRupee size={17} />

                    <span>
                      ₹{c.price}
                    </span>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="relative z-10 flex gap-3 mt-6">
                  
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    onClick={() =>
                      openModal(c)
                    }
                    className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-orange-100 text-orange-600 py-3 hover:bg-orange-200 transition-all"
                  >
                    <Pencil size={16} />
                    Edit
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
                        c.id
                      )
                    }
                    className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-rose-100 text-rose-600 py-3 hover:bg-rose-200 transition-all"
                  >
                    <Trash2 size={16} />
                    Delete
                  </motion.button>

                </div>

              </motion.div>
            )
          )}

        </div>
      ) : (
        
        <div className="rounded-[30px] border border-white/80 bg-white/75 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.05)] p-14 text-center text-slate-500">
          No courses found
        </div>
      )}

      {/* ================= MODAL ================= */}

      {showModal && (
        
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
          
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="w-full max-w-lg rounded-[32px] border border-white/80 bg-white/90 backdrop-blur-2xl shadow-2xl"
          >
            
            {/* HEADER */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              
              <h2 className="text-3xl font-bold text-slate-800">
                {editId
                  ? "Edit Course"
                  : "Add Course"}
              </h2>

              <button
                onClick={() =>
                  setShowModal(
                    false
                  )
                }
                className="p-2 rounded-xl hover:bg-slate-100 transition-all"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={
                handleSubmit
              }
              className="p-6 space-y-4"
            >
              
              {[
                [
                  "title",
                  "Course Title",
                ],

                [
                  "instructor",
                  "Instructor",
                ],

                [
                  "duration",
                  "Duration",
                ],

                [
                  "price",
                  "Price",
                ],
              ].map(
                ([
                  name,
                  placeholder,
                ]) => (
                  <input
                    key={name}
                    type={
                      name ===
                      "price"
                        ? "number"
                        : "text"
                    }
                    name={name}
                    placeholder={
                      placeholder
                    }
                    value={
                      formData[
                        name
                      ]
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
                  />
                )
              )}

              {/* STATUS */}

              <select
                name="status"
                value={
                  formData.status
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
              >
                <option>
                  Active
                </option>

                <option>
                  Inactive
                </option>

              </select>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-2">
                
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                  className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#ff6b3d] to-[#ff9f43] text-white font-semibold shadow-lg shadow-orange-200 transition-all"
                >
                  {editId
                    ? "Update"
                    : "Add"}
                </button>

              </div>

            </form>

          </motion.div>

        </div>
      )}
    </div>
  );
};

export default ManageCourses;