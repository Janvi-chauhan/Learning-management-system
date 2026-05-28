import { useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
} from "lucide-react";

import {
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

// ================= INITIAL FORM =================

const initialForm = {
  name: "",
  company: "",
  batch: "",
  domain: "",
  linkedin: "",
  social: "",
  image: "",
};

// ================= DEFAULT DATA =================

const demoStudents = [
  {
    id: 1,
    name: "Rahul Sharma",
    company: "TCS",
    batch: "2025",
    domain: "Full Stack Development",
    linkedin:
      "https://linkedin.com/in/rahul",
    social:
      "https://instagram.com/rahul",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },

  {
    id: 2,
    name: "Priya Verma",
    company: "Infosys",
    batch: "2024",
    domain: "Data Science",
    linkedin:
      "https://linkedin.com/in/priya",
    social:
      "https://instagram.com/priya",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
];

export default function Placements() {
  // ================= STATES =================

  const [students, setStudents] =
    useState(demoStudents);

  const [showModal, setShowModal] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [formData, setFormData] =
    useState(initialForm);

  // ================= HANDLE CHANGE =================

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // ================= OPEN MODAL =================

  const openModal = (student = null) => {
    setEditId(student?.id || null);

    setFormData(student || initialForm);

    setShowModal(true);
  };

  // ================= SUBMIT =================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setStudents(
        students.map((student) =>
          student.id === editId
            ? {
                ...student,
                ...formData,
              }
            : student
        )
      );
    } else {
      setStudents([
        {
          id: Date.now(),
          ...formData,
        },
        ...students,
      ]);
    }

    setShowModal(false);

    setFormData(initialForm);

    setEditId(null);
  };

  // ================= DELETE =================

  const handleDelete = (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this placement?"
      );

    if (confirmDelete) {
      setStudents(
        students.filter(
          (student) => student.id !== id
        )
      );
    }
  };

  // ================= SEARCH FILTER =================

  const filteredStudents =
    students.filter((student) =>
      `${student.name} ${student.company} ${student.domain}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Placements
          </h1>

          <p className="text-gray-500 mt-1">
            Manage placed students
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          <Plus size={18} />
          Add Placement
        </button>
      </div>

      {/* ================= SEARCH BAR ================= */}

      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search by student, company or domain"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-red-500 shadow-sm"
        />
      </div>

      {/* ================= PLACEMENT CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >
              {/* IMAGE */}

              <div className="h-60 overflow-hidden">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              {/* CONTENT */}

              <div className="p-5">
                <h2 className="text-2xl font-bold text-gray-800">
                  {student.name}
                </h2>

                <p className="text-red-600 font-semibold mt-1 text-lg">
                  {student.company}
                </p>

                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    <span className="font-semibold">
                      Batch:
                    </span>{" "}
                    {student.batch}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Domain:
                    </span>{" "}
                    {student.domain}
                  </p>
                </div>

                {/* SOCIAL ICONS */}

                <div className="flex items-center gap-3 mt-5">
                  {student.linkedin && (
                    <a
                      href={student.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center hover:scale-105 transition"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  )}

                  {student.social && (
                    <a
                      href={student.social}
                      target="_blank"
                      rel="noreferrer"
                      className="w-11 h-11 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center hover:scale-105 transition"
                    >
                      <FaInstagram size={20} />
                    </a>
                  )}
                </div>

                {/* ACTION BUTTONS */}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() =>
                      openModal(student)
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 rounded-xl font-medium transition"
                  >
                    <Pencil size={18} />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(student.id)
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl font-medium transition"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-3xl py-16 text-center shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-700">
              No Placements Found
            </h3>

            <p className="text-gray-500 mt-2">
              Add newly placed students
            </p>
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-7">
            {/* TOP */}

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editId
                  ? "Edit Placement"
                  : "Add Placement"}
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <X />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <input
                type="text"
                name="batch"
                placeholder="Batch (Example: 2025)"
                value={formData.batch}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <input
                type="text"
                name="domain"
                placeholder="Domain (MERN Stack)"
                value={formData.domain}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn Profile Link"
                value={formData.linkedin}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-3 outline-none focus:border-red-500 sm:col-span-2"
              />

              <input
                type="url"
                name="social"
                placeholder="Instagram / Social Link"
                value={formData.social}
                onChange={handleChange}
                className="border rounded-xl px-4 py-3 outline-none focus:border-red-500 sm:col-span-2"
              />

              <input
                type="url"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-3 outline-none focus:border-red-500 sm:col-span-2"
              />

              {/* BUTTONS */}

              <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-5 py-3 border rounded-xl hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition"
                >
                  {editId
                    ? "Update Placement"
                    : "Add Placement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}