import { useState, useEffect } from "react";
import api from "../../../services/api.js";

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


export default function Placements() {

  const [showModal, setShowModal] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [formData, setFormData] =
    useState(initialForm);

    const fetchPlacements = async () => {
  try {
    const response =
      await api.get(
        "/admin/placements"
      );

    console.log(
      "Placements API:",
      response.data.data
    );

    setStudents(
      response.data.data
    );
  } catch (error) {
    console.log(error);
  }
};
    const [students, setStudents] =
     useState([]);

useEffect(() => {
  fetchPlacements();
}, []);

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

  // ================= CLOSE MODAL =================

  const closeModal = () => {
    setShowModal(false);

    setFormData(initialForm);

    setEditId(null);
  };

  // ================= SUBMIT =================

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("company", formData.company);
    data.append("batch", formData.batch);
    data.append("domain", formData.domain);
    data.append("linkedin", formData.linkedin);
    data.append("social", formData.social);

    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    if (editId) {

      // UPDATE
      await api.post(
        `/admin/placements/${editId}?_method=PUT`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Placement Updated Successfully");

    } else {

      // CREATE
      await api.post(
        "/admin/placements",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Placement Added Successfully");
    }

    fetchPlacements();
    closeModal();

  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
  }
};

  // ================= DELETE =================

  const handleDelete = async (id) => {
  const confirmDelete =
    window.confirm(
      "Delete this placement?"
    );

  if (!confirmDelete) return;

  try {
    await api.delete(
      `/admin/placements/${id}`
    );

    fetchPlacements();
  } catch (error) {
    console.log(error);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 p-4 sm:p-6 lg:p-8">
      
      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        
        <div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Placements
          </h1>

          <p className="text-gray-500 mt-2">
            Manage placed students
          </p>

        </div>

        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-5 py-3 rounded-2xl font-medium transition-all shadow-lg"
        >
          <Plus size={18} />
          Add Placement
        </button>

      </div>

      {/* ================= SEARCH BAR ================= */}

      <div className="relative mb-8">
        
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
          className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-red-500 shadow-sm"
        />

      </div>

      {/* ================= DESKTOP TABLE ================= */}

<div className="hidden lg:block w-full">
  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
    <div>
    
    <table className="w-full table-fixed">
      
      <thead className="bg-gradient-to-r from-red-600 to-red-500 text-white">
        <tr>
          <th className="w-[28%] px-4 py-4 text-left text-sm font-semibold">
            Student
          </th>

          <th className="w-[16%] px-4 py-4 text-left text-sm font-semibold">
            Company
          </th>

          <th className="w-[12%] px-4 py-4 text-left text-sm font-semibold">
            Batch
          </th>

          <th className="w-[20%] px-4 py-4 text-left text-sm font-semibold">
            Domain
          </th>

          <th className="w-[12%] px-4 py-4 text-center text-sm font-semibold">
            Social
          </th>

          <th className="w-[12%] px-4 py-4 text-center text-sm font-semibold">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <tr
              key={student.id}
              className="border-b border-gray-100 hover:bg-red-50/40 transition"
            >
              
              {/* STUDENT */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />

                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800">
                      {student.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Placement Student
                    </p>
                  </div>
                </div>
              </td>

              {/* COMPANY */}
              <td className="px-4 py-4">
                <span className="font-semibold text-red-600 block">
                  {student.company}
                </span>
              </td>

              {/* BATCH */}
              <td className="px-4 py-4">
                <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium">
                  {student.batch}
                </span>
              </td>

              {/* DOMAIN */}
              <td className="px-4 py-4">
                <p className="text-gray-700 break-words">
                  {student.domain}
                </p>
              </td>

              {/* SOCIAL */}
              <td className="px-4 py-4">
                <div className="flex items-center justify-center gap-2">
                  
                  {student.linkedin && (
                    <a
                      href={student.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center"
                    >
                      <FaLinkedin size={16} />
                    </a>
                  )}

                  {student.social && (
                    <a
                      href={student.social}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center"
                    >
                      <FaInstagram size={16} />
                    </a>
                  )}
                </div>
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-4">
                <div className="flex items-center justify-center gap-2">
                  
                  <button
                    onClick={() => openModal(student)}
                    className="w-9 h-9 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 flex items-center justify-center transition"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(student.id)}
                    className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition"
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
              className="py-16 text-center text-gray-500"
            >
              No Placements Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
</div>

{/* ================= MOBILE + TABLET CARDS ================= */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
  
  {filteredStudents.length > 0 ? (
    filteredStudents.map((student) => (
      <div
        key={student.id}
        className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm"
      >
        
        
        {/* IMAGE */}



<div className=" relative w-full h-72 overflow-hidden bg-gray-100">
  
  <img
    src={student.image}
    alt={student.name}
    className="absolute inset-0 w-full h-full object-cover object-center"
    loading="lazy"
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
          </div>

          {/* SOCIAL */}
          <div className="flex gap-3 mt-5">
            
            {student.linkedin && (
              <a
                href={student.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center"
              >
                <FaLinkedin size={18} />
              </a>
            )}

            {student.social && (
              <a
                href={student.social}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center"
              >
                <FaInstagram size={18} />
              </a>
            )}
          </div>

          {/* ACTIONS */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            
            <button
              onClick={() => openModal(student)}
              className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 rounded-xl font-medium"
            >
              <Pencil size={18} />
              Edit
            </button>

            <button
              onClick={() => handleDelete(student.id)}
              className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl font-medium"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="col-span-full bg-white rounded-3xl py-16 text-center border border-gray-200">
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
          
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
            
            {/* TOP */}

            <div className="flex items-center justify-between mb-6">
              
              <h2 className="text-2xl font-bold text-gray-800">
                {editId
                  ? "Edit Placement"
                  : "Add Placement"}
              </h2>

              <button
                onClick={closeModal}
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
                placeholder="Batch"
                value={formData.batch}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <input
                type="text"
                name="domain"
                placeholder="Domain"
                value={formData.domain}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-3 outline-none focus:border-red-500"
              />

              <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn URL"
                value={formData.linkedin}
                onChange={handleChange}
                className="border rounded-xl px-4 py-3 outline-none focus:border-red-500 sm:col-span-2"
              />

              <input
                type="url"
                name="social"
                placeholder="Instagram URL"
                value={formData.social}
                onChange={handleChange}
                className="border rounded-xl px-4 py-3 outline-none focus:border-red-500 sm:col-span-2"
              />

              <input
                type="file"
                name="image"
                placeholder="image/*"
                onChange={(e) =>
    setFormData({
      ...formData,
      image: e.target.files[0],
    })
  }
                className="border rounded-xl px-4 py-3 outline-none focus:border-red-500 sm:col-span-2"
              />

              {/* BUTTONS */}

              <div className="sm:col-span-2 flex flex-col sm:flex-row justify-end gap-3 pt-2">
                
                <button
                  type="button"
                  onClick={closeModal}
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