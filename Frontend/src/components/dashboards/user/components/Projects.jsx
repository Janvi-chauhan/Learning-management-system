import {
  FolderKanban,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Users,
} from "lucide-react";

const projectsData = [
  {
    id: 1,

    title: "AI Powered LMS",

    description:
      "A scalable learning management system with AI integrations.",

    tech:
      "React • Node.js • MongoDB • Tailwind",

    status: "In Progress",

    deadline: "28 Aug 2025",

    team: 4,

    progress: 72,
  },

  {
    id: 2,

    title: "Smart Attendance System",

    description:
      "Face recognition based smart attendance tracking platform.",

    tech:
      "Python • OpenCV • Firebase",

    status: "Completed",

    deadline: "15 Jul 2025",

    team: 3,

    progress: 100,
  },

  {
    id: 3,

    title: "Blockchain Voting App",

    description:
      "Secure online voting system using blockchain concepts.",

    tech:
      "Solidity • React • Express",

    status: "Pending",

    deadline: "12 Sep 2025",

    team: 5,

    progress: 35,
  },
];

export default function Projects({
  role = "student",
}) {
  return (
    <div className="w-full min-h-screen bg-slate-100">
      
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            {role === "student"
              ? "Projects"
              : "Project Supervision"}
          </h1>

          <p className="text-slate-500 mt-2">
            {role === "student"
              ? "Track your academic and collaborative projects."
              : "Monitor student project progress and submissions."}
          </p>
        </div>

        <button
          className="
            px-5
            py-3
            rounded-2xl
            bg-slate-900
            hover:bg-slate-800
            text-white
            font-semibold
            transition-all
          "
        >
          {role === "student"
            ? "Add Project"
            : "Create Review"}
        </button>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        
        {/* Total */}

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center">
            
            <div>
              <p className="text-slate-500">
                Total Projects
              </p>

              <h2 className="text-3xl font-bold mt-2">
                12
              </h2>
            </div>

            <div className="p-3 rounded-2xl bg-red-100 text-red-600">
              <FolderKanban size={28} />
            </div>
          </div>
        </div>

        {/* Completed */}

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center">
            
            <div>
              <p className="text-slate-500">
                Completed
              </p>

              <h2 className="text-3xl font-bold mt-2">
                07
              </h2>
            </div>

            <div className="p-3 rounded-2xl bg-red-100 text-red-600">
              <CheckCircle2 size={28} />
            </div>
          </div>
        </div>

        {/* Pending */}

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center">
            
            <div>
              <p className="text-slate-500">
                Pending
              </p>

              <h2 className="text-3xl font-bold mt-2">
                03
              </h2>
            </div>

            <div className="p-3 rounded-2xl bg-red-100 text-red-600">
              <AlertCircle size={28} />
            </div>
          </div>
        </div>

        {/* Active Teams */}

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center">
            
            <div>
              <p className="text-slate-500">
                Active Teams
              </p>

              <h2 className="text-3xl font-bold mt-2">
                09
              </h2>
            </div>

            <div className="p-3 rounded-2xl bg-red-100 text-red-600">
              <Users size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Project Cards */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
            "
          >
            
            {/* Top */}

            <div className="flex items-start justify-between">
              
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {project.title}
                </h2>

                <p className="text-slate-500 mt-3 leading-7">
                  {project.description}
                </p>
              </div>

              {/* Status */}

              <span
                className={`
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-semibold

                  ${
                    project.status ===
                    "Completed"
                      ? "bg-red-100 text-red-600"
                      : project.status ===
                        "Pending"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {project.status}
              </span>
            </div>

            {/* Tech Stack */}

            <div className="mt-5">
              <p className="text-sm text-slate-500">
                Tech Stack
              </p>

              <h3 className="font-medium text-slate-700 mt-2">
                {project.tech}
              </h3>
            </div>

            {/* Meta Info */}

            <div className="grid grid-cols-2 gap-5 mt-6">
              
              {/* Deadline */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  p-4
                  rounded-2xl
                  bg-slate-50
                "
              >
                <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
                  <Clock3 size={20} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Deadline
                  </p>

                  <h3 className="font-semibold text-slate-800">
                    {project.deadline}
                  </h3>
                </div>
              </div>

              {/* Team */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  p-4
                  rounded-2xl
                  bg-slate-50
                "
              >
                <div className="p-3 rounded-xl bg-red-100 text-red-700">
                  <Users size={20} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Team Size
                  </p>

                  <h3 className="font-semibold text-slate-800">
                    {project.team} Members
                  </h3>
                </div>
              </div>
            </div>

            {/* Progress */}

            <div className="mt-6">
              <div className="flex justify-between mb-2">
                
                <span className="font-medium text-slate-700">
                  Project Progress
                </span>

                <span className="font-semibold text-black">
                  {project.progress}%
                </span>
              </div>

              <div className="w-full h-3 bg-slate-200 rounded-full">
                <div
                  className="
                    h-3
                    rounded-full
                    bg-gradient-to-r
                    from-red-700
                    to-red-500
                  "
                  style={{
                    width: `${project.progress}%`,
                  }}
                />
              </div>
            </div>

            {/* Actions */}

            <div className="flex gap-4 mt-8">
             

              <button
                className="
                  flex-1
                  flex
                  items-center
                  justify-center
                  gap-2
                  py-3
                  rounded-2xl
                  border
                  border-slate-300
                  hover:bg-slate-100
                  font-semibold
                  transition-all
                "
              >
                <ExternalLink size={18} />

                {role === "student"
                  ? "View Project"
                  : "Review"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}