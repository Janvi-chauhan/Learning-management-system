// src/pages/admin/ManageTeachers.jsx

// Theme updated to match your Admin Dashboard:
// - Primary gradient: red → yellow
// - Buttons and focus states use red/yellow palette
// - Table header uses subtle red/yellow background
// - Edit button uses yellow tones
// Based on your original component structure in :contentReference[oaicite:0]{index=0}

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
  subject: "",
  experience: "",
  status: "Active",
};

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      subject: "Java Programming",
      experience: "5 Years",
      status: "Active",
    },
    {
      id: 2,
      name: "Sneha Patil",
      email: "sneha@example.com",
      subject: "MERN Stack",
      experience: "3 Years",
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

  const openModal = (teacher = null) => {
    setEditId(teacher?.id || null);
    setFormData(teacher || initialForm);
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
      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher.id === editId
            ? { ...teacher, ...formData }
            : teacher
        )
      );
    } else {
      setTeachers((prev) => [
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
    if (window.confirm("Delete this teacher?")) {
      setTeachers((prev) =>
        prev.filter((teacher) => teacher.id !== id)
      );
    }
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Teachers
          </h1>
          <p className="text-gray-500 mt-1">
            Create, edit and delete teachers
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EF0000] to-[#C40000] hover:opacity-90 text-white px-5 py-3 rounded-xl shadow-md font-medium"
        >
          <Plus size={18} />
          Add Teacher
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl mb-6 shadow-sm border border-gray-200 flex items-center">
        <Search className="text-gray-400 mr-3" size={18} />
        <input
          type="text"
          placeholder="Search teacher by name..."
          className="w-full outline-none text-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full min-w-[750px]">
          <thead className="bg-gradient-to-r from-red-50 to-yellow-50">
            <tr className="text-left text-sm font-semibold text-gray-600">
              {[
                "Teacher",
                "Email",
                "Subject",
                "Experience",
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
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                        <GraduationCap size={18} />
                      </div>
                      <span className="font-medium text-gray-800">
                        {teacher.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {teacher.email}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {teacher.subject}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {teacher.experience}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        teacher.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(teacher)}
                        className="p-2 rounded-lg  text-yellow-700 "
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(teacher.id)
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
                  No teachers found.
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
                {editId ? "Edit Teacher" : "Add Teacher"}
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
              {[
                "name",
                "email",
                "subject",
                "experience",
              ].map((field) => (
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
              ))}

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
                  {editId ? "Update Teacher" : "Add Teacher"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTeachers;