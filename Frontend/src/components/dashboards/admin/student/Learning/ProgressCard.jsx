import {
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
} from "lucide-react";
import api from "../../../../../services/api";

export default function ProgressCard({ course }) {

  const totalLessons = course.modules.reduce(
    (total, module) => total + module.lessons.length,
    0
  );

  const completedLessons = course.modules.reduce(
    (total, module) =>
      total +
      module.lessons.filter(
        (lesson) => lesson.completed
      ).length,
    0
  );

  const remainingLessons =
    totalLessons - completedLessons;

  // Calculate progress dynamically
  const progress =
    totalLessons > 0
      ? Math.round(
          (completedLessons / totalLessons) * 100
        )
      : 0;
      const downloadCertificate = async () => {

  try {

    const res = await api.post(
      `/student/courses/${course.id}/certificate`
    );

    window.open(
      `/certificate/${res.data.id}`,
      "_blank"
    );

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.message ||
      "Unable to generate certificate."
    );

  }

};

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      {/* Header */}

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Learning Progress
      </h2>

      {/* Circular Progress */}

      <div className="flex justify-center mb-8">

        <div className="relative w-36 h-36">

          <svg
            className="w-36 h-36 transform -rotate-90"
            viewBox="0 0 120 120"
          >

            {/* Background */}

            <circle
              cx="60"
              cy="60"
              r="52"
              stroke="#E5E7EB"
              strokeWidth="10"
              fill="none"
            />

            {/* Progress */}

            <circle
              cx="60"
              cy="60"
              r="52"
              stroke="#4F46E5"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={327}
              strokeDashoffset={
                327 -
                (327 * progress) / 100
              }
            />

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <h2 className="text-3xl font-bold text-indigo-600">
              {progress}%
            </h2>

            <span className="text-sm text-gray-500">
              Completed
            </span>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="space-y-4">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <BookOpen
              className="text-indigo-600"
              size={20}
            />

            <span>Total Lessons</span>

          </div>

          <span className="font-semibold">
            {totalLessons}
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <CheckCircle2
              className="text-green-600"
              size={20}
            />

            <span>Completed</span>

          </div>

          <span className="font-semibold">
            {completedLessons}
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <Clock
              className="text-orange-500"
              size={20}
            />

            <span>Remaining</span>

          </div>

          <span className="font-semibold">
            {remainingLessons}
          </span>

        </div>

        <div className="flex justify-between items-center">

  <div className="flex items-center gap-3">

    <Award
      className="text-yellow-500"
      size={20}
    />

    <span>Certificate</span>

  </div>

  {progress === 100 ? (

    <button
      onClick={downloadCertificate}
      className="
        text-green-600
        font-semibold
        hover:text-green-700
        underline
      "
    >
      Download
    </button>

  ) : (

    <span className="font-semibold text-gray-400">
      Locked
    </span>

  )}

</div>

      </div>

      {/* Estimated Time */}

      <div className="mt-8 bg-indigo-50 rounded-lg p-4">

        <p className="text-sm text-gray-500">
          Estimated Time Left
        </p>

        <h3 className="text-lg font-bold text-indigo-700 mt-1">
          {remainingLessons * 30} Minutes
        </h3>

      </div>

      {/* Motivational Card */}

      <div className="mt-6 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-5 text-white">

        <h3 className="font-bold text-lg">
          🎯 Keep Going!
        </h3>

        <p className="text-sm mt-2 opacity-90">
          Complete your remaining lessons to unlock your
          certificate and finish this course.
        </p>

      </div>

    </div>
  );
}