// ManageTeacher.jsx

import React, { useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  GraduationCap,
  Eye,
  Mail,
  Layers3,
  Briefcase,
} from "lucide-react";

import { motion } from "framer-motion";

import teachersData from "../../teachersData";

// ================= INITIAL FORM =================

const initialForm = {
  name: "",
  email: "",
  specialization: "",
  courses: "",
  experience: "",
  batchType: "Online",
  password: "",
  status: "Active",

  coursesAssigned: 0,
  totalCourses: 5,
  studentsHandled: 0,
  attendance: 0,
};

const ManageTeacher = () => {
  const [teachers, setTeachers] =
    useState(teachersData);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const [formData, setFormData] =
    useState(initialForm);

  const [selectedTeacher, setSelectedTeacher] =
    useState(null);

  const [
    showPerformanceModal,
    setShowPerformanceModal,
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

  // ================= OPEN MODAL =================

  const openModal = (
    teacher = null
  ) => {
    setEditId(teacher?.id || null);

    setFormData({
      ...initialForm,
      ...teacher,
    });

    setShowModal(true);
  };

  // ================= CLOSE MODAL =================

  const closeModal = () => {
    setShowModal(false);

    setEditId(null);

    setFormData(initialForm);
  };

  // ================= SUBMIT =================

  const handleSubmit = (e) => {
    e.preventDefault();

    const teacherData = {
      ...formData,

      courses: Array.isArray(
        formData.courses
      )
        ? formData.courses
        : formData.courses
            .split(",")
            .map((course) =>
              course.trim()
            )
            .filter(Boolean),
    };

    if (editId) {
      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher.id === editId
            ? {
                ...teacher,
                ...teacherData,
              }
            : teacher
        )
      );
    } else {
      setTeachers((prev) => [
        ...prev,

        {
          id: Date.now(),
          ...teacherData,
        },
      ]);
    }

    closeModal();
  };

  // ================= DELETE =================

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Delete this teacher?"
      )
    ) {
      setTeachers((prev) =>
        prev.filter(
          (teacher) =>
            teacher.id !== id
        )
      );
    }
  };

  // ================= PERFORMANCE =================

  const calculateOverallPerformance =
    (teacher) => {
      const courseProgress =
        teacher.totalCourses > 0
          ? (teacher.coursesAssigned /
              teacher.totalCourses) *
            100
          : 0;

      const studentsScore =
        Math.min(
          teacher.studentsHandled || 0,
          100
        );

      return Math.round(
        (courseProgress +
          studentsScore +
          (teacher.attendance ||
            0)) /
          3
      );
    };

  // ================= PERFORMANCE MODAL =================

  const openPerformanceModal = (
    teacher
  ) => {
    setSelectedTeacher({
      ...teacher,

      overallPerformance:
        calculateOverallPerformance(
          teacher
        ),
    });

    setShowPerformanceModal(true);
  };

  const closePerformanceModal = () => {
    setSelectedTeacher(null);

    setShowPerformanceModal(false);
  };

  // ================= FILTER =================

  const filteredTeachers =
    teachers.filter((teacher) =>
      teacher.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // ================= PROGRESS BAR =================

  const ProgressBar = ({
    value,
  }) => (
    <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-700"
        style={{
          width: `${Math.min(
            value,
            100
          )}%`,
        }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f9fafb] to-[#eef2ff] p-4 sm:p-5 lg:p-6">
      
      {/* ================= HEADER ================= */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-6">
        
        <div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
            
            <div className="w-2 h-2 rounded-full bg-red-600" />

            <span className="text-sm font-medium text-gray-600">
              Teacher Workspace
            </span>

          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
            Manage Teachers
          </h1>

          <p className="mt-2 text-gray-500 text-sm sm:text-base">
            Create teacher accounts and track performance.
          </p>

        </div>

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={() =>
            openModal()
          }
          className="w-full sm:w-fit inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-lg"
        >
          <Plus size={18} />
          Add Teacher
        </motion.button>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="rounded-[24px] border border-white/80 bg-white/80 backdrop-blur-xl shadow-sm p-4 mb-6">
        
        <div className="flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-3">
          
          <Search
            className="text-gray-400 mr-3"
            size={18}
          />

          <input
            type="text"
            placeholder="Search teacher by name..."
            className="w-full outline-none bg-transparent text-gray-700"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

      </div>


      {/* ================= DESKTOP TABLE ================= */}

<div className="hidden xl:block overflow-hidden rounded-[30px] border border-gray-200 bg-white shadow-sm">
  
  <table className="w-full table-fixed">
    
    <thead className="bg-gradient-to-r from-red-600 to-red-500 text-white">
      
      <tr>
        
        <th className="w-[28%] px-5 py-4 text-left text-sm font-semibold">
          Teacher
        </th>

        <th className="w-[20%] px-4 py-4 text-left text-sm font-semibold">
          Specialization
        </th>

        <th className="w-[8%] px-4 py-4 text-left text-sm font-semibold">
          Experience
        </th>

        <th className="w-[20%] px-4 py-4 text-left text-sm font-semibold">
          Courses
        </th>

        <th className="w-[10%] px-4 py-4 text-left text-sm font-semibold">
          Performance
        </th>

        <th className="w-[8%] px-4 py-4 text-center text-sm font-semibold">
          Actions
        </th>

      </tr>

    </thead>

    <tbody>
      
      {filteredTeachers.map(
        (teacher) => {
          const overallPerformance =
            calculateOverallPerformance(
              teacher
            );

          return (
            <tr
              key={teacher.id}
              className="border-b border-gray-100 hover:bg-red-50/40 transition-all"
            >
              
              {/* TEACHER */}

              <td className="px-5 py-5">
                
                <div className="flex items-center gap-4 min-w-0">
                  
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center text-white shrink-0">
                    <GraduationCap size={20} />
                  </div>

                  <div className="min-w-0">
                    
                    <h3 className="font-semibold text-gray-800 truncate">
                      {teacher.name}
                    </h3>

                    <p className="text-sm text-gray-500 truncate">
                      {teacher.email}
                    </p>

                  </div>

                </div>

              </td>

              {/* SPECIALIZATION */}

              <td className="px-4 py-5">
                
                <p className="font-medium text-gray-700 truncate">
                  {teacher.specialization}
                </p>

              </td>

              {/* EXPERIENCE */}

              <td className="px-4 py-5">
                
                <span className="text-gray-700 font-medium">
                  {teacher.experience}
                </span>

              </td>

              {/* COURSES */}

              <td className="px-4 py-5">
                
                <div className="flex flex-wrap gap-2">
                  
                  {teacher.courses
                    ?.slice(0, 2)
                    .map(
                      (
                        course,
                        index
                      ) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100 truncate"
                        >
                          {course}
                        </span>
                      )
                    )}

                  {teacher.courses
                    ?.length > 2 && (
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                      +
                      {teacher.courses
                        .length - 2}
                    </span>
                  )}

                </div>

              </td>

              {/* PERFORMANCE */}

              <td className="px-4 py-5">
                
                <div className="flex items-center gap-3">
                  
                  <div className="flex-1">
                    <ProgressBar
                      value={
                        overallPerformance
                      }
                    />
                  </div>

                  <span className="text-sm font-bold text-red-600">
                    {
                      overallPerformance
                    }
                    %
                  </span>

                </div>

              </td>

              {/* ACTIONS */}

              <td className="px-4 py-5">
                
                <div className="flex items-center justify-center gap-2">
                  
                  <button
                    onClick={() =>
                      openModal(
                        teacher
                      )
                    }
                    className="w-9 h-9 rounded-xl  text-yellow-700  transition-all flex items-center justify-center"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    onClick={() =>
                      openPerformanceModal(
                        teacher
                      )
                    }
                    className="w-9 h-9 rounded-xl  text-blue-700  transition-all flex items-center justify-center"
                  >
                    <Eye size={15} />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        teacher.id
                      )
                    }
                    className="w-9 h-9 rounded-xl  text-red-600  transition-all flex items-center justify-center"
                  >
                    <Trash2 size={15} />
                  </button>

                </div>

              </td>

            </tr>
          );
        }
      )}

    </tbody>

  </table>

</div>

{/* ================= MOBILE + TABLET CARDS ================= */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:hidden">
  
  {filteredTeachers.map(
    (teacher, index) => {
      const overallPerformance =
        calculateOverallPerformance(
          teacher
        );

      return (
        <motion.div
          key={teacher.id}
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
              index * 0.04,
          }}
          className="overflow-hidden rounded-[30px] border border-white/80 bg-white shadow-sm"
        >
          
          {/* CARD TOP */}

          <div className="bg-gradient-to-r from-red-600 to-red-500 p-5 text-white">
            
            <div className="flex items-center gap-4">
              
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <GraduationCap size={24} />
              </div>

              <div className="min-w-0">
                
                <h3 className="text-lg font-bold truncate">
                  {teacher.name}
                </h3>

                <p className="text-sm text-red-100 truncate">
                  {
                    teacher.specialization
                  }
                </p>

              </div>

            </div>

          </div>

          {/* CARD BODY */}

          <div className="p-5">
            
            <div className="space-y-4">
              
              <div className="flex items-center gap-2 text-gray-600">
                
                <Mail size={16} />

                <span className="text-sm truncate">
                  {teacher.email}
                </span>

              </div>

              <div>
                
                <p className="text-sm text-gray-500 mb-2">
                  Courses
                </p>

                <div className="flex flex-wrap gap-2">
                  
                  {teacher.courses
                    ?.length > 0 ? (
                    teacher.courses.map(
                      (
                        course,
                        index
                      ) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100"
                        >
                          {course}
                        </span>
                      )
                    )
                  ) : (
                    <span className="text-xs text-gray-400">
                      No Courses
                    </span>
                  )}

                </div>

              </div>

            </div>

            {/* PERFORMANCE */}

            <div className="mt-5">
              
              <div className="flex justify-between mb-2">
                
                <span className="text-sm font-medium text-gray-700">
                  Performance
                </span>

                <span className="text-sm font-bold text-red-600">
                  {
                    overallPerformance
                  }
                  %
                </span>

              </div>

              <ProgressBar
                value={
                  overallPerformance
                }
              />

            </div>

            {/* ACTIONS */}

            <div className="grid grid-cols-3 gap-2 mt-6">
              
              <button
                onClick={() =>
                  openModal(
                    teacher
                  )
                }
                className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-yellow-50 text-yellow-700"
              >
                <Pencil size={16} />

                <span className="text-xs font-medium">
                  Edit
                </span>

              </button>

              <button
                onClick={() =>
                  openPerformanceModal(
                    teacher
                  )
                }
                className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-blue-50 text-blue-700"
              >
                <Eye size={16} />

                <span className="text-xs font-medium">
                  Details
                </span>

              </button>

              <button
                onClick={() =>
                  handleDelete(
                    teacher.id
                  )
                }
                className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-red-50 text-red-600"
              >
                <Trash2 size={16} />

                <span className="text-xs font-medium">
                  Delete
                </span>

              </button>

            </div>

          </div>

        </motion.div>
      );
    }
  )}

</div>

      {/* ================= MOBILE + TABLET CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:hidden">
        
        {filteredTeachers.map(
          (teacher, index) => {
            const overallPerformance =
              calculateOverallPerformance(
                teacher
              );

            return (
              <motion.div
                key={teacher.id}
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
                    index * 0.04,
                }}
                className="overflow-hidden rounded-[30px] border border-white/80 bg-white/80 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all"
              >
                
                {/* TOP */}

                <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 p-5 text-white">
                  
                  <div className="flex items-center gap-4">
                    
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                      <GraduationCap size={24} />
                    </div>

                    <div className="min-w-0">
                      
                      <h3 className="text-lg font-bold truncate">
                        {teacher.name}
                      </h3>

                      <p className="text-sm text-red-100 truncate">
                        {
                          teacher.specialization
                        }
                      </p>

                    </div>

                  </div>

                </div>

                {/* BODY */}

                <div className="p-5">
                  
                  <div className="space-y-4">
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      
                      <Mail
                        size={16}
                      />

                      <span className="text-sm truncate">
                        {teacher.email}
                      </span>

                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      
                      <Briefcase
                        size={16}
                      />

                      <span className="text-sm">
                        {
                          teacher.experience
                        }
                      </span>

                    </div>

                    <div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        
                        <Layers3
                          size={16}
                          className="text-gray-500"
                        />

                        <span className="text-sm font-medium text-gray-700">
                          Courses
                        </span>

                      </div>

                      <div className="flex flex-wrap gap-2">
                        
                        {teacher.courses
                          ?.length >
                        0 ? (
                          teacher.courses.map(
                            (
                              course,
                              index
                            ) => (
                              <span
                                key={
                                  index
                                }
                                className="px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100"
                              >
                                {
                                  course
                                }
                              </span>
                            )
                          )
                        ) : (
                          <span className="text-xs text-gray-400">
                            No Courses
                          </span>
                        )}

                      </div>

                    </div>

                  </div>

                  {/* PERFORMANCE */}

                  <div className="mt-5">
                    
                    <div className="flex items-center justify-between mb-2">
                      
                      <span className="text-sm font-medium text-gray-700">
                        Overall Performance
                      </span>

                      <span className="text-sm font-bold text-red-600">
                        {
                          overallPerformance
                        }
                        %
                      </span>

                    </div>

                    <ProgressBar
                      value={
                        overallPerformance
                      }
                    />

                  </div>

                  {/* ACTIONS */}

                  <div className="grid grid-cols-3 gap-2 mt-6">
                    
                    <button
                      onClick={() =>
                        openModal(
                          teacher
                        )
                      }
                      className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-all"
                    >
                      <Pencil size={16} />

                      <span className="text-xs font-medium">
                        Edit
                      </span>

                    </button>

                    <button
                      onClick={() =>
                        openPerformanceModal(
                          teacher
                        )
                      }
                      className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all"
                    >
                      <Eye size={16} />

                      <span className="text-xs font-medium">
                        Details
                      </span>

                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          teacher.id
                        )
                      }
                      className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                    >
                      <Trash2 size={16} />

                      <span className="text-xs font-medium">
                        Delete
                      </span>

                    </button>

                  </div>

                </div>

              </motion.div>
            );
          }
        )}

      </div>

      {/* ================= NO DATA ================= */}

      {filteredTeachers.length ===
        0 && (
        <div className="mt-6 rounded-[28px] border border-gray-200 bg-white p-10 text-center text-gray-500 shadow-sm">
          No teachers found.
        </div>
      )}

      {/* ================= ADD / EDIT MODAL ================= */}

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
            className="bg-white w-full max-w-2xl rounded-[30px] shadow-2xl"
          >
            
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              
              <h2 className="text-2xl font-bold text-gray-900">
                {editId
                  ? "Edit Teacher"
                  : "Add Teacher"}
              </h2>

              <button
                onClick={closeModal}
                className="p-2 rounded-xl hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              
              {[
                "name",
                "email",
                "specialization",
                "courses",
                "experience",
                "password",
              ].map((field) => (
                <input
                  key={field}
                  type={
                    field ===
                    "email"
                      ? "email"
                      : field ===
                        "password"
                      ? "password"
                      : "text"
                  }
                  name={field}
                  placeholder={
                    field ===
                    "courses"
                      ? "Courses (comma separated)"
                      : field
                          .charAt(
                            0
                          )
                          .toUpperCase() +
                        field.slice(
                          1
                        )
                  }
                  value={
                    field ===
                      "courses" &&
                    Array.isArray(
                      formData.courses
                    )
                      ? formData.courses.join(
                          ", "
                        )
                      : formData[
                          field
                        ]
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500"
                />
              ))}

              <select
                name="batchType"
                value={
                  formData.batchType
                }
                onChange={
                  handleChange
                }
                className="border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500"
              >
                <option>
                  Online
                </option>

                <option>
                  Offline
                </option>

                <option>
                  Hybrid
                </option>

              </select>

              <select
                name="status"
                value={
                  formData.status
                }
                onChange={
                  handleChange
                }
                className="border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500"
              >
                <option>
                  Active
                </option>

                <option>
                  Inactive
                </option>

              </select>

              {editId && (
                <>
                  
                  <input
                    type="number"
                    name="coursesAssigned"
                    placeholder="Courses Assigned"
                    value={
                      formData.coursesAssigned
                    }
                    onChange={
                      handleChange
                    }
                    className="border border-gray-300 rounded-2xl px-4 py-3"
                  />

                  <input
                    type="number"
                    name="studentsHandled"
                    placeholder="Students Handled"
                    value={
                      formData.studentsHandled
                    }
                    onChange={
                      handleChange
                    }
                    className="border border-gray-300 rounded-2xl px-4 py-3"
                  />

                  <input
                    type="number"
                    name="attendance"
                    placeholder="Attendance %"
                    value={
                      formData.attendance
                    }
                    onChange={
                      handleChange
                    }
                    min="0"
                    max="100"
                    className="border border-gray-300 rounded-2xl px-4 py-3"
                  />

                </>
              )}

              <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 pt-2">
                
                <button
                  type="button"
                  onClick={
                    closeModal
                  }
                  className="px-5 py-3 rounded-2xl border border-gray-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold"
                >
                  {editId
                    ? "Update Teacher"
                    : "Add Teacher"}
                </button>

              </div>

            </form>

          </motion.div>

        </div>
      )}

      {/* ================= PERFORMANCE MODAL ================= */}

      {showPerformanceModal &&
        selectedTeacher && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            
            <div className="bg-white w-full max-w-3xl rounded-[30px] shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between mb-6">
                
                <h2 className="text-3xl font-bold text-gray-900">
                  {
                    selectedTeacher.name
                  }
                </h2>

                <button
                  onClick={
                    closePerformanceModal
                  }
                  className="p-2 rounded-xl hover:bg-gray-100"
                >
                  <X size={20} />
                </button>

              </div>

              <div className="space-y-5">
                
                <div>
                  
                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="font-medium text-gray-800">
                    {
                      selectedTeacher.email
                    }
                  </p>

                </div>

                <div>
                  
                  <p className="text-sm text-gray-500">
                    Specialization
                  </p>

                  <p className="font-medium text-gray-800">
                    {
                      selectedTeacher.specialization
                    }
                  </p>

                </div>

                <div>
                  
                  <p className="text-sm text-gray-500 mb-2">
                    Courses
                  </p>

                  <div className="flex flex-wrap gap-2">
                    
                    {selectedTeacher
                      .courses
                      ?.length >
                    0 ? (
                      selectedTeacher.courses.map(
                        (
                          course,
                          index
                        ) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-700 border border-red-100"
                          >
                            {course}
                          </span>
                        )
                      )
                    ) : (
                      <p className="text-sm text-gray-400">
                        No Courses
                      </p>
                    )}

                  </div>

                </div>

                <div>
                  
                  <p className="text-sm text-gray-500">
                    Experience
                  </p>

                  <p className="font-medium text-gray-800">
                    {
                      selectedTeacher.experience
                    }
                  </p>

                </div>

                <div>
                  
                  <div className="flex justify-between mb-2">
                    
                    <span className="text-sm text-gray-500">
                      Overall Performance
                    </span>

                    <span className="text-lg font-bold text-red-600">
                      {
                        selectedTeacher.overallPerformance
                      }
                      %
                    </span>

                  </div>

                  <ProgressBar
                    value={
                      selectedTeacher.overallPerformance
                    }
                  />

                </div>

              </div>

              <button
                onClick={
                  closePerformanceModal
                }
                className="mt-8 w-full py-3 rounded-2xl border border-gray-300 hover:bg-gray-50 transition-all"
              >
                Close
              </button>

            </div>

          </div>
        )}

    </div>
  );
};

export default ManageTeacher;