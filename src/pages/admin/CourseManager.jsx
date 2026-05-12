import React, { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
} from "lucide-react";

const initialForm = {
  title: "",
  instructor: "",
  duration: "",
  price: "",
  status: "Active",
};

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const handleChange = ({ target }) =>
    setFormData({
      ...formData,
      [target.name]: target.value,
    });

  const openModal = (course = null) => {
    setEditId(course?.id || null);
    setFormData(course || initialForm);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCourses(
      editId
        ? courses.map((c) =>
            c.id === editId
              ? { ...c, ...formData }
              : c
          )
        : [
            ...courses,
            { id: Date.now(), ...formData },
          ]
    );

    setShowModal(false);
    setFormData(initialForm);
  };

  const handleDelete = (id) =>
    window.confirm("Delete this course?") &&
    setCourses(courses.filter((c) => c.id !== id));

  const filteredCourses = courses.filter((c) =>
    Object.values(c)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Manage Courses
          </h1>

          <p className="text-gray-500">
            Explore courses and start learning today
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
        >
          <Plus size={18} />
          Add Course
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex items-center border">
        <Search className="text-gray-400 mr-2" />

        <input
          type="text"
          placeholder="Search course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      {filteredCourses.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {c.title}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {c.instructor}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    c.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {c.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">
                    Duration:
                  </span>{" "}
                  {c.duration}
                </p>

                <p>
                  <span className="font-semibold">
                    Price:
                  </span>{" "}
                  ₹{c.price}
                </p>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => openModal(c)}
                  className="flex-1 flex items-center justify-center gap-2 bg-yellow-100 text-yellow-600 py-2 rounded-xl hover:bg-yellow-200"
                >
                  <Pencil size={16} />
                  
                </button>

                <button
                  onClick={() =>
                    handleDelete(c.id)
                  }
                  className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-600 py-2 rounded-xl hover:bg-red-200"
                >
                  <Trash2 size={16} />
                  
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-500 shadow-sm">
          No courses found
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">
                {editId
                  ? "Edit Course"
                  : "Add Course"}
              </h2>

              <button
                onClick={() => setShowModal(false)}
              >
                <X />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {[
                ["title", "Course Title"],
                ["instructor", "Instructor"],
                ["duration", "Duration"],
                ["price", "Price"],
              ].map(([name, placeholder]) => (
                <input
                  key={name}
                  type={
                    name === "price"
                      ? "number"
                      : "text"
                  }
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                />
              ))}

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 outline-none"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 border rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                >
                  {editId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;