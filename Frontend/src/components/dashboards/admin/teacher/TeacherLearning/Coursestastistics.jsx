export default function CourseStatistics({ course }) {

  const totalModules = course.modules?.length || 0;

  const totalLessons =
    course.modules?.reduce(
      (count, module) => count + module.lessons.length,
      0
    ) || 0;

  const totalDuration =
    course.modules?.reduce((duration, module) => {
      return (
        duration +
        module.lessons.reduce((sum, lesson) => {
          return sum + (parseInt(lesson.duration) || 0);
        }, 0)
      );
    }, 0) || 0;

  return (
    <div className="bg-white rounded-xl shadow p-5">

    <h2 className="text-lg font-bold mb-4">
        Course Statistics
    </h2>

    <div className="space-y-4">

        <div>

            <div className="flex justify-between">

                <span>Total Modules</span>

                <span>{totalModules}</span>

            </div>

        </div>

        <div>

            <div className="flex justify-between">

                <span>Total Lessons</span>

                <span>{totalLessons}</span>

            </div>

        </div>

        <div>

            <div className="flex justify-between">

                <span>Recorded Sessions</span>

                <span>{totalLessons}</span>

            </div>

        </div>

        <div>

            <div className="flex justify-between">

                <span>Total Duration</span>

                <span>{totalDuration} min</span>

            </div>

        </div>

        <div>

            <div className="flex justify-between text-sm mb-1">

                <span>Course Content</span>

                <span>{totalLessons} Lessons</span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">

                <div
                    className="bg-red-600 h-3 rounded-full"
                    style={{
                        width:
                            totalLessons === 0
                                ? "0%"
                                : "100%"
                    }}
                />

            </div>

        </div>

    </div>

</div>
  );
}