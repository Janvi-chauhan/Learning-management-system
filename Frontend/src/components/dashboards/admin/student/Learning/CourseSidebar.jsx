import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  PlayCircle,
  Lock,
} from "lucide-react";

export default function CourseSidebar({
  modules,
  currentLesson,
  setCurrentLesson,
}) {
  const [openModules, setOpenModules] = useState(
modules.length ? [modules[0].id] : []
);
  const toggleModule = (id) => {
    if (openModules.includes(id)) {
      setOpenModules(openModules.filter((item) => item !== id));
    } else {
      setOpenModules([...openModules, id]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md h-[80vh] overflow-hidden">

      {/* Header */}

      <div className="border-b px-5 py-4">

        <h2 className="text-lg font-bold text-gray-800">
          Course Curriculum
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Select a lesson to continue learning.
        </p>

      </div>

      {/* Curriculum */}

      <div className="overflow-y-auto h-full pb-10">

        {modules.map((module) => (
          <div
            key={module.id}
            className="border-b"
          >
            {/* Module */}

            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition"
            >
              <div className="text-left">

                <h3 className="font-semibold text-gray-700">
                  {module.title}
                </h3>

                <p className="text-xs text-gray-400">
                  {module.lesson_count} Lessons
                </p>

              </div>

              {openModules.includes(module.id) ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>

            {/* Lessons */}

            {openModules.includes(module.id) &&
              module.lessons
               .sort((a, b) => a.position - b.position)
               .map((lesson) => {
               const isCurrent =
               currentLesson?.id === lesson.id;

                const isLocked = lesson.locked;

                return (
                  <button
                    key={lesson.id}
                    disabled={isLocked}
                    onClick={() =>
                      setCurrentLesson(lesson)
                    }
                    className={`w-full flex items-center gap-3 px-6 py-3 text-left transition

                    ${
                      isCurrent
                        ? "bg-indigo-50 border-l-4 border-indigo-600"
                        : "hover:bg-gray-50"
                    }

                    ${
                      isLocked
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                    `}
                  >
                    {/* Icon */}

                    {isLocked ? (
                      <Lock
                        size={18}
                        className="text-gray-400"
                      />
                    ) : lesson.completed ? (
                      <CheckCircle2
                        size={18}
                        className="text-green-600"
                      />
                    ) : (
                      <PlayCircle
                        size={18}
                        className={
                          isCurrent
                            ? "text-indigo-600"
                            : "text-gray-400"
                        }
                      />
                    )}

                    {/* Lesson */}

                    <div className="flex-1">

                      <h4
                        className={`text-sm font-medium

                        ${
                          isCurrent
                            ? "text-indigo-700"
                            : "text-gray-700"
                        }`}
                      >
                        {lesson.title}
                      </h4>

                      <p className="text-xs text-gray-400">
                        {lesson.duration}
                      </p>

                    </div>

                  </button>
                );
              })}
          </div>
        ))}

      </div>
    </div>
  );
}