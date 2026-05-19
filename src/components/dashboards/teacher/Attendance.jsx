import { useState } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const initialStudents = [
  {
    id: 1,
    name: "Aarav Sharma",
    course: "Full Stack Development",
    status: "Present",
  },
  {
    id: 2,
    name: "Priya Verma",
    course: "Java Backend",
    status: "Absent",
  },
  {
    id: 3,
    name: "Rahul Singh",
    course: "Data Analysis",
    status: "Present",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    course: "Frontend Development",
    status: "Present",
  },
];

export default function Attendance() {
  const [students, setStudents] =
    useState(initialStudents);

  const [search, setSearch] = useState("");

  const toggleAttendance = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? {
              ...student,
              status:
                student.status === "Present"
                  ? "Absent"
                  : "Present",
            }
          : student
      )
    );
  };

  const filteredStudents =
    students.filter((student) =>
      [student.name, student.course]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Attendance Management
        </h1>

        <p className="text-gray-500 mt-1">
          Track and manage student attendance
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center mb-6">
        <Search
          size={18}
          className="text-gray-400 mr-2"
        />

        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full outline-none bg-transparent"
        />
      </div>

      {/* Attendance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredStudents.length ? (
          filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {student.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {student.course}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    student.status === "Present"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {student.status}
                </span>
              </div>

              <button
                onClick={() =>
                  toggleAttendance(student.id)
                }
                className={`w-full mt-5 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition ${
                  student.status === "Present"
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-green-100 text-green-600 hover:bg-green-200"
                }`}
              >
                {student.status === "Present" ? (
                  <>
                    <XCircle size={18} />
                    Mark Absent
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Mark Present
                  </>
                )}
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-2xl py-14 text-center text-gray-500 shadow-sm">
            No students found
          </div>
        )}
      </div>
    </div>
  );
}