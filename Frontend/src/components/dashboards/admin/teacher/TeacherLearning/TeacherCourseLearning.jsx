import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import api from "../../../../../services/api";

import TeacherCourseHeader from "./TeacherCourseHeader";
import CourseSidebar from "../../student/Learning/CourseSidebar";
import VideoPlayer from "../../student/Learning/VideoPlayer";
import LessonTabs from "../../student/Learning/LessonTabs";
import LessonNavigation from "../../student/Learning/LessonNavigation";
import CourseStatistics from "./Coursestastistics";
import LiveClasses from "../../student/Learning/LiveClasses";
import RecordedSessions from "../../student/Learning/RecordedSessions";

export default function TeacherCourseLearning() {
  const { courseId } = useParams();
  console.log(courseId);
  const navigate = useNavigate();
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
      const res = await api.get(`/teacher/courses/${courseId}`);

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
const startLiveClass = async () => {

  try {

    const res = await api.get(
      `/teacher/courses/${courseId}/live`
    );

    window.open(
      res.data.url,
      "_blank"
    );

  } catch (err) {

    console.log(err);

  }

};

  return (
    <div className="bg-gray-100 min-h-screen">
     <TeacherCourseHeader course={courseData} />

      <div className="grid grid-cols-12 gap-5 p-6">
        {/* Sidebar */}
        <div className="col-span-3 space-y-5">

  <CourseSidebar
    modules={courseData.modules}
    currentLesson={currentLesson}
    setCurrentLesson={setCurrentLesson}
  />

  <CourseStatistics
    course={courseData}
  />

</div>

        {/* Right Content */}
        <div className="col-span-9 space-y-5">
          <VideoPlayer lesson={currentLesson} />
          <div className="flex gap-3 mb-5">
  <button
    onClick={() => navigate(`/teacher/course/${courseId}/upload`)}
    className="bg-red-600 text-white px-4 py-2 rounded-lg"
  >
    Upload Recorded Video
  </button>
  <button
    onClick={fetchCourse}
    className="bg-gray-700 text-white px-4 py-2 rounded-lg"
>
    Refresh Playlist
</button>

  <button
    onClick={startLiveClass}
    className="bg-green-600 text-white px-4 py-2 rounded-lg"
  >
    Start Live Class
  </button>

  <button
    onClick={() => navigate(`/teacher/course/${courseId}/edit`)}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    Edit Course
  </button>
</div>

          <LessonTabs lesson={currentLesson} />
          <div className="bg-white rounded-xl shadow p-5">

    <h2 className="text-xl font-bold mb-4">
        Recorded Sessions
    </h2>

    {
        courseData.modules.map(module=>(
            <div key={module.id}>

                <h3 className="font-semibold mb-2">
                    {module.title}
                </h3>

                {
                    module.lessons.map(lesson=>(
                        <div
                            key={lesson.id}
                            className="border rounded-lg p-3 mb-2 flex justify-between"
                        >

                            <div>

                                <p className="font-medium">
                                    {lesson.title}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {lesson.duration}
                                </p>

                            </div>

                            <button
                                onClick={()=>setCurrentLesson(lesson)}
                                className="bg-blue-600 text-white px-3 py-1 rounded"
                            >
                                Open
                            </button>

                        </div>
                    ))
                }

            </div>
        ))
    }

</div>

          <LessonNavigation
    previousLesson={previousLesson}
    nextLesson={nextLesson}
    onPrevious={handlePrevious}
    onNext={handleNext}
/>
        </div>
      </div>
    </div>
  );
}