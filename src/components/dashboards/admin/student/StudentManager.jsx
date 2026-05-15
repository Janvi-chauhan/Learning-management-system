import React, { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  GraduationCap,
  Eye,
  KeyRound,
  BookOpen,
  ClipboardCheck,
  Calendar,
} from "lucide-react";
import studentsData from "../../studentData";

const initialForm = {
  name: "",
  email: "",
  course: "",
  year: "",
  batchType: "Online",
  password: "",
  status: "Active",

  // Progress Fields
  assignmentsCompleted: 0,
  totalAssignments: 20,
  testsCompleted: 0,
  totalTests: 5,
  attendance: 0,
};

const ManageStudents = () => {
  const [students, setStudents] = useState(studentsData);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showProgressModal, setShowProgressModal] = useState(false);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]:
        target.type === "number"
          ? Number(target.value)
          : target.value,
    });
  };

  const openModal = (student = null) => {
    setEditId(student?.id || null);
    setFormData(student || initialForm);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData(initialForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editId
            ? { ...student, ...formData }
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

  const handleDelete = (id) => {
    if (window.confirm("Delete this student?")) {
      setStudents((prev) =>
        prev.filter((student) => student.id !== id)
      );
    }
  };



  const calculateOverallProgress = (student) => {
    const assignmentProgress =
      (student.assignmentsCompleted /
        student.totalAssignments) *
      100;

    const testProgress =
      (student.testsCompleted / student.totalTests) * 100;

    return Math.round(
      (assignmentProgress +
        testProgress +
        student.attendance) /
        3
    );
  };

  const openProgressModal = (student) => {
    setSelectedStudent({
      ...student,
      overallProgress:
        calculateOverallProgress(student),
    });
    setShowProgressModal(true);
  };

  const closeProgressModal = () => {
    setSelectedStudent(null);
    setShowProgressModal(false);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const ProgressBar = ({ value, color = "bg-red-500" }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`${color} h-2.5 rounded-full`}
        style={{ width: `${value}%` }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Students
          </h1>
          <p className="text-gray-500 mt-1">
            Create student accounts and track their progress
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EF0000] to-[#C40000] text-white px-5 py-3 rounded-xl shadow-lg font-semibold"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl mb-6 shadow-sm border border-gray-200 flex items-center">
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
  {filteredStudents.map((student) => {
    const overallProgress = calculateOverallProgress(student);

    return (
      <div
        key={student.id}
        className="group bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        {/* Top Gradient Header */}
        <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 px-6 py-5 text-white relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-6 -translate-x-6" />

          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <GraduationCap size={28} />
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-bold truncate">
                {student.name}
              </h3>
              <p className="text-sm text-red-100 truncate">
                {student.course}
              </p>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {/* Student Details */}
          <div className="space-y-3 text-sm mb-5">
            <div className="flex justify-between gap-3">
              <span className="text-gray-500">Email</span>
              <span className="text-gray-800 font-medium text-right truncate max-w-[180px]">
                {student.email}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Duration</span>
              <span className="text-gray-800 font-medium">
                {student.year}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Batch</span>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  student.batchType === "Online"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {student.batchType}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  student.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {student.status}
              </span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Overall Progress
              </span>
              <span className="text-sm font-bold text-red-600">
                {overallProgress}%
              </span>
            </div>

            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-700"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => openModal(student)}
              className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition"
            >
              <Pencil size={16} />
              <span className="text-xs font-medium">Edit</span>
            </button>

            <button
              onClick={() => openProgressModal(student)}
              className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
            >
              <Eye size={16} />
              <span className="text-xs font-medium">
                Progress
              </span>
            </button>

            <button
              onClick={() => handleDelete(student.id)}
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

      {/* No Data */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No students found.
        </div>
      )}

      {/* Add/Edit Student Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <h2 className="text-2xl font-bold">
                {editId
                  ? "Edit Student"
                  : "Add Student"}
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
                "course",
                "year",
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
                    field.charAt(0).toUpperCase() +
                    field.slice(1)
                  }
                  value={formData[field]}
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

              {/* Progress fields should be shown only while editing an existing student */}
{editId && (
  <>
    <input
      type="number"
      name="assignmentsCompleted"
      placeholder="Assignments Completed"
      value={formData.assignmentsCompleted}
      onChange={handleChange}
      min="0"
      className="border border-gray-300 rounded-xl px-4 py-3"
    />

    <input
      type="number"
      name="testsCompleted"
      placeholder="Tests Completed"
      value={formData.testsCompleted}
      onChange={handleChange}
      min="0"
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
                    ? "Update Student"
                    : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Progress Modal */}
{/* Progress Modal */}
{showProgressModal && selectedStudent && (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        {selectedStudent.name} Progress
      </h2>

      {/* Email */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Email</p>
        <p className="font-medium text-gray-900">
          {selectedStudent.email}
        </p>
      </div>

      {/* Enrolled Courses */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Enrolled Courses
        </p>

        <div className="flex flex-wrap gap-2">
          {Array.isArray(selectedStudent.course) ? (
            selectedStudent.course.map((course, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-red-50 text-red-700 border border-red-100"
              >
                {course}
              </span>
            ))
          ) : (
            <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-red-50 text-red-700 border border-red-100">
              {selectedStudent.course}
            </span>
          )}
        </div>
      </div>

      {/* Progress Details */}
      <div className="space-y-5">
        {/* Assignments */}
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span className="font-medium text-gray-700">
              Assignments
            </span>
            <span className="text-gray-800">
              {selectedStudent.assignmentsCompleted}/
              {selectedStudent.totalAssignments}
            </span>
          </div>
          <ProgressBar
            value={
              (selectedStudent.assignmentsCompleted /
                selectedStudent.totalAssignments) *
              100
            }
            color="bg-blue-500"
          />
        </div>

        {/* Tests */}
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span className="font-medium text-gray-700">
              Tests
            </span>
            <span className="text-gray-800">
              {selectedStudent.testsCompleted}/
              {selectedStudent.totalTests}
            </span>
          </div>
          <ProgressBar
            value={
              (selectedStudent.testsCompleted /
                selectedStudent.totalTests) *
              100
            }
            color="bg-green-500"
          />
        </div>

        {/* Attendance */}
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span className="font-medium text-gray-700">
              Attendance
            </span>
            <span className="text-gray-800">
              {selectedStudent.attendance}%
            </span>
          </div>
          <ProgressBar
            value={selectedStudent.attendance}
            color="bg-yellow-500"
          />
        </div>

        {/* Overall Progress */}
        <div>
          <div className="flex justify-between mb-1 text-sm font-semibold">
            <span className="text-gray-900">
              Overall Progress
            </span>
            <span className="text-red-600">
              {selectedStudent.overallProgress}%
            </span>
          </div>
          <ProgressBar
            value={selectedStudent.overallProgress}
            color="bg-red-500"
          />
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={closeProgressModal}
        className="mt-8 w-full py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default ManageStudents;