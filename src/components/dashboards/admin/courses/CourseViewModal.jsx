import { X } from "lucide-react";

export default function CourseViewModal({
  selectedCourse,
  setShowViewModal,
}) {

  if (!selectedCourse)
    return null;

  return (
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

          {/* CLOSE */}

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
              bg-white/90
              hover:bg-white
              flex items-center justify-center
            "
          >
            <X size={18} />
          </button>

        </div>

        {/* CONTENT */}

        <div className="p-6">

          <div className="flex items-start justify-between gap-5">

            <div>

              <h2 className="text-3xl font-black">
                {
                  selectedCourse.title
                }
              </h2>

              <p className="text-gray-500 mt-2">
                {
                  selectedCourse.category
                }
              </p>

            </div>

            <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              {
                selectedCourse.level
              }
            </span>

          </div>

          {/* INFO */}

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
                Students
              </p>

              <h3 className="font-bold mt-1">
                {
                  selectedCourse.students
                }
              </h3>

            </div>

          </div>

          {/* STATUS */}

          <div className="mt-6">

            <span
              className={`
                px-4 py-2 rounded-full text-sm font-semibold

                ${
                  selectedCourse.status ===
                  "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }
              `}
            >
              {
                selectedCourse.status
              }
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}