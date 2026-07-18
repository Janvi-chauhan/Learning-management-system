import { useState,useEffect } from "react";
import api from "../../../../../services/api";
import ResourceList from "./ResourceList";
import {
  FileText,
  BookOpen,
  Download,
  ClipboardList,
  MessageSquare,
} from "lucide-react";

export default function LessonTabs({ lesson }) {
  const [activeTab, setActiveTab] = useState("overview");
  
const [message, setMessage] = useState("");
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <BookOpen size={18} />,
    },
    {
      id: "notes",
      label: "Notes",
      icon: <FileText size={18} />,
    },
    {
      id: "resources",
      label: "Resources",
      icon: <Download size={18} />,
    },
    {
      id: "assignment",
      label: "Assignment",
      icon: <ClipboardList size={18} />,
    },
    {
      id: "discussion",
      label: "Discussion",
      icon: <MessageSquare size={18} />,
    },
  ];
  const resources = lesson.resources || [];
  const postDiscussion = async () => {

  if (!message.trim()) return;

  try {

    await api.post(
      "/student/lesson/discussion",
      {
        lesson_id: lesson.id,
        message,
      }
    );

    alert("Question posted.");

    setMessage("");
    window.location.reload();

  } catch (err) {

    console.log(err);

    alert("Unable to post.");

  }

};

  return (
    <div className="bg-white rounded-xl shadow-md">

      {/* Tabs Header */}

      <div className="flex flex-wrap border-b">

        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-all border-b-2

            ${
              activeTab === tab.id
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-indigo-600"
            }`}
          >
            {tab.icon}

            {tab.label}
          </button>
        ))}

      </div>

      {/* Tab Content */}

      <div className="p-6">

        {activeTab === "overview" && (
          <div>

            <h2 className="text-2xl font-bold mb-4">
              Lesson Overview
            </h2>

           <p className="text-gray-600 leading-8">

    {lesson.overview || lesson.description}

</p>

            <div className="mt-6 grid md:grid-cols-2 gap-4">

              <div className="bg-indigo-50 p-4 rounded-lg">
                ✅ Watch the complete video
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                ✅ Read lesson notes
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                ✅ Download source code
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                ✅ Complete assignment
              </div>

            </div>

          </div>
        )}

        {activeTab === "notes" && (
          <div>

            <h2 className="text-2xl font-bold mb-4">
              Lesson Notes
            </h2>

            <p className="text-gray-600 mb-4">
              Download the PDF notes or read the lesson summary.
            </p>

            <div className="border rounded-lg p-5 bg-gray-50">

              <h3 className="font-semibold">

    {lesson.notes_title}

</h3>

             <p className="text-gray-500 mt-2">

    {lesson.notes_description}

</p>

            {lesson.notes_file && (
   <a
    href={lesson.notes_file}
    target="_blank"
    rel="noreferrer"
    onClick={async () => {

        try{

            await api.post(
                `/lessons/${lesson.id}/notes-preview`
            );

        }catch(err){

            console.log(err);

        }

    }}
    className="inline-block mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
>
    Download Notes
</a>
)}
            </div>

          </div>
        )}

        {activeTab === "resources" && (
    <ResourceList resources={resources} />
)}

        {activeTab === "assignment" && (
          <div>

            <h2 className="text-2xl font-bold mb-4">
              Assignment
            </h2>

            <div className="border rounded-xl p-5 bg-gray-50">

             <h3 className="font-semibold text-lg">

Assignment

</h3>

              <p className="text-gray-600 mt-3">

    {lesson.assignment}

</p>

              {lesson.assignment_file && (
    <a
        href={lesson.assignment_file}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-5 bg-indigo-600 text-white px-6 py-2 rounded-lg"
    >
        Upload Assignment
    </a>
)}

            </div>

          </div>
        )}

        {activeTab === "discussion" && (
          <div>

            <h2 className="text-2xl font-bold mb-4">
              Discussion
            </h2>

           <textarea
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className="w-full border rounded-lg p-4"
    />

           <button
    onClick={postDiscussion}
    className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg">
      Post Question
      </button>
      <div className="mt-8 space-y-4">

    {lesson.discussions?.map((item) => (

        <div
            key={item.id}
            className="border rounded-lg p-4"
        >

            <h4 className="font-semibold">

                {item.student?.user?.name}

            </h4>

            <p className="text-gray-600 mt-2">

                {item.message}

            </p>

        </div>

    ))}

</div>
          </div>
        )}

      </div>

    </div>
  );
}