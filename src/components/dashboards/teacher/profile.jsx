import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Lock,
  Camera,
} from "lucide-react";

export default function Profile() {
  const [teacher, setTeacher] = useState({
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    subject: "Full Stack Development",
    experience: "5 Years",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileChange = ({
    target,
  }) =>
    setTeacher({
      ...teacher,
      [target.name]: target.value,
    });

  const handlePasswordChange = ({
    target,
  }) =>
    setPasswords({
      ...passwords,
      [target.name]: target.value,
    });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Teacher Profile
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your profile and security
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center text-center">
          <div className="relative">
            <img
              src=""
              alt=""
              className="w-32 h-32 rounded-full object-cover border-4 border-red-100"
            />

            <button className="absolute bottom-1 right-1 bg-red-600 text-white p-2 rounded-full">
              <Camera size={16} />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {teacher.name}
          </h2>

          <p className="text-gray-500 mt-1">
            {teacher.subject}
          </p>

          <div className="w-full mt-6 space-y-3 text-sm">
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
              <Mail
                size={18}
                className="text-red-600"
              />
              {teacher.email}
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
              <Phone
                size={18}
                className="text-red-600"
              />
              {teacher.phone}
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
              <BookOpen
                size={18}
                className="text-red-600"
              />
              {teacher.experience} Experience
            </div>
          </div>
        </div>

        {/* Edit Profile */}
        <div className="xl:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                [
                  "name",
                  "Full Name",
                  "text",
                  User,
                ],
                [
                  "email",
                  "Email Address",
                  "email",
                  Mail,
                ],
                [
                  "phone",
                  "Phone Number",
                  "text",
                  Phone,
                ],
                [
                  "subject",
                  "Subject",
                  "text",
                  BookOpen,
                ],
              ].map(
                ([
                  name,
                  placeholder,
                  type,
                  Icon,
                ]) => (
                  <div
                    key={name}
                    className="relative"
                  >
                    <Icon
                      size={18}
                      className="absolute top-4 left-4 text-gray-400"
                    />

                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      value={teacher[name]}
                      onChange={
                        handleProfileChange
                      }
                      className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:border-red-500"
                    />
                  </div>
                )
              )}
            </div>

            <button className="mt-5 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition">
              Save Changes
            </button>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Change Password
            </h2>

            <div className="space-y-4">
              {[
                [
                  "current",
                  "Current Password",
                ],
                ["new", "New Password"],
                [
                  "confirm",
                  "Confirm Password",
                ],
              ].map(
                ([name, placeholder]) => (
                  <div
                    key={name}
                    className="relative"
                  >
                    <Lock
                      size={18}
                      className="absolute top-4 left-4 text-gray-400"
                    />

                    <input
                      type="password"
                      name={name}
                      placeholder={placeholder}
                      value={passwords[name]}
                      onChange={
                        handlePasswordChange
                      }
                      className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:border-red-500"
                    />
                  </div>
                )
              )}
            </div>

            <button className="mt-5 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}