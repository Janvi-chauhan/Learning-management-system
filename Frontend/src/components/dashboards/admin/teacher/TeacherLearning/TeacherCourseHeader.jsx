export default function TeacherCourseHeader({ course }) {
  return (
    <div className="bg-white shadow p-6 rounded-lg mb-5">
      <h1 className="text-3xl font-bold">{course.title}</h1>

      <p className="text-gray-600 mt-2">
        {course.description}
      </p>

      <div className="flex gap-6 mt-4 text-sm text-gray-700">
        <span>
          Modules: {course.modules?.length || 0}
        </span>

        <span>
          Lessons: {
            course.modules?.reduce(
              (count, module) => count + module.lessons.length,
              0
            )
          }
        </span>
      </div>
    </div>
  );
}