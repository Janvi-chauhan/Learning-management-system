import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

export default function LessonNavigation({
  previousLesson,
  nextLesson,
  onPrevious,
  onNext,
  onComplete,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Previous Button */}

        <button
          onClick={onPrevious}
          disabled={!previousLesson}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition font-medium
          ${
            previousLesson
              ? "border border-gray-300 hover:bg-gray-100 text-gray-700"
              : "border border-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <ArrowLeft size={18} />

          Previous Lesson
        </button>

        {/* Complete Button */}

        <button
          onClick={onComplete}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          <CheckCircle size={20} />

          Mark as Complete
        </button>

        {/* Next Button */}

        <button
          onClick={onNext}
          disabled={!nextLesson}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition font-medium
          ${
            nextLesson
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next Lesson

          <ArrowRight size={18} />
        </button>

      </div>

      {/* Lesson Info */}

      <div className="mt-6 border-t pt-5">

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <p className="text-sm text-gray-500">
              Previous Lesson
            </p>

            <h4 className="font-semibold text-gray-700 mt-1">
              {previousLesson
                ? previousLesson.title
                : "This is the first lesson"}
            </h4>

          </div>

          <div className="text-left md:text-right">

            <p className="text-sm text-gray-500">
              Next Lesson
            </p>

            <h4 className="font-semibold text-gray-700 mt-1">
              {nextLesson
                ? nextLesson.title
                : "Course Completed 🎉"}
            </h4>

          </div>

        </div>

      </div>

    </div>
  );
}