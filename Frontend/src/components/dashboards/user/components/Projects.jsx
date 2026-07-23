import { useEffect, useState } from "react";
import api from "../../../../services/api";
import {
  FolderKanban,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Users,
} from "lucide-react";


export default function Projects({
  role = "student",
}) {
  
  const [showProjectModal, setShowProjectModal] =
  useState(false);
  const [projects, setProjects] =
  useState([]);

  const [loading, setLoading] =
  useState(true);

  const [selectedProject, setSelectedProject] =
  useState(null);

  const [showViewModal, setShowViewModal] =
  useState(false);

  const [projectStats, setProjectStats] = useState({
  totalProjects: 0,
  completedProjects: 0,
  pendingProjects: 0,
  activeTeams: 0,
  });

  const [projectForm, setProjectForm] =
  useState({
    title: "",
    description: "",
    tech_stack: "",
    deadline: "",
    team_size: "",
  });

  const [showReviewModal, setShowReviewModal] =
  useState(false);

  const [reviewForm, setReviewForm] =
  useState({
    progress: "",
    status: "",
    remarks: "",
  });

  const fetchProjects = async () => {
  try {

    const response =
      await api.get("/student/projects");

    console.log(
      "Projects API Response:",
      response.data
    );

    const projectsData =
      response.data.data || [];

    setProjects(
      projectsData.map(
        (project) => ({
          id: project.id,

          title: project.title,

          description:
            project.description ||
            "No Description",

          tech:
            project.tech_stack ||
            "N/A",

          status:
            project.status ||
            "Pending",

          deadline:
            project.deadline ||
            "Not Assigned",

          team:
            project.team_size || 0,

          progress:
            project.progress || 0,
        })
      )
    );

    // Project Stats

    setProjectStats({
      totalProjects:
        projectsData.length,

      completedProjects:
        projectsData.filter(
          (project) =>
            project.status ===
            "Completed"
        ).length,

      pendingProjects:
        projectsData.filter(
          (project) =>
            project.status ===
            "Pending"
        ).length,

      activeTeams:
        projectsData.reduce(
          (total, project) =>
            total +
            (project.team_size || 0),
          0
        ),
    });

  } catch (error) {

    console.error(
      "Error fetching projects:",
      error
    );

  } finally {

    setLoading(false);

  }
};

useEffect(() => {
  fetchProjects();
}, []);
  const viewProject = (project) => {
  setSelectedProject(project);

  setShowViewModal(true);
};

  const saveProject = async () => {
  try {
await api.post(
"/student/projects",
projectForm
);

    alert(
      "Project Added Successfully"
    );

    setShowProjectModal(false);

    fetchProjects();

  } catch (error) {

    console.log(error);

    alert("Failed to Add Project");
  }
};

const createReview = async () => {

  try {

    await api.put(
      `/teacher/projects/${selectedProject?.id}`,
      {
        progress:
          Number(reviewForm.progress),

        status:
          reviewForm.status,

        remarks:
          reviewForm.remarks,
      }
    );

    alert(
      "Review Saved Successfully"
    );

    fetchProjects();

    setShowReviewModal(false);

  } catch (error) {

    console.log(error);

  }

};

const saveReview = async () => {
  try {

    await api.put(
      `/teacher/projects/${selectedProject.id}`,
      {
        progress: Number(reviewForm.progress),
        status: reviewForm.status,
        remarks: reviewForm.remarks,
      }
    );

    alert("Review Saved Successfully");

    fetchProjects();

    setShowReviewModal(false);

  } catch (error) {

    console.log(error);

  }
};

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

        {role === "student" && (
  <button
    onClick={() => setShowProjectModal(true)}
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
    Add Project
  </button>
)}
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
                {projectStats.totalProjects}
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
                {projectStats.completedProjects}
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
                {projectStats.pendingProjects}
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
                {projectStats.activeTeams}
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
        {projects.map((project) => (
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

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 break-words">
                  {project.title}
                </h2>

                <p className="text-slate-500 mt-3 leading-7">
                  {project.description}
                </p>
              </div>

              {/* Status */}

              <span
  className={`
    self-start
    sm:self-auto

    px-4
    py-2

    rounded-full

    text-sm
    font-semibold

    whitespace-nowrap

    ${
      project.status === "Completed"
        ? "bg-green-100 text-green-600"
        : project.status === "Pending"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
              
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
  onClick={() => {

    if (role === "student") {

      viewProject(project);

    } else {

      setSelectedProject(project);

      setReviewForm({
        progress:
          project.progress || "",

        status:
          project.status || "",

        remarks:
          project.remarks || "",
      });

      setShowReviewModal(true);

    }

  }}
  className="
w-full
sm:flex-1

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
        {
  showProjectModal && (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white p-6 rounded-xlw-[95%] sm:w-[500px] max-h-[90vh] overflow-y-auto">

        <h2 className="text-xl font-bold mb-4">
          Add Project
        </h2>

        <input
          type="text"
          placeholder="Project Title"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setProjectForm({
              ...projectForm,
              title: e.target.value,
            })
          }
        />

        {/* <input
          type="number"
          placeholder="Progress"
          className="border p-2 w-full mb-3"
          min="0"
          max="100"
          value={projectForm.progress}
          onChange={(e) =>
            setProjectForm({
              ...projectForm,
              progress: e.target.value,
            })
          }
        /> */}

        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setProjectForm({
              ...projectForm,
              description: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Tech Stack"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setProjectForm({
              ...projectForm,
              tech_stack: e.target.value,
            })
          }
        />

        <input
          type="date"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setProjectForm({
              ...projectForm,
              deadline: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Team Size"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setProjectForm({
              ...projectForm,
              team_size: e.target.value,
            })
          }
        />

        <div className="flex gap-3">

          <button
            onClick={saveProject}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>

          <button
            onClick={() =>
              setShowProjectModal(false)
            }
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  )
}

{
  showViewModal &&
  selectedProject && (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white p-6 rounded-xl w-[95%] sm:w-[600px] max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold mb-4">

          {selectedProject.title}

        </h2>

        <p>

          {selectedProject.description}

        </p>

        <p className="mt-3">

          Tech Stack :
          {selectedProject.tech}

        </p>

        <p>

          Status :
          {selectedProject.status}

        </p>

        <p>

          Deadline :
          {selectedProject.deadline}

        </p>

        <button

          onClick={() =>
            setShowViewModal(false)
          }

          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"

        >
          Close

        </button>

      </div>

    </div>
  )
}

{showReviewModal && role === "teacher" && (

  <div className="fixed inset-0 flex items-center justify-center bg-black/50">

    <div className="bg-white p-6 rounded-lg w-[500px]">

      <h2 className="text-2xl font-bold mb-4">
        Create Review
      </h2>

      <input
        type="number"
        placeholder="Progress %"
        className="border p-2 w-full mb-3"
        value={reviewForm.progress}
        onChange={(e) =>
          setReviewForm({
            ...reviewForm,
            progress: e.target.value,
          })
        }
      />

      <select
        className="border p-2 w-full mb-3"
        value={reviewForm.status}
        onChange={(e) =>
          setReviewForm({
            ...reviewForm,
            status: e.target.value,
          })
        }
      >
        <option value="">
          Select Status
        </option>

        <option value="Pending">
          Pending
        </option>

        <option value="In Progress">
          In Progress
        </option>

        <option value="Completed">
          Completed
        </option>
      </select>

      <textarea
        placeholder="Remarks"
        className="border p-2 w-full mb-3"
        value={reviewForm.remarks}
        onChange={(e) =>
          setReviewForm({
            ...reviewForm,
            remarks: e.target.value,
          })
        }
      />

      <div className="flex flex-col sm:flex-row gap-3">

        <button
          onClick={createReview}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>

        <button
          onClick={() =>
            setShowReviewModal(false)
          }
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}
      </div>
    </div>
  );
}