import { useState } from "react";

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

// ======================================================
// INITIAL FORM
// ======================================================

const initialForm = {
  // BASIC
  title: "",
  slug: "",
  category: "",
  duration: "",
  level: "",
  language: "",
  thumbnail: "",
  previewVideo: "",
  brochure: "",

  // CONTENT
  learnings: [""],

  roadmap: [
    {
      title: "",
      desc: "",
    },
  ],

  curriculum: [""],

  // MENTOR
  mentorName: "",
  mentorExperience: "",
  mentorImage: "",

  reviews: [
    {
      student: "",
      comment: "",
    },
  ],

  // PUBLISH
  status: "Active",
  featured: false,
  latest: true,
};

// ======================================================
// SAMPLE DATA
// ======================================================

const sampleCourses = [
  {
    id: 1,

    title: "DSA with Python",

    category: "DSA",

    duration: "6 Months",

    level: "Intermediate",

    students: "1200+",

    status: "Active",

    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 2,

    title: "MERN Stack",

    category:
      "Web Development",

    duration: "8 Months",

    level: "Advanced",

    students: "1800+",

    status: "Active",

    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  },
];

// ======================================================
// COMPONENT
// ======================================================

export default function CourseManager() {

  // ======================================================
  // STATES
  // ======================================================

  const [showCreator, setShowCreator] =
    useState(false);

  const [showViewModal, setShowViewModal] =
    useState(false);

  const [selectedCourse, setSelectedCourse] =
    useState(null);

  const [editMode, setEditMode] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const [activeTab, setActiveTab] =
    useState("basics");

  const [formData, setFormData] =
    useState(initialForm);

  const [courses, setCourses] =
    useState(sampleCourses);

  // ======================================================
  // TABS
  // ======================================================

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
      label:
        "Mentor & Reviews",
    },

    {
      id: "publish",
      label: "Publish",
    },
  ];

  // ======================================================
  // CREATE / UPDATE
  // ======================================================

  const handleSubmit = () => {

    if (editMode) {

      const updatedCourses =
        courses.map((course) =>
          course.id === editId
            ? {
                ...course,
                ...formData,
              }
            : course
        );

      setCourses(updatedCourses);

      alert(
        "Course Updated"
      );

    } else {

      const newCourse = {
        id: Date.now(),

        ...formData,

        students: "0",
      };

      setCourses([
        newCourse,
        ...courses,
      ]);

      alert(
        "Course Created Successfully"
      );
    }

    setFormData(initialForm);

    setEditMode(false);

    setEditId(null);

    setShowCreator(false);

    setActiveTab("basics");
  };

  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this course?"
      );

    if (!confirmDelete)
      return;

    const updated =
      courses.filter(
        (course) =>
          course.id !== id
      );

    setCourses(updated);
  };

  // ======================================================
  // EDIT
  // ======================================================

  const handleEdit = (
    course
  ) => {

    setEditMode(true);

    setEditId(course.id);

    setFormData(course);

    setShowCreator(true);

    setActiveTab(
      "basics"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ======================================================
  // VIEW
  // ======================================================

  const handleView = (
    course
  ) => {

    setSelectedCourse(
      course
    );

    setShowViewModal(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-6">

      <div className="max-w-7xl mx-auto">

        {/* ======================================================
        HEADER
        ====================================================== */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

          <div>

            <h1 className="text-4xl font-black">
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
              flex items-center gap-2
              bg-red-600 hover:bg-red-700
              text-white
              px-6 py-4
              rounded-2xl
              font-semibold
              shadow-lg
              transition
            "
          >
            <Plus size={20} />

            {showCreator
              ? "Close Creator"
              : "Create Course"}
          </button>

        </div>

        {/* ======================================================
        CREATOR
        ====================================================== */}

        {showCreator && (

          <div className="bg-white border rounded-3xl shadow-sm p-5 md:p-8 mb-10">

            {/* TABS */}

            <div className="flex flex-wrap gap-3 mb-8">

              {tabs.map((tab) => (

                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(
                      tab.id
                    )
                  }
                  className={`px-5 py-3 rounded-2xl font-semibold transition ${
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
                formData={
                  formData
                }
                setFormData={
                  setFormData
                }
              />
            )}

            {activeTab ===
              "content" && (

              <CourseContent
                formData={
                  formData
                }
                setFormData={
                  setFormData
                }
              />
            )}

            {activeTab ===
              "mentor" && (

              <CourseMentor
                formData={
                  formData
                }
                setFormData={
                  setFormData
                }
              />
            )}

            {activeTab ===
              "publish" && (

              <CoursePublish
                formData={
                  formData
                }
                setFormData={
                  setFormData
                }
                handleSubmit={
                  handleSubmit
                }
              />
            )}

          </div>
        )}

        {/* ======================================================
        DESKTOP TABLE
        ====================================================== */}

        <div className="hidden md:block bg-white border rounded-3xl shadow-sm overflow-hidden">

          <div className="w-full overflow-x-auto">

            <table className="w-full min-w-[950px]">

              <thead className="bg-gray-50 border-b">

                <tr>

                  <th className="text-left px-4 xl:px-6 py-4 font-bold text-sm">
                    Course
                  </th>

                  <th className="text-left px-4 xl:px-6 py-4 font-bold text-sm">
                    Category
                  </th>

                  <th className="text-left px-4 xl:px-6 py-4 font-bold text-sm">
                    Duration
                  </th>

                  <th className="text-left px-4 xl:px-6 py-4 font-bold text-sm">
                    Level
                  </th>

                  <th className="text-left px-4 xl:px-6 py-4 font-bold text-sm">
                    Students
                  </th>

                  <th className="text-left px-4 xl:px-6 py-4 font-bold text-sm">
                    Status
                  </th>

                  <th className="text-left px-4 xl:px-6 py-4 font-bold text-sm">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {courses.map(
                  (course) => (

                    <tr
                      key={course.id}
                      className="border-b hover:bg-gray-50 transition"
                    >

                      {/* COURSE */}

                      <td className="px-4 xl:px-6 py-4 text-sm">

                        <div className="flex items-center gap-3">

                          <img
                            src={
                              course.thumbnail
                            }
                            alt={
                              course.title
                            }
                            className="
                              w-12 h-12
                              xl:w-16 xl:h-16
                              rounded-2xl
                              object-cover
                            "
                          />

                          <div className="min-w-0">

                            <h3 className="font-bold text-sm xl:text-base truncate max-w-[180px] xl:max-w-[250px]">
                              {
                                course.title
                              }
                            </h3>

                            <p className="text-xs text-gray-500 mt-1">
                              Course
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td className="px-4 xl:px-6 py-4 text-sm">
                        <div className="truncate max-w-[120px] xl:max-w-[180px]">
                          {
                            course.category
                          }
                        </div>
                      </td>

                      {/* DURATION */}

                      <td className="px-4 xl:px-6 py-4 text-sm whitespace-nowrap">
                        {
                          course.duration
                        }
                      </td>

                      {/* LEVEL */}

                      <td className="px-4 xl:px-6 py-4 text-sm">

                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                          {
                            course.level
                          }
                        </span>

                      </td>

                      {/* STUDENTS */}

                      <td className="px-4 xl:px-6 py-4 text-sm whitespace-nowrap">
                        {
                          course.students
                        }
                      </td>

                      {/* STATUS */}

                      <td className="px-4 xl:px-6 py-4 text-sm">

                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                          {
                            course.status
                          }
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-4 xl:px-6 py-4">

                        <div className="flex gap-2">

                          {/* VIEW */}

                          <button
                            onClick={() =>
                              handleView(
                                course
                              )
                            }
                            className="
                              w-9 h-9
                              rounded-xl
                              bg-gray-100
                              hover:bg-gray-200
                              flex items-center justify-center
                              transition
                            "
                          >
                            <Eye
                              size={17}
                            />
                          </button>

                          {/* EDIT */}

                          <button
                            onClick={() =>
                              handleEdit(
                                course
                              )
                            }
                            className="
                              w-9 h-9
                              rounded-xl
                              bg-red-100
                              text-red-600
                              hover:bg-red-200
                              flex items-center justify-center
                              transition
                            "
                          >
                            <Pencil
                              size={17}
                            />
                          </button>

                          {/* DELETE */}

                          <button
                            onClick={() =>
                              handleDelete(
                                course.id
                              )
                            }
                            className="
                              w-9 h-9
                              rounded-xl
                              bg-black
                              text-white
                              hover:bg-gray-800
                              flex items-center justify-center
                              transition
                            "
                          >
                            <Trash2
                              size={17}
                            />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* ======================================================
        MOBILE CARDS
        ====================================================== */}

        <div className="grid grid-cols-1 gap-5 md:hidden">

          {courses.map(
            (course) => (

              <div
                key={course.id}
                className="bg-white border rounded-3xl overflow-hidden shadow-sm"
              >

                {/* IMAGE */}

                <div className="h-[220px] overflow-hidden">

                  <img
                    src={
                      course.thumbnail
                    }
                    alt={
                      course.title
                    }
                    className="w-full h-full object-cover"
                  />

                </div>

                {/* CONTENT */}

                <div className="p-5">

                  <div className="flex items-start justify-between mb-4">

                    <div className="min-w-0">

                      <h2 className="text-2xl font-black truncate">
                        {
                          course.title
                        }
                      </h2>

                      <p className="text-gray-500 mt-1 text-sm">
                        {
                          course.category
                        }
                      </p>

                    </div>

                    <BookOpen
                      className="text-red-600"
                      size={22}
                    />

                  </div>

                  {/* INFO */}

                  <div className="space-y-3 text-sm">

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Duration
                      </span>

                      <span className="font-semibold">
                        {
                          course.duration
                        }
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Level
                      </span>

                      <span className="font-semibold text-red-600">
                        {
                          course.level
                        }
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Students
                      </span>

                      <span className="font-semibold">
                        {
                          course.students
                        }
                      </span>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="grid grid-cols-3 gap-3 mt-6">

                    <button
                      onClick={() =>
                        handleView(
                          course
                        )
                      }
                      className="bg-gray-100 hover:bg-gray-200 py-3 rounded-2xl font-semibold transition text-sm"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        handleEdit(
                          course
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-semibold transition text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          course.id
                        )
                      }
                      className="bg-black hover:bg-gray-800 text-white py-3 rounded-2xl font-semibold transition text-sm"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

        {/* ======================================================
        VIEW MODAL
        ====================================================== */}

        {showViewModal &&
          selectedCourse && (

          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

            <div className="bg-white rounded-3xl overflow-hidden w-full max-w-2xl shadow-2xl">

              {/* IMAGE */}

              <div className="h-[260px] overflow-hidden relative">

                <img
                  src={
                    selectedCourse.thumbnail
                  }
                  alt={
                    selectedCourse.title
                  }
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={() =>
                    setShowViewModal(false)
                  }
                  className="
                    absolute top-5 right-5
                    w-10 h-10
                    rounded-xl
                    bg-white/90
                    hover:bg-white
                    flex items-center justify-center
                  "
                >
                  <X
                    size={18}
                  />
                </button>

              </div>

              {/* CONTENT */}

              <div className="p-6">

                <h2 className="text-3xl font-black">
                  {
                    selectedCourse.title
                  }
                </h2>

                <p className="text-gray-500 mt-3">
                  {
                    selectedCourse.category
                  }
                </p>

                <div className="grid grid-cols-2 gap-5 mt-8">

                  <div className="border rounded-2xl p-4">

                    <p className="text-gray-500 text-sm">
                      Duration
                    </p>

                    <h3 className="font-bold mt-1">
                      {
                        selectedCourse.duration
                      }
                    </h3>

                  </div>

                  <div className="border rounded-2xl p-4">

                    <p className="text-gray-500 text-sm">
                      Level
                    </p>

                    <h3 className="font-bold mt-1 text-red-600">
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