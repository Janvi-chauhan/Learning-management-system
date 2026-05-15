import React from "react";
import {
  FolderKanban,
  CalendarDays,
  CheckCircle,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Learning Platform",
    tech: "React • Node.js • MongoDB",
    status: "Completed",
    date: "12 May 2026",
    progress: 100,
  },
  {
    id: 2,
    title: "AI Resume Builder",
    tech: "React • Firebase • AI API",
    status: "In Progress",
    date: "20 June 2026",
    progress: 70,
  },
  {
    id: 3,
    title: "Campus Lost & Found",
    tech: "MERN Stack • Socket.io",
    status: "Pending",
    date: "30 July 2026",
    progress: 35,
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          My Projects
        </h1>

        <p className="text-gray-500 mt-1">
          Track your academic and personal projects
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5"
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-3">
              <div className="p-3 rounded-xl bg-red-100 text-red-600">
                <FolderKanban size={24} />
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : project.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {project.status}
              </span>
            </div>

            {/* Content */}
            <div className="mt-5">
              <h2 className="text-xl font-bold text-gray-800">
                {project.title}
              </h2>

              <p className="text-gray-500 mt-2 text-sm">
                {project.tech}
              </p>

              {/* Date */}
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                <CalendarDays size={16} />
                {project.date}
              </div>

              {/* Progress */}
              <div className="mt-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">
                    Progress
                  </span>

                  <span className="text-red-600 font-semibold">
                    {project.progress}%
                  </span>
                </div>

                <div className="w-full h-2.5 bg-gray-200 rounded-full">
                  <div
                    className="h-2.5 bg-red-600 rounded-full"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* Button */}
              <button className="w-full mt-6 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition">
                <CheckCircle size={18} />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}