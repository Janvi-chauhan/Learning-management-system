import { useState } from "react";

import {
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

import {
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

// ================= INITIAL FORM =================

const initialForm = {
  name: "",
  company: "",
  batch: "",
  domain: "",
  package: "",
  linkedin: "",
  social: "",
  image: "",
};

export default function Placements() {
  const [students, setStudents] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

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
        students.map((s) =>
          s.id === editId
            ? {
                ...s,
                ...formData,
              }
            : s
        )
      );
    } else {
      setStudents([
        ...students,
        {
          id: Date.now(),
          ...formData,
        },
      ]);
    }

    setShowModal(false);

    setFormData(initialForm);
  };

  // ================= DELETE =================

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Delete this placement?"
      )
    ) {
      setStudents(
        students.filter(
          (s) => s.id !== id
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      
      {/* ================= HEADER ================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Placements
          </h1>

          <p className="text-gray-500 mt-1">
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

      {/* ================= CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        
        {students.length > 0 ? (
          students.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition"
            >
              
              {/* IMAGE */}

              <div className="h-56 w-full overflow-hidden">
                <img
                  src={
                    student.image ||
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  }
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}

              <div className="p-5">
                
                <h2 className="text-xl font-bold text-gray-800">
                  {student.name}
                </h2>

                <p className="text-red-600 font-semibold mt-1">
                  {student.company}
                </p>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  
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

                  <p>
                    <span className="font-semibold">
                      Package:
                    </span>{" "}
                    <span className="text-red-600 font-semibold">
                      {student.package}
                    </span>
                  </p>
                </div>

                {/* ================= SOCIAL LINKS ================= */}

                <div className="flex items-center gap-3 mt-5">
                  
                  {student.linkedin && (
                    <a
                      href={student.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:scale-105 transition"
                    >
                      <FaLinkedin size={18} />
                    </a>
                  )}

                  {student.social && (
                    <a
                      href={student.social}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-pink-100 text-pink-600 hover:scale-105 transition"
                    >
                      <FaInstagram size={18} />
                    </a>
                  )}
                </div>

                {/* ================= ACTIONS ================= */}

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
          <div className="col-span-full bg-white rounded-2xl py-16 text-center shadow-sm">
            
            <h3 className="text-xl font-semibold text-gray-700">
              No Placements Added
            </h3>

            <p className="text-gray-500 mt-2">
              Add newly placed students
            </p>
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            
            {/* TOP */}

            <div className="flex items-center justify-between mb-5">
              
              <h2 className="text-2xl font-bold">
                {editId
                  ? "Edit Placement"
                  : "Add Placement"}
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                <X />
              </button>
            </div>

            {/* ================= FORM ================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              
              {[
                ["name", "Student Name"],
                ["company", "Company"],
                ["batch", "Batch"],
                ["domain", "Domain"],
                ["package", "Package (e.g. 6 LPA)"],
                ["linkedin", "LinkedIn Link"],
                ["social", "Instagram Link"],
                ["image", "Image URL"],
              ].map(
                ([name, placeholder]) => (
                  <input
                    key={name}
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    required={
                      name !== "social"
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                )
              )}

              {/* ================= BUTTONS ================= */}

              <div className="flex justify-end gap-3 pt-2">
                
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-5 py-3 border rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition"
                >
                  {editId
                    ? "Update"
                    : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}