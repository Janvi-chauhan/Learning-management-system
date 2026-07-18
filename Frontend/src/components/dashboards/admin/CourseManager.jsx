import { useState, useEffect } from "react";
import api from "../../../services/api.js";

import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  BookOpen,
  X,
} from "lucide-react";

import CourseBasics from "./courses/CourseBasics";
import CourseContent from "./courses/CourseContent";
import CourseMentor from "./courses/CourseMentor";
import CoursePublish from "./courses/CoursePublish";


const initialForm = {
  title: "",
  description:"",
  slug: "",
  category: "",
  duration: "",
  level: "",
  language: "",
  thumbnail: "",
  previewVideo: "",
  brochure: "",

  learnings: [""],

  roadmap: [
    {
      title: "",
      desc: "",
    },
  ],

  curriculum: [""],

   modules: [
    {
      title: "",
      lessons: [
        {
          title: "",
          duration: "",
          video: "",
          description: "",
        },
      ],
    },
  ],

  mentorName: "",
  mentorExperience: "",
  mentorImage: "",

  

  projects: [
  {
    title: "",
    description: "",
  },
],

certifications: [
  {
    title: "",
    image: "",
  },
],

  status: "Active",
  //progress: 0,

  estimatedTime: "",

  certificate: true,
  featured: false,
  latest: true,
};

export default function CourseManager() {
 
  const [showCreator, setShowCreator] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState("basics");
  const [formData, setFormData] = useState(initialForm);
  const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
  try {
    const response =
      await api.get(
        "/admin/courses"
      );
console.log(response.data);

    setCourses(
      response.data.data
    );
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchCourses();
}, []);

  // TABS
  const tabs = [
    {
      id: "basics",
      label: "Basics",
    },

    {
      id: "content",
      label: "Content",
    },

    {
      id: "mentor",
      label: "Mentor & Reviews",
    },

    {
      id: "publish",
      label: "Publish",
    },
  ];

  const goToNextTab = () => {
  const currentIndex = tabs.findIndex(
    (tab) => tab.id === activeTab
  );

  if (currentIndex < tabs.length - 1) {
    setActiveTab(tabs[currentIndex + 1].id);
  }
};

const goToPreviousTab = () => {
  const currentIndex = tabs.findIndex(
    (tab) => tab.id === activeTab
  );

  if (currentIndex > 0) {
    setActiveTab(tabs[currentIndex - 1].id);
  }
};

  // CREATE / UPDATE
  
  const handleSubmit = async () => {
  try {
    const payload = {
      title: formData.title,
      description: formData.description,
      slug: formData.slug,
      category:
        formData.category,
      duration:
        formData.duration,
      level:
        formData.level,
      language:
        formData.language,

      thumbnail:
        formData.thumbnail,

      preview_video:
        formData.previewVideo,

      brochure:
        formData.brochure,

      learnings: (formData.learnings || []).filter(
  item => item && item.trim() !== ""
),
roadmap: (formData.roadmap || []).filter(
  step => step.title.trim() !== ""
),

     curriculum: (formData.curriculum || []).filter(
  item => item && item.trim() !== ""
),

     modules: (formData.modules || [])
  .filter(module => module.title.trim() !== "")
  .map(module => ({
    ...module,
    lessons: (module.lessons || []).filter(
      lesson => lesson.title.trim() !== ""
    ),
  })),
      mentor_name:
        formData.mentorName,

      mentor_experience:
        formData.mentorExperience,

      mentor_image:
        formData.mentorImage,

      reviews:
        formData.reviews,

      projects: formData.projects,
      certifications: formData.certifications,

      status:
        formData.status,
        //progress: formData.progress,

      estimated_time: formData.estimatedTime,
      
      certificate: formData.certificate,

      featured:
        formData.featured,

      latest:
        formData.latest,
      
    };

    if (editMode) {
      console.log(JSON.stringify(formData, null, 2));
      await api.put(
        `/admin/courses/${editId}`,
        payload
      );

      alert(
        "Course Updated Successfully"
      );
    } else {
      await api.post(
        "/admin/courses",
        payload
      );

      alert(
        "Course Created Successfully"
      );
    }

    fetchCourses();

    setFormData(
      initialForm
    );

    setEditMode(false);

    setEditId(null);

    setShowCreator(false);

    setActiveTab(
      "basics"
    );
  } catch (error) {
    console.log(error);

    console.log(
      error.response?.data
    );
  }
};
  // DELETE

  const handleDelete = async (
  id
) => {
  const confirmDelete =
    window.confirm(
      "Delete this course?"
    );

  if (!confirmDelete)
    return;

  try {
    await api.delete(
      `/admin/courses/${id}`
    );

    fetchCourses();

    alert(
      "Course Deleted Successfully"
    );
  } catch (error) {
    console.log(error);
  }
};

  // EDIT

  const handleEdit = async (course) => {

  try {

    const response = await api.get(
      `/admin/courses/${course.id}`
    );

    const fullCourse = response.data.data;

    setEditMode(true);

    setEditId(fullCourse.id);

    setFormData({

      ...fullCourse,

      previewVideo:
        fullCourse.preview_video || "",

      mentorName:
        fullCourse.mentor_name || "",

      mentorExperience:
        fullCourse.mentor_experience || "",

      mentorImage:
        fullCourse.mentor_image || "",

      learnings:
        fullCourse.learnings || [""],

      roadmap:
        fullCourse.roadmap || [
          {
            title: "",
            desc: "",
          },
        ],

      curriculum:
        fullCourse.curriculum || [""],

      progress:
        fullCourse.progress ?? 0,

      estimatedTime:
        fullCourse.estimated_time || "",

      certificate:
        fullCourse.certificate ?? true,

      modules:
        fullCourse.modules || [
          {
            title: "",
            lessons: [
              {
                title: "",
                duration: "",
                video: "",
                description: "",
              },
            ],
          },
        ],

      projects:
        fullCourse.projects || [
          {
            title: "",
            description: "",
          },
        ],

      certifications:
        fullCourse.certifications || [
          {
            title: "",
            image: "",
          },
        ],

    });

    setShowCreator(true);

    setActiveTab("basics");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  } catch (error) {

    console.log(error);

  }

};

  // VIEW

  const handleView = (course) => {
    setSelectedCourse(course);

    setShowViewModal(true);
  };

  // RETURN


  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
       
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
              Course Manager
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all your courses professionally
            </p>
          </div>

          <button
            onClick={() => {
              setShowCreator(
                !showCreator
              );

              setEditMode(false);

              setEditId(null);

              setFormData(
                initialForm
              );
            }}
            className="
              flex items-center justify-center gap-2
              bg-red-600 hover:bg-red-700
              text-white
              px-6 py-3.5
              rounded-2xl
              font-semibold
              shadow-lg
              transition-all
            "
          >
            <Plus size={20} />

            {showCreator
              ? "Close Creator"
              : "Create Course"}
          </button>
        </div>

        {showCreator && (
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-4 sm:p-6 md:p-8 mb-10">
            {/* TABS */}

            <div className="flex flex-wrap gap-3 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(tab.id)
                  }
                  className={`px-4 sm:px-5 py-3 rounded-2xl font-semibold transition text-sm sm:text-base ${
                    activeTab ===
                    tab.id
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-gray-50 border hover:border-red-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* CONTENT */}

            {activeTab ===
              "basics" && (
             <CourseBasics
               formData={formData}
               setFormData={setFormData}
               goToNextTab={goToNextTab}
/>
            )}

            {activeTab ===
              "content" && (
             <CourseContent
              formData={formData}
              setFormData={setFormData}
              goToNextTab={goToNextTab}
              goToPreviousTab={goToPreviousTab}
/>
            )}

            {activeTab ===
              "mentor" && (
              <CourseMentor
               formData={formData}
               setFormData={setFormData}
               goToNextTab={goToNextTab}
               goToPreviousTab={goToPreviousTab}
/>
            )}

            {activeTab ===
              "publish" && (
              <CoursePublish
               formData={formData}
               setFormData={setFormData}
               handleSubmit={handleSubmit}
               goToPreviousTab={goToPreviousTab}
/>
            )}
          </div>
        )}

        {!showCreator && (
  <>
    {/* ======================================================
    DESKTOP TABLE
    ====================================================== */}
    <div className="hidden lg:block">
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gradient-to-r from-red-600 to-red-500 text-white">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-bold">
                  Course
                </th>
                <th className="text-left px-6 py-4 text-sm font-bold">
                  Category
                </th>
                <th className="text-left px-6 py-4 text-sm font-bold">
                  Duration
                </th>
                <th className="text-left px-6 py-4 text-sm font-bold">
                  Level
                </th>
                <th className="text-left px-6 py-4 text-sm font-bold">
                  Students
                </th>
                <th className="text-left px-6 py-4 text-sm font-bold">
                  Status
                </th>
                <th className="text-center px-6 py-4 text-sm font-bold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-800 truncate max-w-[220px]">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Course
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-gray-700">
                    {course.category}
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-700 whitespace-nowrap">
                    {course.duration}
                  </td>

                  <td className="px-6 py-5">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                      {course.level}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-sm font-semibold text-gray-700">
                    {course.students}
                  </td>

                  <td className="px-6 py-5">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                      {course.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleView(course)}
                        className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center justify-center transition"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => handleEdit(course)}
                        className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-700 hover:bg-yellow-200 flex items-center justify-center transition"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(course.id)}
                        className="w-10 h-10 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* ======================================================
    MOBILE / TABLET CARDS
    ====================================================== */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition"
        >
          <div className="relative w-full h-[220px] sm:h-[240px] bg-gray-100 overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover object-center transition duration-500 hover:scale-105"
            />
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-black text-gray-800 truncate">
                  {course.title}
                </h2>
                <p className="text-gray-500 mt-1 text-sm">
                  {course.category}
                </p>
              </div>

              <BookOpen
                className="text-red-600 flex-shrink-0"
                size={22}
              />
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Duration</span>
                <span className="font-semibold text-gray-800">
                  {course.duration}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Level</span>
                <span className="font-semibold text-red-600">
                  {course.level}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Students</span>
                <span className="font-semibold text-gray-800">
                  {course.students ?? 0}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <button
                onClick={() => handleView(course)}
                className="bg-gray-100 hover:bg-gray-200 py-3 rounded-2xl font-semibold text-sm transition"
              >
                View
              </button>

              <button
                onClick={() => handleEdit(course)}
                className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-semibold text-sm transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(course.id)}
                className="bg-black hover:bg-gray-800 text-white py-3 rounded-2xl font-semibold text-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
)}

        {/* ======================================================
        VIEW MODAL
        ====================================================== */}

        {showViewModal &&
          selectedCourse && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl overflow-hidden w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* IMAGE */}

                <div className="relative w-full h-[240px] sm:h-[320px] bg-gray-100 overflow-hidden">
                  <img
                    src={
                      selectedCourse.thumbnail
                    }
                    alt={
                      selectedCourse.title
                    }
                    className="w-full h-full object-cover object-center"
                  />

                  <button
                    onClick={() =>
                      setShowViewModal(
                        false
                      )
                    }
                    className="
                      absolute top-5 right-5
                      w-10 h-10
                      rounded-xl
                      bg-white/90 hover:bg-white
                      flex items-center justify-center
                      transition
                    "
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* CONTENT */}

                <div className="p-5 sm:p-7">
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                    {
                      selectedCourse.title
                    }
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {
                      selectedCourse.category
                    }
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    <div className="border rounded-2xl p-5">
                      <p className="text-gray-500 text-sm">
                        Duration
                      </p>

                      <h3 className="font-bold mt-2 text-lg">
                        {
                          selectedCourse.duration
                        }
                      </h3>
                    </div>

                    <div className="border rounded-2xl p-5">
                      <p className="text-gray-500 text-sm">
                        Level
                      </p>

                      <h3 className="font-bold mt-2 text-lg text-red-600">
                        {
                          selectedCourse.level
                        }
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}