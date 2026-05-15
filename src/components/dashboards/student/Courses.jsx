import React from "react";

const courses = [
  {
    id: 1,
    title: "Full Stack Development",
    instructor: "Rahul Sharma",
    duration: "6 Months",
    progress: 75,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    id: 2,
    title: "Data Analysis with AI",
    instructor: "Priya Verma",
    duration: "4 Months",
    progress: 45,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  },
  {
    id: 3,
    title: "Java Backend Development",
    instructor: "Aman Gupta",
    duration: "5 Months",
    progress: 90,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
];

export default function Courses() {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-3 sm:p-5 lg:p-6 overflow-hidden">
      
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          My Courses
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-1">
          View your enrolled courses and progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
        {courses.map((course) => (
          <div
            key={course.id}
            className="w-full bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition duration-300"
          >
            <div className="w-full h-44 sm:h-52 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 sm:p-5">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2">
                {course.title}
              </h2>

              <div className="mt-3 space-y-1 text-sm sm:text-base text-gray-600">
                <p>
                  <span className="font-semibold">
                    Instructor:
                  </span>{" "}
                  {course.instructor}
                </p>

                <p>
                  <span className="font-semibold">
                    Duration:
                  </span>{" "}
                  {course.duration}
                </p>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">
                    Progress
                  </span>

                  <span className="text-red-600 font-semibold">
                    {course.progress}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-red-600 h-2.5 rounded-full"
                    style={{
                      width: `${course.progress}%`,
                    }}
                  />
                </div>
              </div>

              <button className="w-full mt-5 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold text-sm sm:text-base transition">
                Continue Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}