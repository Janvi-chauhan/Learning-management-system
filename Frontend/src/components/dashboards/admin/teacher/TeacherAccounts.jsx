import React, { useState } from "react";
import { User, Mail, Lock, BookOpen, Monitor } from "lucide-react";

const TeacherAccounts = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
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

    setTeachers([
      ...teachers,
      {
        id: Date.now(),
        ...formData,
      },
    ]);

    alert("Teacher account created successfully!");

    setFormData({
      name: "",
      email: "",
      specialization: "",
      batchType: "Online",
      password: "",
      status: "Active",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Teacher Accounts</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md space-y-4"
      >
        {/* Teacher Name */}
        <div className="relative">
          <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            name="name"
            placeholder="Teacher Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border pl-10 pr-4 py-3 rounded-xl"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border pl-10 pr-4 py-3 rounded-xl"
          />
        </div>

        {/* Specialization */}
        <div className="relative">
          <BookOpen
            className="absolute left-3 top-3.5 text-gray-400"
            size={20}
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization (e.g. MERN Stack)"
            value={formData.specialization}
            onChange={handleChange}
            required
            className="w-full border pl-10 pr-4 py-3 rounded-xl"
          />
        </div>

        {/* Batch Type */}
        <div className="relative">
          <Monitor
            className="absolute left-3 top-3.5 text-gray-400"
            size={20}
          />
          <select
            name="batchType"
            value={formData.batchType}
            onChange={handleChange}
            className="w-full border pl-10 pr-4 py-3 rounded-xl"
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="password"
            name="password"
            placeholder="Set Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border pl-10 pr-4 py-3 rounded-xl"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold w-full"
        >
          Create Teacher Account
        </button>
      </form>

      {/* Teacher Cards */}
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white p-5 rounded-2xl shadow border"
          >
            <h3 className="font-bold text-lg">{teacher.name}</h3>
            <p className="text-gray-600">{teacher.email}</p>
            <p className="text-gray-700">
              <span className="font-semibold">Specialization:</span>{" "}
              {teacher.specialization}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Batch Type:</span>{" "}
              {teacher.batchType}
            </p>
            <span
              className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                teacher.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {teacher.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherAccounts;