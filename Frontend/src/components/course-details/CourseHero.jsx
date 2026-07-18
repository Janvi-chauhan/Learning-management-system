import CoursePreviewCard from "./CoursePreviewCard";

export default function CourseHero({
  course,
}) {

  return (

    <section className="relative bg-[#0f0f12]">

      {/* HERO HEIGHT FIX */}

      <div
        className="
          max-w-[1200px]
          mx-auto
          px-6
          pt-30
          pb-10
          relative
        "
      >

        {/* Breadcrumb */}

        <p
          className="
            text-sm
            text-gray-400
            mb-4
          "
        >
          IT & Software /

          {course?.category || "Category"} /

          {course?.title || "Course"}
        </p>

        {/* LEFT CONTENT */}

        <div className="max-w-[650px]">

          {/* Title */}

          <h1
            className="
              text-4xl
              lg:text-5xl
              font-extrabold
              text-white
              leading-tight
            "
          >
            {course?.title}

            {course?.category && (
              <>
                {" "}
                <span className="text-red-600">
                  {course.category}
                </span>
              </>
            )}
          </h1>

          {/* Description */}

          <p
            className="
              mt-4
              text-gray-300
            "
          >
            {
              course?.description ||
              "No description available."
            }
          </p>

          {/* Mentor */}

          <p
            className="
              mt-4
              text-sm
              text-gray-400
            "
          >
            Created by{" "}

            <span className="text-white">
              {
                course?.mentor_name ||
                "Creative Programming Classes"
              }
            </span>
          </p>

          {/* Last Update */}

          <p
            className="
              mt-1
              text-sm
              text-gray-400
            "
          >
            Last updated{" "}

            {
              course?.updated_at
                ? new Date(
                    course.updated_at
                  ).toLocaleDateString()
                : "-"
            }

            {" • "}

            {
              course?.language ||
              "English"
            }
          </p>

          {/* STATS */}

          <div
            className="
              mt-6
              inline-flex
              items-center
              gap-6

              bg-white/5

              px-6
              py-3

              rounded-md
            "
          >

            {/* Reviews */}

            <span
              className="
                text-yellow-400
                font-semibold
              "
            >
              ★{" "}

              {
                course?.reviews?.length || 0
              }
            </span>

            {/* Students */}

            <span className="text-gray-300">

              {
                course?.students_count ||
                "0"
              }{" "}

              Students

            </span>

            {/* Duration */}

            <span className="text-gray-300">

              {
                course?.duration ||
                "-"
              }

            </span>

          </div>

        </div>

        {/* RIGHT PREVIEW CARD */}

        <CoursePreviewCard
          course={course}
        />

      </div>

    </section>
  );
}