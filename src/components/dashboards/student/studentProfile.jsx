
import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  BookOpen,
  LogOut,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import studentsData from "../studentData";

export default function StudentProfile() {
  // ================= STATE =================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  // Change password states
  const [showChangePassword, setShowChangePassword] =
    useState(false);
  const [currentPassword, setCurrentPassword] =
    useState("");
  const [newPassword, setNewPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [passwordMessage, setPasswordMessage] =
    useState("");

  // ================= LOAD LOGIN FROM LOCAL STORAGE =================
  useEffect(() => {
    const savedStudent = localStorage.getItem(
      "loggedInStudent"
    );

    if (savedStudent) {
      setStudent(JSON.parse(savedStudent));
    }
  }, []);

  // ================= LOGIN =================
  const handleLogin = (e) => {
    e.preventDefault();

    // Use localStorage students if available, otherwise fallback to static data
    const storedStudents =
      JSON.parse(localStorage.getItem("students")) ||
      studentsData;

    const foundStudent = storedStudents.find(
      (student) =>
        student.email === email &&
        student.password === password
    );

    if (!foundStudent) {
      setError("Invalid email or password");
      return;
    }

    setStudent(foundStudent);
    localStorage.setItem(
      "loggedInStudent",
      JSON.stringify(foundStudent)
    );
    setError("");
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("loggedInStudent");
    setStudent(null);
    setEmail("");
    setPassword("");
    setShowChangePassword(false);
  };

  // ================= CHANGE PASSWORD =================
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordMessage("");

    if (currentPassword !== student.password) {
      setPasswordMessage(
        "Current password is incorrect."
      );
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage(
        "New password must be at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage(
        "New password and confirm password do not match."
      );
      return;
    }

    // Update current student
    const updatedStudent = {
      ...student,
      password: newPassword,
    };

    // Update local state
    setStudent(updatedStudent);

    // Update logged in student
    localStorage.setItem(
      "loggedInStudent",
      JSON.stringify(updatedStudent)
    );

    // Update student list in localStorage
    const storedStudents =
      JSON.parse(localStorage.getItem("students")) ||
      studentsData;

    const updatedStudents = storedStudents.map(
      (s) =>
        s.id === student.id
          ? { ...s, password: newPassword }
          : s
    );

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );

    // Reset form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setPasswordMessage(
      "Password changed successfully."
    );
  };

  // ================= LOGIN SCREEN =================
  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Student Login
          </h1>

          <p className="text-gray-500 text-center mb-6">
            Login using credentials provided by admin
          </p>

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />

                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </label>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-3"
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                      className="text-gray-500"
                    />
                  ) : (
                    <Eye
                      size={18}
                      className="text-gray-500"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-sm">
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================= PROFILE PAGE =================
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <User size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {student.name}
              </h1>
              <p className="text-gray-500">
                {student.email}
              </p>
              <p className="text-sm text-gray-500">
                Batch: {student.batchType}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() =>
                setShowChangePassword(
                  !showChangePassword
                )
              }
              className="inline-flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-100 transition"
            >
              <Lock size={18} />
              Change Password
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      {showChangePassword && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Change Password
          </h2>

          <form
            onSubmit={handleChangePassword}
            className="space-y-4"
          >
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            />

            {passwordMessage && (
              <p
                className={`text-sm ${
                  passwordMessage.includes(
                    "successfully"
                  )
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {passwordMessage}
              </p>
            )}

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Update Password
            </button>
          </form>
        </div>
      )}

      {/* Enrolled Courses */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          My Enrolled Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {(Array.isArray(student.course)
            ? student.course
            : [student.course]
          ).map((course, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition"
            >
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
                <BookOpen size={24} />
              </div>

              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {course}
              </h3>

              <p className="text-gray-500 text-sm mb-4">
                Start learning and track your
                progress.
              </p>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-medium transition">
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}