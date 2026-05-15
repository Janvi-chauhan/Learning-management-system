import React, { useState } from "react";
import { Plus, User, Mail, Lock, Monitor, Building } from "lucide-react";

const StudentAccounts = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    batchType: "Online",
    password: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setStudents([
      ...students,
      {
        id: Date.now(),
        ...formData,
      },
    ]);

    alert("Student account created successfully!");

    setFormData({
      name: "",
      email: "",
      course: "",
      batchType: "Online",
      password: "",
      status: "Active",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Student Accounts</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-4 py-3 rounded-xl"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border px-4 py-3 rounded-xl"
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          required
          className="w-full border px-4 py-3 rounded-xl"
        />

        <select
          name="batchType"
          value={formData.batchType}
          onChange={handleChange}
          className="w-full border px-4 py-3 rounded-xl"
        >
          <option>Online</option>
          <option>Offline</option>
        </select>

        <input
          type="password"
          name="password"
          placeholder="Set Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border px-4 py-3 rounded-xl"
        />

        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Create Student Account
        </button>
      </form>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white p-5 rounded-2xl shadow border"
          >
            <h3 className="font-bold text-lg">{student.name}</h3>
            <p>{student.email}</p>
            <p>{student.course}</p>
            <p>
              Batch:{" "}
              <span className="font-semibold">{student.batchType}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAccounts;