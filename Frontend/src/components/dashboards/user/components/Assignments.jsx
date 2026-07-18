import { useEffect, useState } from "react";
import api from "../../../../services/api";
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Users,
  FileCheck2,
  MessageCircleQuestion,
} from "lucide-react";

import { motion } from "framer-motion";

export default function Assignments({
  role = "student",
}) {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
  console.log(
    "selectedFile changed:",
    selectedFile
  );
}, [selectedFile]);

const [teacherStatsData, setTeacherStatsData] =
useState({
  assignments: 0,
  submissions: 0,
  questions: 0,
  students: 0,
});
const [studentStatsData, setStudentStatsData] =
useState({
    assignments:0,
    pending:0,
    completed:0,
    upcoming:0
});

  const [assignmentForm, setAssignmentForm] =
    useState({
      title: "",
      course: "",
      due_date: "",
  });

  const createAssignment = async () => {
  console.log("SAVE CLICKED");

  console.log("FORM DATA:", assignmentForm);

  try {
    const response = await api.post(
      "/teacher/assignments",
      {
        title: assignmentForm.title,
        course: assignmentForm.course,
        due_date: assignmentForm.due_date,
      }
    );

    console.log(
      "ASSIGNMENT CREATED:",
      response.data
    );

    fetchAssignments();

    setShowModal(false);

    setAssignmentForm({
      title: "",
      course: "",
      due_date: "",
    });

  } catch (error) {

    console.log("FULL ERROR:", error);

    console.log(
      "SERVER RESPONSE:",
      error.response?.data
    );
  }
};

const uploadAssignment = async () => {

  console.log(
    "selectedAssignment:",
    selectedAssignment
  );

  console.log(
    "selectedFile:",
    selectedFile
  );

  if (!selectedFile) {

    alert(
      "Please select a file first"
    );

    return;
  }

  const formData =
    new FormData();

  const userString = localStorage.getItem("user");

if (!userString) {
    alert("Please login again.");
    return;
}

const user = JSON.parse(userString);

formData.append(
  "assignment_id",
  selectedAssignment.id
);
// console.log(user);
// formData.append(
//   "student_id",
//   user.id
// );

formData.append(
  "file",
  selectedFile
);

  console.log(
    "FormData Contents:"
  );

  for (
    let pair of formData.entries()
  ) {
    console.log(
      pair[0],
      pair[1]
    );
  }

  try {

    const response =
      await api.post(
        "/student/assignment-submissions",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    console.log(
      "UPLOAD SUCCESS:",
      response.data
    );

    alert(
      "Assignment Uploaded Successfully"
    );

    setShowUploadModal(
      false
    );

    setSelectedFile(
      null
    );

  } catch (error) {

    console.log(
      "UPLOAD ERROR:",
      error.response?.data
    );

    console.log(error);

  }
};
// console.log(
//   "CURRENT selectedFile:",
//   selectedFile
// );
// console.log(
//   "file =",
//   file
// );


  const fetchAssignments = async () => {
  try {

    const endpoint =
      role === "teacher"
        ? "/teacher/assignments"
        : "/student/assignments";

    const response =
      await api.get(endpoint);

    console.log(
      "Assignments API Response:",
      response.data
    );

    setAssignments(
      (response.data.data || []).map(
        (assignment) => ({
          id: assignment.id,

          title: assignment.title,

          course:
            assignment.course ||
            "General Assignment",

          dueDate:
            assignment.due_date,

          status:
            assignment.submission_status ||
            "Not Submitted",

          progress:
            assignment.progress || 0,

          submissions:
            assignment.submissions_count || 0,

          doubts:
            assignment.questions || 0,
        })
      )
    );

  } catch (error) {

    console.error(
      "Error fetching assignments:",
      error
    );

  } finally {

    setLoading(false);

  }
};
  useEffect(() => {

    fetchAssignments();

    if(role==="teacher"){

        fetchTeacherStats();

    }

    if(role==="student"){

        fetchStudentStats();

    }

},[]);

  console.log(
  "selectedFile =",
  selectedFile
);
const fetchTeacherStats = async () => {

  try {

    const response =
      await api.get(
        "/teacher/assignment-stats"
      );

    console.log(
      "Teacher Stats:",
      response.data
    );

    setTeacherStatsData(
      response.data.data
    );

  } catch (error) {

    console.log(error);

  }

};
const fetchStudentStats = async () => {

    try {

        const response =
        await api.get(
            "/student/assignment-stats"
        );

        console.log(
            "Student Stats:",
            response.data
        );

        setStudentStatsData(
            response.data.data
        );

    } catch(error){

        console.log(error);

    }

};
const fetchSubmissions = async (assignmentId) => {

  try {

    const response = await api.get(
      `/teacher/assignments/${assignmentId}/submissions`
    );

    console.log(response.data);

    setSubmissions(response.data.data);

  } catch (error) {

    console.log(error);

  }

};

  // ================= STATS =================

  const studentStats = [
    {
      title: "Assignments",
      value: studentStatsData.assignments,

      icon: CalendarDays,

      bg: "bg-orange-100",
      text: "text-orange-600",
    },

    {
      title: "Pending",
      value: studentStatsData.pending,

      icon: AlertCircle,

      bg: "bg-rose-100",
      text: "text-rose-600",
    },

    {
      title: "Completed",
      value: studentStatsData.completed,

      icon: CheckCircle2,

      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },

    {
      title: "Upcoming",
      value: studentStatsData.upcoming,

      icon: Clock3,

      bg: "bg-sky-100",
      text: "text-sky-600",
    },
  ];

  const teacherStats = [
    {
      title: "Assignments",
      value: teacherStatsData.assignments,

      icon: BookOpen,

      bg: "bg-orange-100",
      text: "text-orange-600",
    },

    {
      title: "Submissions",
      value: teacherStatsData.submissions, 

      icon: FileCheck2,

      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },

    {
      title: "Questions",
      value: teacherStatsData.questions,

      icon:
        MessageCircleQuestion,

      bg: "bg-violet-100",
      text: "text-violet-600",
    },

    {
      title: "Students",
      value: teacherStatsData.students,

      icon: Users,

      bg: "bg-sky-100",
      text: "text-sky-600",
    },
  ];

  const stats =
    role === "student"
      ? studentStats
      : teacherStats;
const approveSubmission = async (submissionId) => {

  try {

    await api.put(
      `/teacher/assignment-submissions/${submissionId}/approve`
    );

    alert("Submission Approved");

    fetchSubmissions(
      selectedAssignment.id
    );

  } catch (error) {

    console.log(error);

  }

};
const rejectSubmission = async (submissionId) => {

  try {

    await api.put(
      `/teacher/assignment-submissions/${submissionId}/reject`
    );

    alert("Submission Rejected");

    fetchSubmissions(
      selectedAssignment.id
    );

  } catch (error) {

    console.log(error);

  }

};
  return (
    <div
      className="
        min-h-screen
        w-full

        bg-gradient-to-br
        from-[#f8fafc]
        via-[#f9fafb]
        to-[#eef2ff]

        px-6
        py-7
      "
    >
      {/* Container */}

      <div
        className="
          max-w-[1600px]
          mx-auto
        "
      >
        {/* ================= HEADER ================= */}

        <div className="mb-10">
          {/* Label */}

          <div
            className="
              inline-flex
              items-center
              gap-2

              px-4
              py-2

              rounded-full

              bg-white/70
              backdrop-blur-xl

              border
              border-white/80
            "
          >
            <div
              className="
                w-2
                h-2

                rounded-full

                bg-orange-500
              "
            />

            <span
              className="
                text-sm
                font-medium

                text-slate-600
              "
            >
              {role === "student"
                ? "Assignment Workspace"
                : "Teacher Assignment Panel"}
            </span>
          </div>

          {/* Title */}

          <h1
            className="
              mt-5

              text-5xl
              font-bold
              tracking-tight

              text-slate-800
            "
          >
            {role === "student"
              ? "Assignments"
              : "Assignment Management"}
          </h1>

          {/* Subtitle */}

          <p
            className="
              mt-3

              max-w-2xl

              text-lg
              text-slate-500
            "
          >
            {role === "student"
              ? "Track assignment deadlines and submissions course-wise."
              : "Review submissions, answer doubts, and manage assignments for each course."}
          </p>
        </div>

        {/* ================= STATS ================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4

            gap-5
            mb-10
          "
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.05,
                }}
                whileHover={{
                  y: -3,
                }}
                className="
                  rounded-[26px]

                  border
                  border-white/80

                  bg-white/75
                  backdrop-blur-2xl

                  shadow-[0_10px_35px_rgba(15,23,42,0.05)]

                  p-5
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div>
                    <p
                      className="
                        text-sm
                        font-medium

                        text-slate-500
                      "
                    >
                      {item.title}
                    </p>

                    <h2
                      className="
                        mt-2

                        text-3xl
                        font-bold

                        text-slate-800
                      "
                    >
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className={`
                      w-14
                      h-14

                      rounded-2xl

                      flex
                      items-center
                      justify-center

                      ${item.bg}
                      ${item.text}
                    `}
                  >
                    <Icon size={24} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= ASSIGNMENT TABLE ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            overflow-hidden

            rounded-[30px]

            border
            border-white/80

            bg-white/75
            backdrop-blur-2xl

            shadow-[0_10px_35px_rgba(15,23,42,0.05)]
          "
        >
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between

              px-6
              py-5

              border-b
              border-slate-100
            "
          >
            <div>
              <h2
                className="
                  text-2xl
                  font-bold

                  text-slate-800
                "
              >
                Course Assignments
              </h2>

              <p
                className="
                  text-slate-500
                  mt-1
                "
              >
                Tailored assignments
                based on enrolled
                courses
              </p>
            </div>

            {role === "teacher" && (

<button
  onClick={() =>
    setShowModal(true)
  }

  className="
    px-5
    py-2.5
    rounded-2xl
    bg-slate-900
    hover:bg-black
    text-white
    text-sm
    font-semibold
  "
>
  Create Assignment
</button>

)}
          </div>

          {/* TABLE HEADER */}

         <div
  className={`
    hidden
    xl:grid

    ${
      role === "teacher"
        ? "xl:grid-cols-[2fr_1.3fr_1.5fr_1.2fr_1.5fr_1fr_1fr]"
        : "xl:grid-cols-[2fr_1.3fr_1.5fr_1.2fr_1.5fr_1fr]"
    }

    gap-4
    px-6
    py-4
    bg-slate-50/70

    border-b
    border-slate-100

    text-sm
    font-semibold
    text-slate-500
  `}
>
  <p>Assignment</p>

  <p>Course</p>

  <p>Due Date</p>

  {role === "student" && (
    <p>Status</p>
)}

  <p>Progress</p>

  {role === "teacher" && (
    <p>Submissions</p>
  )}

  <p>Action</p>
</div>

          {/* ROWS */}

          <div className="divide-y divide-slate-100">
            {assignments.map(
              (assignment, index) => (
                <motion.div
                  key={assignment.id}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.05,
                  }}
                  whileHover={{
                    backgroundColor:
                      "rgba(248,250,252,0.7)",
                  }}
                 className={`
                   grid
                   ${
                    role === "teacher"
                    ? "xl:grid-cols-[2fr_1.3fr_1.5fr_1.2fr_1.5fr_1fr_1fr]"
                    : "xl:grid-cols-[2fr_1.3fr_1.5fr_1.2fr_1.5fr_1fr]"
                    }
                   
                   grid-cols-1
                   
                   gap-4
                   
                   px-6
                   py-5
                   
                   items-center
                   
                   transition-all
                   duration-200
                   `}
                >
                  {/* Assignment */}

                  <div className="flex items-center">
                    <h3
                      className="
                        font-semibold
                        text-slate-800
                      "
                    >
                      {assignment.title}
                    </h3>
                  </div>

                  {/* Course */}

                  <div
                    className="
                    flex
                    items-center
                    
                    text-slate-500
                    font-medium
                    "
                    >
                    {assignment.course}
                  </div>

                  {/* Due Date */}

                  <div
                    className="
                      flex
                      items-center
                      gap-1

                      text-slate-500
                    "
                  >
                    <CalendarDays
                      size={16}
                    />

                    <span>
                      {
                        assignment.dueDate
                      }
                    </span>
                  </div>

                  {/* Status */}

                 {role === "student" && (

                   <div className="flex items-center">
                   
                   <span
                   className={`
                   ...
                   `}
                   >
                   {assignment.status}
                   </span>
                   
                   </div>
                   
                   )}

                  {/* Progress */}

                  <div className="w-full">
                    <div
                      className="
                        w-full
                        h-2

                        rounded-full

                        bg-slate-100
                        overflow-hidden
                      "
                    >
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: `${assignment.progress}%`,
                        }}
                        transition={{
                          duration: 0.7,
                        }}
                        className="
                          h-full

                          rounded-full

                          bg-gradient-to-r
                          from-[#ff6b3d]
                          to-[#ffb347]
                        "
                      />
                    </div>

                    <p
                      className="
                        text-xs
                        mt-2

                        text-slate-500
                      "
                    >
                      {
                        assignment.progress
                      }
                      %
                    </p>
                  </div>

                  {/* Teacher Extra */}
{role === "teacher" && (
  <div
    className="
      flex
      items-center

      text-slate-600
      font-medium
    "
  >
    {assignment.submissions}
  </div>
)}

                  {/* Action */}

                  <div className="flex justify-start">
                  <button
  onClick={() => {

    setSelectedAssignment(
      assignment
    );

    if (role === "student") {

      setShowUploadModal(true);

    } else {
      fetchSubmissions(
        assignment.id
      );

      setShowReviewModal(true);

    }

  }}

  className="
    px-5
    py-2.5
    rounded-2xl
    bg-slate-900
    hover:bg-black
    text-white
    text-sm
    font-medium
    transition-all
  "
>
  {role === "student"
    ? "Open"
    : "Review"}
</button>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        

      {showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl w-[500px]">

      <h2 className="text-2xl font-bold mb-5">
        Create Assignment
      </h2>

      <input
        type="text"
        placeholder="Assignment Title"
        value={assignmentForm.title}
        onChange={(e) =>
          setAssignmentForm({
            ...assignmentForm,
            title: e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl mb-4"
      />

      <input
        type="text"
        placeholder="Course"
        value={assignmentForm.course}
        onChange={(e) =>
          setAssignmentForm({
            ...assignmentForm,
            course: e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl mb-4"
      />

      <input
        type="date"
        value={assignmentForm.due_date}
        onChange={(e) =>
          setAssignmentForm({
            ...assignmentForm,
            due_date: e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl mb-4"
      />

      <div className="flex gap-3 justify-end">

        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 border rounded-xl"
        >
          Cancel
        </button>

        <button
          onClick={createAssignment}
          className="px-4 py-2 bg-black text-white rounded-xl"
        >
          Save Assignment
        </button>

      </div>

    </div>
  </div>
)} 


{showReviewModal && selectedAssignment && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

    <div className="bg-white p-6 rounded-2xl w-[900px]">

      <h2 className="text-2xl font-bold mb-6">
        Assignment Submissions
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-200 rounded-xl">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-3">
                Student ID
              </th>

              <th className="border p-3">
                Name
              </th>

              <th className="border p-3">
                Email
              </th>

              <th className="border p-3">
                File
              </th>

              <th className="border p-3">
                Status
              </th>

              <th className="border p-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {submissions.length > 0 ? (

              submissions.map(
                (submission) => (

                  <tr
                    key={submission.id}
                    className="text-center"
                  >

                    <td className="border p-3">
                      {submission.student.id}
                    </td>

                    <td className="border p-3">
                      {submission.student.name}
                    </td>

                    <td className="border p-3">
                      {submission.student.email}
                    </td>

                    <td className="border p-3">

                      <a
                        href={`http://127.0.0.1:8000/storage/${submission.file}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View / Download
                      </a>

                    </td>

                    <td className="border p-3">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          submission.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : submission.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {submission.status}
                      </span>

                    </td>

                    <td className="border p-3">

                      <div className="flex justify-center gap-2">

                        <button
                    onClick={() =>
                    approveSubmission(
                    submission.id
                    )
                    }
                    className="bg-green-600 text-white px-3 py-2 rounded-xl hover:bg-green-700"
                    >
                    Approve
                    </button>

                        <button
                    onClick={() =>
                    rejectSubmission(
                    submission.id
                    )
                    }
                    className="bg-red-600 text-white px-3 py-2 rounded-xl hover:bg-red-700"
                    >
                    Reject
                    </button>

                      </div>

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500"
                >
                  No submissions found for this assignment.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      <div className="flex justify-end mt-6">

        <button
          onClick={() =>
            setShowReviewModal(false)
          }
          className="border px-5 py-2 rounded-xl hover:bg-gray-100"
        >
          Close
        </button>

      </div>

    </div>

  </div>
)}

{showUploadModal &&
 selectedAssignment && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

  <div className="bg-white p-6 rounded-2xl w-[500px]">

    <h2 className="text-2xl font-bold mb-4">
      Upload Assignment
    </h2>

    <p>
      {selectedAssignment.title}
    </p>
    <input
  type="file"
  onChange={(e) => {
    console.log("INPUT CHANGED");

    const file = e.target.files[0];

    console.log("Picked File:", file);

    setSelectedFile(file);
  }}
  style={{
    display: "block",
    border: "1px solid black",
    padding: "10px",
    marginTop: "20px"
  }}
/>
    <p className="mt-3">
       Selected File:
       {selectedFile
        ? selectedFile.name
        : "No file selected"}
     </p>
     
    <div className="flex gap-3 mt-5">
      {/* <p>Current selectedFile: {selectedFile?.name}</p> */}

      <button
        onClick={uploadAssignment}
        className="bg-black text-white px-4 py-2 rounded-xl"
      >
        Upload
      </button>

      <button
        onClick={() =>
          setShowUploadModal(false)
        }
        className="border px-4 py-2 rounded-xl"
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