// src/components/dashboards/teacher/Courses.jsx

import React from "react";
import {
  BookOpen,
  Users,
  Clock,
  Star,
  Layers,
  CheckCircle,
  CalendarDays,
  MapPin,
  User,
  ChevronRight,
} from "lucide-react";
import teachersData from "../teachersData";
import coursesData from "../courseData";
import classesData from "../classData";

export default function Courses() {
  // =========================================================
  // Logged In Teacher
  // =========================================================
  const getTeacherNameByCourse = (courseTitle) => {
  const teacherForCourse = teachersData.find((teacher) =>
    teacher.courses.includes(courseTitle)
  );

  return teacherForCourse?.name || "Not Assigned";
};

// Generate a sample upcoming date/time for a course
const getUpcomingDateTime = (courseTitle) => {
  const sampleSchedule = {
    "Java Full Stack Development": {
      date: "25 May 2026",
      time: "10:00 AM",
    },
    "Spring Boot": {
      date: "26 May 2026",
      time: "11:30 AM",
    },
    Hibernate: {
      date: "27 May 2026",
      time: "02:00 PM",
    },
    "Microservices with Java": {
      date: "28 May 2026",
      time: "04:00 PM",
    },
    "DSA in Java": {
      date: "29 May 2026",
      time: "09:00 AM",
    },
    "MERN Stack Development": {
      date: "20 May 2026",
      time: "06:00 PM",
    },
    "React.js Advanced": {
      date: "21 May 2026",
      time: "09:00 AM",
    },
    "Node.js & Express": {
      date: "22 May 2026",
      time: "02:00 PM",
    },
    "MongoDB Mastery": {
      date: "23 May 2026",
      time: "11:00 AM",
    },
    "Python Programming": {
      date: "24 May 2026",
      time: "03:00 PM",
    },
    "Machine Learning": {
      date: "25 May 2026",
      time: "05:00 PM",
    },
  };

  return (
    sampleSchedule[courseTitle] || {
      date: "To Be Announced",
      time: "--",
    }
  );
};
  const loggedInTeacher =
    JSON.parse(localStorage.getItem("loggedInTeacher")) || teachersData[0];

  const teacher = teachersData.find(
    (item) => item.id === loggedInTeacher.id
  );

  const assignedCourses = teacher?.courses || [];

  // Other Available Courses function
  // const allCourses = [...coursesData];

  // const otherCourses = allCourses
  //   .filter((course) => !assignedCourses.includes(course.title))
  //   .sort(() => 0.5 - Math.random())
  //   .slice(0, 6);



  const now = new Date();

  const getClassDateTime = (classItem) =>
    new Date(`${classItem.date}T${classItem.time}:00`);

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


  const upcomingClasses = classesData
    .filter((item) => assignedCourses.includes(item.course))
    .filter((item) => getClassDateTime(item) >= now)
    .sort(
      (a, b) => getClassDateTime(a) - getClassDateTime(b)
    );

  const nextClass = upcomingClasses[0];

  

const CourseCard = ({ course, isAssigned = false }) => {
  const courseObj =
    typeof course === "string"
      ? coursesData.find((c) => c.title === course) || {
          title: course,
        }
      : course;

  const teacherName = getTeacherNameByCourse(courseObj.title);
  const schedule = getUpcomingDateTime(courseObj.title);

  return (
    <article className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <BookOpen size={24} />
          </div>

          {isAssigned && (
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex items-center gap-1">
              <CheckCircle size={12} />
              Assigned
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {courseObj.title}
        </h3>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {courseObj.description ||
            "Comprehensive course designed to help students master this technology."}
        </p>

        {/* Show next class date/time for assigned courses */}
        {isAssigned ? (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-3 mb-4">
            <p className="text-xs text-red-600 font-semibold mb-1">
              Next Class
            </p>
            <p className="text-sm font-medium text-gray-900">
              {schedule.date}
            </p>
            <p className="text-sm text-gray-600">
              {schedule.time}
            </p>
          </div>
        ) : (
          /* Show teacher name for other available courses */
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 mb-4">
            <p className="text-xs text-blue-600 font-semibold mb-1">
              Instructor
            </p>
            <p className="text-sm font-medium text-gray-900">
              {teacherName}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-2xl p-3">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock size={12} />
              Duration
            </p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {courseObj.duration || "8 Weeks"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-3">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Users size={12} />
              Students
            </p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {courseObj.students || 0}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-3">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Layers size={12} />
              Level
            </p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {courseObj.level || "Intermediate"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-3">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Star size={12} />
              Rating
            </p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {courseObj.rating || "4.8"}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};


  return (
    <section className="space-y-10">
      {/* Header */}
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          My Courses
        </h1>
        <p className="mt-2 text-gray-500">
          Manage your assigned courses and explore other available courses.
        </p>
      </header>


      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <CalendarDays size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Upcoming Classes
            </h2>
            <p className="text-sm text-gray-500">
              Your nearest scheduled classes appear first.
            </p>
          </div>
        </div>

        {nextClass && (
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-3xl p-6 shadow-lg mb-6">
            <p className="text-sm uppercase tracking-wide font-medium opacity-90">
              Next Class
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {nextClass.course}
            </h3>

            <p className="text-red-100 mt-1">
              {nextClass.topic}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                <span className="text-sm">
                  {formatDate(nextClass.date, nextClass.time)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="text-sm">
                  {nextClass.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="text-sm">
                  {nextClass.students} Students
                </span>
              </div>
            </div>

            <div className="mt-4 inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
              {getTimeRemaining(nextClass)}
            </div>
          </div>
        )}

        {upcomingClasses.length > 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingClasses.slice(1).map((classItem) => (
              <article
                key={classItem.id}
                className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
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
                    {formatDate(
                      classItem.date,
                      classItem.time
                    )}
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
        )}

        {upcomingClasses.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center text-gray-500">
            No upcoming classes scheduled for your assigned courses.
          </div>
        )}
      </div>

      {/* Assigned Courses */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircle size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Assigned Courses
            </h2>
            <p className="text-sm text-gray-500">
              Courses currently assigned to you.
            </p>
          </div>
        </div>

        {assignedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {assignedCourses.map((courseName, index) => (
              <CourseCard
                key={index}
                course={courseName}
                isAssigned={true}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center text-gray-500">
            No courses assigned to you.
          </div>
        )}
      </div>

      {/* Other Available Courses */}
      {/* <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Other Available Courses
            </h2>
            <p className="text-sm text-gray-500">
              Explore additional courses offered by the institute.
            </p>
          </div>
        </div>

        {otherCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {otherCourses.map((course, index) => (
              <CourseCard
                key={course.id || index}
                course={course}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center text-gray-500">
            No additional courses available.
          </div>
        )}
      </div> */}
    </section>
  );
}