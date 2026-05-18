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
} from "lucide-react";
import teachersData from "../../teachersData";

const initialForm = {
  name: "",
  email: "",
  specialization: "",
  courses: "",
  experience: "",
  batchType: "Online",
  password: "",
  status: "Active",

  // Performance Fields
  coursesAssigned: 0,
  totalCourses: 5,
  studentsHandled: 0,
  attendance: 0,
};

const ManageTeacher = () => {
  const [teachers, setTeachers] = useState(teachersData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showPerformanceModal, setShowPerformanceModal] =
    useState(false);

  // Handle Input Changes
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]:
        target.type === "number"
          ? Number(target.value)
          : target.value,
    });
  };

  // Open Modal
  const openModal = (teacher = null) => {
    setEditId(teacher?.id || null);
    setFormData({
      ...initialForm,
      ...teacher,
    });
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData(initialForm);
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    const teacherData = {
      ...formData,
      courses: Array.isArray(formData.courses)
        ? formData.courses
        : formData.courses
            .split(",")
            .map((course) => course.trim())
            .filter(Boolean),
    };

    if (editId) {
      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher.id === editId
            ? { ...teacher, ...teacherData }
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

  // Delete Teacher
  const handleDelete = (id) => {
    if (window.confirm("Delete this teacher?")) {
      setTeachers((prev) =>
        prev.filter((teacher) => teacher.id !== id)
      );
    }
  };

  // Calculate Overall Performance
  const calculateOverallPerformance = (teacher) => {
    const courseProgress =
      teacher.totalCourses > 0
        ? (teacher.coursesAssigned / teacher.totalCourses) *
          100
        : 0;

    const studentsScore = Math.min(
      teacher.studentsHandled || 0,
      100
    );

    return Math.round(
      (courseProgress +
        studentsScore +
        (teacher.attendance || 0)) /
        3
    );
  };

  // Open Performance Modal
  const openPerformanceModal = (teacher) => {
    setSelectedTeacher({
      ...teacher,
      overallPerformance:
        calculateOverallPerformance(teacher),
    });
    setShowPerformanceModal(true);
  };

  // Close Performance Modal
  const closePerformanceModal = () => {
    setSelectedTeacher(null);
    setShowPerformanceModal(false);
  };

  // Search Filter
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(search.toLowerCase())
  );

  // Progress Bar
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Teachers
          </h1>
          <p className="text-gray-500 mt-1">
            Create teacher accounts and track their
            performance.
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EF0000] to-[#C40000] text-white px-5 py-3 rounded-xl shadow-lg font-semibold"
        >
          <Plus size={18} />
          Add Teacher
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl mb-6 shadow-sm border border-gray-200 flex items-center">
        <Search
          className="text-gray-400 mr-3"
          size={18}
        />
        <input
          type="text"
          placeholder="Search teacher by name..."
          className="w-full outline-none text-gray-700"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* Teacher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => {
          const overallPerformance =
            calculateOverallPerformance(teacher);

          return (
            <div
              key={teacher.id}
              className="group bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 px-6 py-5 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <GraduationCap size={28} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-bold truncate">
                      {teacher.name}
                    </h3>
                    <p className="text-sm text-red-100 truncate">
                      {teacher.specialization}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Email */}
                <div className="mb-3">
                  <p className="text-sm text-gray-500">
                    {teacher.email}
                  </p>
                </div>

                {/* Courses */}
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

                        {teacher.courses.length >
                          3 && (
                          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                            +
                            {teacher.courses
                              .length - 3}{" "}
                            more
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

                {/* Performance */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Overall Performance
                    </span>
                    <span className="text-sm font-bold text-red-600">
                      {overallPerformance}%
                    </span>
                  </div>
                  <ProgressBar
                    value={overallPerformance}
                  />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() =>
                      openModal(teacher)
                    }
                    className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition"
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
                    className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                  >
                    <Eye size={16} />
                    <span className="text-xs font-medium">
                      Details
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(teacher.id)
                    }
                    className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    <Trash2 size={16} />
                    <span className="text-xs font-medium">
                      Delete
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Teachers */}
      {filteredTeachers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No teachers found.
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <h2 className="text-2xl font-bold">
                {editId
                  ? "Edit Teacher"
                  : "Add Teacher"}
              </h2>

              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
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
                    field === "email"
                      ? "email"
                      : field === "password"
                      ? "password"
                      : "text"
                  }
                  name={field}
                  placeholder={
                    field === "courses"
                      ? "Courses (comma separated)"
                      : field
                          .charAt(0)
                          .toUpperCase() +
                        field.slice(1)
                  }
                  value={
                    field === "courses" &&
                    Array.isArray(
                      formData.courses
                    )
                      ? formData.courses.join(
                          ", "
                        )
                      : formData[field]
                  }
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-xl px-4 py-3"
                />
              ))}

              <select
                name="batchType"
                value={formData.batchType}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3"
              >
                <option>Online</option>
                <option>Offline</option>
                <option>Hybrid</option>
              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3"
              >
                <option>Active</option>
                <option>Inactive</option>
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
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl px-4 py-3"
                  />

                  <input
                    type="number"
                    name="studentsHandled"
                    placeholder="Students Handled"
                    value={
                      formData.studentsHandled
                    }
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl px-4 py-3"
                  />

                  <input
                    type="number"
                    name="attendance"
                    placeholder="Attendance %"
                    value={formData.attendance}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="border border-gray-300 rounded-xl px-4 py-3"
                  />
                </>
              )}

              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-3 rounded-xl border border-gray-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#EF0000] to-[#C40000] text-white"
                >
                  {editId
                    ? "Update Teacher"
                    : "Add Teacher"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Performance Modal */}
      {showPerformanceModal &&
        selectedTeacher && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl font-bold mb-6">
                {selectedTeacher.name}
              </h2>

              <div className="space-y-5">
                {/* Email */}
                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>
                  <p className="font-medium">
                    {selectedTeacher.email}
                  </p>
                </div>

                {/* Specialization */}
                <div>
                  <p className="text-sm text-gray-500">
                    Specialization
                  </p>
                  <p className="font-medium">
                    {
                      selectedTeacher.specialization
                    }
                  </p>
                </div>

                {/* Courses Assigned */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Courses Assigned
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {selectedTeacher
                      .courses &&
                    selectedTeacher
                      .courses.length >
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
                      <p className="text-gray-400 text-sm">
                        No courses
                        assigned
                      </p>
                    )}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <p className="text-sm text-gray-500">
                    Experience
                  </p>
                  <p className="font-medium">
                    {
                      selectedTeacher.experience
                    }
                  </p>
                </div>

                {/* Overall Performance */}
                <div>
                  <p className="text-sm text-gray-500">
                    Overall Performance
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {
                      selectedTeacher.overallPerformance
                    }
                    %
                  </p>
                </div>
              </div>

              <button
                onClick={
                  closePerformanceModal
                }
                className="mt-8 w-full py-3 rounded-xl border border-gray-300"
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