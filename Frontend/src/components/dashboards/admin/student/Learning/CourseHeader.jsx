import {
  ChevronRight,
  BookOpen,
  Clock,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseHeader({ course }) {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white shadow-sm border-b">

      <div className="max-w-full px-6 py-5">

        {/* Course Title */}

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">

          {/* Left */}

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              {course.title}
            </h1>

            <p className="text-gray-500 mt-2">
              Continue your learning journey and complete this
              course.
            </p>

          </div>

          {/* Right */}

      <button
  onClick={() => {
    const lessons = course.modules.flatMap(
      (module) => module.lessons
    );

    // 1. Resume lesson (student watched but not finished)
    let continueLesson = lessons.find(
      (lesson) =>
        (lesson.watched_seconds || 0) > 0 &&
        !lesson.completed
    );

    // 2. If no partially watched lesson, open first incomplete lesson
    if (!continueLesson) {
      continueLesson = lessons.find(
        (lesson) => !lesson.completed
      );
    }

    // 3. If everything completed, open first lesson
    if (!continueLesson) {
      continueLesson = lessons[0];
    }

    navigate(
      `/student/course/${course.id}?lesson=${continueLesson.id}`
    );

    setTimeout(() => {
      document
        .getElementById("video-player")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  }}
  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
>
  Continue Learning
</button>
        </div>

        {/* Progress Section */}

        <div className="mt-8">

          <div className="flex justify-between text-sm font-medium mb-2">

            <span>Course Progress</span>

            <span>{course.progress || 0}%</span>

          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">

            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${course.progress ||0}%` }}
            />

          </div>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

          {/* Lessons */}

          <div className="bg-gray-50 rounded-xl p-5 flex items-center gap-4">

            <div className="bg-indigo-100 p-3 rounded-full">

              <BookOpen
                size={24}
                className="text-indigo-600"
              />

            </div>

            <div>

              <h4 className="text-sm text-gray-500">
                Total Modules
              </h4>

              <p className="text-xl font-bold">

                {course.modules.length}

              </p>

            </div>

          </div>

          {/* Duration */}

          <div className="bg-gray-50 rounded-xl p-5 flex items-center gap-4">

            <div className="bg-green-100 p-3 rounded-full">

              <Clock
                size={24}
                className="text-green-600"
              />

            </div>

            <div>

              <h4 className="text-sm text-gray-500">
                Estimated Time
              </h4>

              <p className="text-xl font-bold">
               {course.estimated_time}
              </p>

            </div>

          </div>

          {/* Certificate */}

          <div className="bg-gray-50 rounded-xl p-5 flex items-center gap-4">

            <div className="bg-yellow-100 p-3 rounded-full">

              <Award
                size={24}
                className="text-yellow-600"
              />

            </div>

            <div>

              <h4 className="text-sm text-gray-500">
                Certificate
              </h4>

              <p className="text-xl font-bold">
                {course.certificate ? "Available" : "Not Available"}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}