import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import api from "../../../../../services/api";

import CourseHeader from "../Learning/CourseHeader";
import CourseSidebar from "../Learning/CourseSidebar";
import VideoPlayer from "../Learning/VideoPlayer";
import LessonTabs from "../Learning/LessonTabs";
import LessonNavigation from "../Learning/LessonNavigation";
import ProgressCard from "../Learning/ProgressCard";
import LiveClasses from "../Learning/LiveClasses";
import RecordedSessions from "./RecordedSessions";

export default function CourseLearning() {
  const { courseId } = useParams();
  console.log(courseId);

  const [courseData, setCourseData] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [searchParams] = useSearchParams();

const lessonId = searchParams.get("lesson");

  useEffect(() => {

    if(courseId){

        fetchCourse();

    }

}, [courseId]);

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/student/courses/${courseId}/learning`);

      setCourseData(res.data.data);

     const course = res.data.data;

setCourseData(course);

if (lessonId) {

    let foundLesson = null;

    course.modules.forEach(module => {

        const lesson = module.lessons.find(

            l => l.id == lessonId

        );

        if (lesson) {

            foundLesson = lesson;

        }

    });

    if (foundLesson) {

        setCurrentLesson(foundLesson);

        return;

    }

}

if (
    course.modules &&
    course.modules.length > 0 &&
    course.modules[0].lessons.length > 0
) {

    setCurrentLesson(course.modules[0].lessons[0]);

}
    } catch (err) {
      console.log(err);
    }
  };

  if (!courseData || !currentLesson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  const allLessons = courseData.modules
    .flatMap(module => module.lessons)
    .sort((a, b) => a.position - b.position);

  const currentIndex = allLessons.findIndex(
    lesson => lesson.id === currentLesson.id
);

const previousLesson =
    currentIndex > 0
        ? allLessons[currentIndex - 1]
        : null;

const nextLesson =
    currentIndex !== -1 &&
    currentIndex < allLessons.length - 1
        ? allLessons[currentIndex + 1]
        : null;

  const handlePrevious = () => {
    if (previousLesson) {
      setCurrentLesson(previousLesson);
    }
  };

 const handleNext = () => {
    if (!nextLesson) return;

    setCurrentLesson(nextLesson);
};

  const handleComplete = async () => {
  try {

    const res = await api.post(
      "/student/lesson/complete",
      {
        lesson_id: currentLesson.id,
      }
    );

    console.log(res.data);

    alert("Lesson marked as completed.");

  } catch (err) {

    console.log(err);

    alert("Unable to complete lesson.");

  }
};
const joinLiveClass = async () => {
    try {
        const res = await api.get(
            `/student/courses/${courseId}/live`
        );

        if (!res.data.is_live) {
            alert("Teacher has not started the live class yet.");
            return;
        }

        window.open(res.data.url, "_blank");
    } catch (err) {
        console.log(err);
    }
};

  return (
    <div className="bg-gray-100 min-h-screen">
      <CourseHeader course={courseData} />

      <div className="grid grid-cols-12 gap-5 p-6">
        {/* Sidebar */}
        <div className="col-span-3">
          <CourseSidebar
            modules={courseData.modules}
            currentLesson={currentLesson}
            setCurrentLesson={setCurrentLesson}
          />

          <div className="mt-5">
            <ProgressCard course={courseData} />
          </div>
          
        </div>

        {/* Right Content */}
        <div className="col-span-9 space-y-5">
          <VideoPlayer lesson={currentLesson} />
          <button
    onClick={joinLiveClass}
    className="bg-green-600 text-white px-4 py-2 rounded-lg"
>
    Join Live Class
</button>

          <LessonTabs lesson={currentLesson} />

          <LessonNavigation
            previousLesson={previousLesson}
            nextLesson={nextLesson}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onComplete={handleComplete}
          />
        </div>
      </div>
    </div>
  );
}