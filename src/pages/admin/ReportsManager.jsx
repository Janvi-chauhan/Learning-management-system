import React, { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  FileText,
} from "lucide-react";

const initialForm = {
  title: "",
  category: "",
  date: "",
  status: "Pending",
};

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const handleChange = ({ target }) =>
    setFormData({
      ...formData,
      [target.name]: target.value,
    });

  const openModal = (report = null) => {
    setEditId(report?.id || null);
    setFormData(report || initialForm);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setReports(
      editId
        ? reports.map((r) =>
            r.id === editId
              ? { ...r, ...formData }
              : r
          )
        : [
            ...reports,
            { id: Date.now(), ...formData },
          ]
    );

    setShowModal(false);
    setFormData(initialForm);
  };

  const handleDelete = (id) =>
    window.confirm("Delete this report?") &&
    setReports(reports.filter((r) => r.id !== id));

  const filteredReports = reports.filter((r) =>
    Object.values(r)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Manage Reports
          </h1>

          <p className="text-gray-500">
            Manage and track all reports
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
        >
          <Plus size={18} />
          Add Report
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex items-center border">
        <Search className="text-gray-400 mr-2" />

        <input
          type="text"
          placeholder="Search report..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      {filteredReports.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-3 rounded-xl">
                    <FileText className="text-red-600" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {r.title}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      {r.category}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    r.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {r.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-5">
                <span className="font-semibold">
                  Date:
                </span>{" "}
                {r.date}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => openModal(r)}
                  className="flex-1 flex items-center justify-center gap-2 bg-yellow-100 text-yellow-600 py-2 rounded-xl hover:bg-yellow-200"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(r.id)
                  }
                  className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-600 py-2 rounded-xl hover:bg-red-200"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-500 shadow-sm">
          No reports found
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">
                {editId
                  ? "Edit Report"
                  : "Add Report"}
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
                ["title", "Report Title"],
                ["category", "Category"],
              ].map(([name, placeholder]) => (
                <input
                  key={name}
                  type="text"
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                />
              ))}

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3 outline-none"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 outline-none"
              >
                <option>Pending</option>
                <option>Completed</option>
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

export default ManageReports;