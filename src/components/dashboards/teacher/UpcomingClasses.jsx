// src/components/dashboards/teacher/UpcomingClasses.jsx

import React from "react";
import {
  CalendarDays,
  Clock,
  BookOpen,
  MapPin,
  User,
  ChevronRight,
} from "lucide-react";
import teachersData from "../teachersData";
import coursesData from "../courseData";



export default function UpcomingClasses() {
  // Logged-in teacher
  const loggedInTeacher =
    JSON.parse(localStorage.getItem("loggedInTeacher")) || teachersData[0];

  const teacher = teachersData.find(
    (item) => item.id === loggedInTeacher.id
  );

  const assignedCourses = teacher?.courses || [];

  // Sample classes data
  // You can later replace this with API/database data
  const classesData = [
    {
      id: 1,
      course: "MERN Stack Development",
      topic: "React Hooks & useEffect",
      date: "2026-05-20",
      time: "18:00", // 6:00 PM
      duration: "2 Hours",
      students: 42,
      mode: "Online",
    },
    {
      id: 2,
      course: "React.js Advanced",
      topic: "Redux Toolkit",
      date: "2026-05-21",
      time: "09:00",
      duration: "1.5 Hours",
      students: 35,
      mode: "Online",
    },
    {
      id: 3,
      course: "Node.js & Express",
      topic: "REST API Authentication",
      date: "2026-05-22",
      time: "14:00",
      duration: "2 Hours",
      students: 28,
      mode: "Offline",
    },
    {
      id: 4,
      course: "Python Programming",
      topic: "Functions and Modules",
      date: "2026-05-23",
      time: "11:00",
      duration: "2 Hours",
      students: 55,
      mode: "Online",
    },
    {
      id: 5,
      course: "Machine Learning",
      topic: "Linear Regression",
      date: "2026-05-24",
      time: "16:30",
      duration: "2 Hours",
      students: 31,
      mode: "Online",
    },
  ];

  // Convert date + time to JS Date object
  const getClassDateTime = (classItem) =>
    new Date(`${classItem.date}T${classItem.time}:00`);

  const now = new Date();

  // Filter only assigned courses
  const teacherClasses = classesData.filter((item) =>
    assignedCourses.includes(item.course)
  );

  // Keep only future classes and sort nearest first
  const upcomingClasses = teacherClasses
    .filter((item) => getClassDateTime(item) >= now)
    .sort(
      (a, b) => getClassDateTime(a) - getClassDateTime(b)
    );

  // Format date nicely
  const formatDate = (date, time) => {
    const dateObj = new Date(`${date}T${time}:00`);

    return dateObj.toLocaleString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Time remaining label
  const getTimeRemaining = (classItem) => {
    const classDate = getClassDateTime(classItem);
    const diff = classDate - now;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `Starts in ${minutes} min`;
    }

    if (hours < 24) {
      return `Starts in ${hours} hr`;
    }

    return `Starts in ${days} day${days > 1 ? "s" : ""}`;
  };

  const nextClass = upcomingClasses[0];

  return (
    <section className="space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Upcoming Classes
        </h1>
        <p className="mt-2 text-gray-500">
          Your classes are automatically sorted by date and time,
          with the nearest upcoming class shown first.
        </p>
      </header>

      {/* Next Class Highlight */}
      {nextClass && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-3xl p-6 shadow-lg">
          <p className="text-sm uppercase tracking-wide font-medium opacity-90">
            Next Class
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {nextClass.course}
          </h2>

          <p className="text-red-100 mt-1">{nextClass.topic}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} />
              <span className="text-sm">
                {formatDate(nextClass.date, nextClass.time)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span className="text-sm">
                {nextClass.duration}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <User size={18} />
              <span className="text-sm">
                {nextClass.students} Students
              </span>
            </div>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
            {getTimeRemaining(nextClass)}
          </div>
        </div>
      )}

      {/* Classes List */}
      {upcomingClasses.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingClasses.map((classItem) => (
            <article
              key={classItem.id}
              className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {classItem.course}
                  </h3>
                  <p className="text-gray-500 mt-1">
                    {classItem.topic}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                  <BookOpen size={24} />
                </div>
              </div>

              <div className="space-y-3 mt-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {formatDate(classItem.date, classItem.time)}
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {classItem.duration}
                </div>

                <div className="flex items-center gap-2">
                  <User size={16} />
                  {classItem.students} Students
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {classItem.mode}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  {getTimeRemaining(classItem)}
                </span>

                <button className="flex items-center gap-1 text-red-600 font-semibold text-sm hover:text-red-700">
                  View Details
                  <ChevronRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center text-gray-500">
          No upcoming classes scheduled for your assigned courses.
        </div>
      )}
    </section>
  );
}