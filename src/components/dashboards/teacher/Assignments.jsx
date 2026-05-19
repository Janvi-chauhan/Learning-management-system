import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  CalendarDays,
} from "lucide-react";

const initialForm = {
  title: "",
  course: "",
  deadline: "",
  status: "Pending",
};

export default function Assignments() {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "React Authentication",
      course: "Full Stack Development",
      deadline: "20 May 2026",
      status: "Pending",
    },
    {
      id: 2,
      title: "Java OOP Concepts",
      course: "Java Backend",
      deadline: "24 May 2026",
      status: "Completed",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] =
    useState(initialForm);

  const filteredAssignments =
    assignments.filter((a) =>
      [a.title, a.course]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const handleChange = ({ target }) =>
    setFormData({
      ...formData,
      [target.name]: target.value,
    });

  const openModal = (assignment = null) => {
    setEditId(assignment?.id || null);
    setFormData(assignment || initialForm);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setAssignments(
        assignments.map((a) =>
          a.id === editId
            ? { ...a, ...formData }
            : a
        )
      );
    } else {
      setAssignments([
        {
          id: Date.now(),
          ...formData,
        },
        ...assignments,
      ]);
    }

    setShowModal(false);
    setFormData(initialForm);
  };

  const handleDelete = (id) =>
    window.confirm(
      "Delete this assignment?"
    ) &&
    setAssignments(
      assignments.filter((a) => a.id !== id)
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Assignments
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and track student assignments
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
        >
          <Plus size={18} />
          Add Assignment
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center mb-6">
        <Search
          size={18}
          className="text-gray-400 mr-2"
        />

        <input
          type="text"
          placeholder="Search assignment..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full outline-none"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredAssignments.length ? (
          filteredAssignments.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {a.title}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    {a.course}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    a.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {a.status}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                <CalendarDays size={16} />
                {a.deadline}
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => openModal(a)}
                  className="flex-1 py-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  <Pencil
                    size={18}
                    className="mx-auto"
                  />
                </button>

                <button
                  onClick={() =>
                    handleDelete(a.id)
                  }
                  className="flex-1 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <Trash2
                    size={18}
                    className="mx-auto"
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-2xl py-14 text-center text-gray-500 shadow-sm">
            No assignments found
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold">
                {editId
                  ? "Edit Assignment"
                  : "Add Assignment"}
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                <X />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {[
                ["title", "Assignment Title"],
                ["course", "Course Name"],
                ["deadline", "Deadline"],
              ].map(
                ([name, placeholder]) => (
                  <input
                    key={name}
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-3 outline-none"
                  />
                )
              )}

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 outline-none"
              >
                <option>
                  Pending
                </option>

                <option>
                  Completed
                </option>
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-5 py-3 border rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl"
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