import CourseBasics from "./courses/CourseBasics";
import CourseContent from "./courses/CourseContent";
import CourseMentor from "./courses/CourseMentor";
import CoursePublish from "./courses/CoursePublish";

export default function CourseEditModal({
  activeTab,
  setActiveTab,
  tabs,
  formData,
  setFormData,
  handleSubmit,
  showCreator,
}) {

  if (!showCreator)
    return null;

  return (
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
          formData={formData}
          setFormData={
            setFormData
          }
        />
      )}

      {activeTab ===
        "content" && (

        <CourseContent
          formData={formData}
          setFormData={
            setFormData
          }
        />
      )}

      {activeTab ===
        "mentor" && (

        <CourseMentor
          formData={formData}
          setFormData={
            setFormData
          }
        />
      )}

      {activeTab ===
        "publish" && (

        <CoursePublish
          formData={formData}
          setFormData={
            setFormData
          }
          handleSubmit={
            handleSubmit
          }
        />
      )}

    </div>
  );
}