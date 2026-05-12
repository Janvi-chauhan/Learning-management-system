

import React, { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  GraduationCap,
} from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  course: "",
  year: "",
  status: "Active",
};

const ManageStudents = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      course: "Java Full Stack Development",
      year: "6 Months",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priya.verma@example.com",
      course: "MERN Stack Development",
      year: "4 Months",
      status: "Active",
    },
    {
      id: 3,
      name: "Rohan Mehta",
      email: "rohan.mehta@example.com",
      course: "Python with Data Science",
      year: "8 Months",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Ananya Kulkarni",
      email: "ananya.kulkarni@example.com",
      course: "UI/UX Design",
      year: "3 Months",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
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

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Students
          </h1>
          <p className="text-gray-500 mt-1">
            Add, edit and manage student records
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2
  bg-gradient-to-r from-[#EF0000] to-[#C40000]
  hover:from-[#D90000] hover:to-[#A80000]
  text-white px-5 py-3 rounded-xl shadow-lg
  shadow-red-200 font-semibold transition-all duration-300"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gradient-to-r from-red-50 to-yellow-50">
            <tr className="text-left text-sm font-semibold text-gray-600">
              {[
                "Student",
                "Email",
                "Course",
                "Duration",
                "Status",
                "Actions",
              ].map((head) => (
                <th key={head} className="px-6 py-4">
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                        <GraduationCap size={18} />
                      </div>
                      <span className="font-medium text-gray-800">
                        {student.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {student.email}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {student.course}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {student.year}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        student.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(student)}
                        className="p-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(student.id)
                        }
                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-12 text-center text-gray-500"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                {editId ? "Edit Student" : "Add Student"}
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
              className="p-6 space-y-4"
            >
              {["name", "email", "course", "year"].map(
                (field) => (
                  <input
                    key={field}
                    type={
                      field === "email"
                        ? "email"
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
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
                  />
                )
              )}

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#EF0000] to-[#C40000] text-white font-medium hover:opacity-90"
                >
                  {editId ? "Update Student" : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;