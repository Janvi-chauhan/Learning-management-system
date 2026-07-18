import React, { useState } from "react";

import {
  Plus,
  User,
  Mail,
  Lock,
  Monitor,
  Building,
  GraduationCap,
  Search,
  Eye,
  Trash2,
} from "lucide-react";

import { motion } from "framer-motion";

// ================= COMPONENT =================

const StudentAccounts = () => {
  const [students, setStudents] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      courses: "",
      batch_type: "Online",
      password: "",
      status: "Active",
    });

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // ================= SUBMIT =================

  const handleSubmit = (e) => {
    e.preventDefault();

    setStudents([
      {
        id: Date.now(),

        ...formData,
      },

      ...students,
    ]);

    setFormData({
      name: "",
      email: "",
      phone: "",
      courses: "",
      batch_type: "Online",
      password: "",
      status: "Active",
    });
  };

  // ================= DELETE =================

  const handleDelete = (id) => {
    setStudents((prev) =>
      prev.filter(
        (student) =>
          student.id !== id
      )
    );
  };

  // ================= FILTER =================

  const filteredStudents =
    students.filter(
      (student) =>
        student.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        student.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        student.course
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
              Student Workspace
            </span>

          </div>

          <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-800">
            Student Accounts
          </h1>

          <p className="text-slate-500 mt-3 text-lg max-w-3xl">
            Create and manage student accounts,
            assign courses and monitor enrollments.
          </p>

        </div>

      </div>

      {/* ================= GRID ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        
        {/* ================= FORM ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-[32px] border border-white/80 bg-white/75 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.05)] p-6 h-fit"
        >
          
          {/* TOP */}

          <div className="mb-8">
            
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-[#ff6b3d] to-[#ff9f43] text-white flex items-center justify-center shadow-lg shadow-orange-200">
              <GraduationCap size={30} />
            </div>

            <h2 className="text-3xl font-bold text-slate-800 mt-5">
              Create Account
            </h2>

            <p className="text-slate-500 mt-2">
              Add new students and assign them
              to learning programs.
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4"
          >
            
            {/* NAME */}

            <div className="relative">
              
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                required
                className="w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
              />

            </div>

            {/* EMAIL */}

            <div className="relative">
              
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                required
                className="w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
              />

            </div>
            {/* PHONE */}

              <div className="relative">

               <input
                 type="tel"
                 name="phone"
                 placeholder="Phone Number"
                 value={formData.phone}
                 onChange={handleChange}
                 required
                 className="w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
               />

                </div>

            {/* COURSE */}

            <div className="relative">
              
              <GraduationCap
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="courses"
                placeholder="Course Name"
                value={
                  formData.course
                }
                onChange={
                  handleChange
                }
                required
                className="w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
              />

            </div>

            {/* BATCH */}

            <div className="relative">
              
              {formData.batch_type ===
              "Online" ? (
                <Monitor
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
              ) : (
                <Building
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
              )}

              <select
                name="batch_type"
                value={
                  formData.batch_type
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-orange-300 appearance-none"
              >
                <option>
                  Online
                </option>

                <option>
                  Offline
                </option>

              </select>

            </div>

            {/* PASSWORD */}

            <div className="relative">
              
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="password"
                name="password"
                placeholder="Set Password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                required
                className="w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
              />

            </div>

            {/* BUTTON */}

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff6b3d] to-[#ff9f43] text-white py-3 rounded-2xl font-semibold shadow-lg shadow-orange-200"
            >
              <Plus size={18} />
              Create Student Account
            </motion.button>

          </form>

        </motion.div>

        {/* ================= STUDENTS ================= */}

        <div>
          
          {/* SEARCH */}

          <div className="rounded-[28px] border border-white/80 bg-white/75 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.05)] p-4 mb-6">
            
            <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3">
              
              <Search
                className="text-slate-400 mr-3"
                size={18}
              />

              <input
                type="text"
                placeholder="Search students..."
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

          {/* STUDENT CARDS */}

          {filteredStudents.length >
          0 ? (
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {filteredStudents.map(
                (
                  student,
                  index
                ) => (
                  <motion.div
                    key={
                      student.id
                    }
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
                        index *
                        0.05,
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
                          <User size={28} />
                        </div>

                        <div className="min-w-0">
                          
                          <h3 className="text-xl font-bold truncate">
                            {
                              student.name
                            }
                          </h3>

                          <p className="text-sm text-orange-100 truncate mt-1">
                            {
                              student.courses
                            }
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* BODY */}

                    <div className="p-6">
                      
                      <div className="space-y-4 mb-6">
                        
                        {/* EMAIL */}

                        <div className="flex items-center gap-3 text-slate-600">
                          
                          <Mail
                            size={16}
                          />

                          <span className="text-sm truncate">
                            {
                              student.email
                            }
                          </span>

                        </div>

                        {/* BATCH */}

                        <div className="flex items-center justify-between">
                          
                          <span className="text-sm text-slate-500">
                            Batch Type
                          </span>

                          <span
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                              student.batch_type ===
                              "Online"
                                ? "bg-sky-100 text-sky-600"
                                : "bg-violet-100 text-violet-600"
                            }`}
                          >
                            {
                              student.batch_type
                            }
                          </span>

                        </div>

                        {/* STATUS */}

                        <div className="flex items-center justify-between">
                          
                          <span className="text-sm text-slate-500">
                            Status
                          </span>

                          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600">
                            {
                              student.status
                            }
                          </span>

                        </div>

                      </div>

                      {/* ACTIONS */}

                      <div className="grid grid-cols-2 gap-3">
                        
                        <motion.button
                          whileHover={{
                            scale: 1.03,
                          }}
                          whileTap={{
                            scale: 0.97,
                          }}
                          className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-sky-100 text-sky-600 hover:bg-sky-200 transition-all"
                        >
                          <Eye size={16} />
                          View
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
                          className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-rose-100 text-rose-600 hover:bg-rose-200 transition-all"
                        >
                          <Trash2 size={16} />
                          Delete
                        </motion.button>

                      </div>

                    </div>

                  </motion.div>
                )
              )}

            </div>
          ) : (
            
            <div className="rounded-[30px] border border-white/80 bg-white/75 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.05)] p-14 text-center text-slate-500">
              No student accounts found.
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default StudentAccounts;