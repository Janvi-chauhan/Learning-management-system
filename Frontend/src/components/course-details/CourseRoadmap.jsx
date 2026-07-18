export default function CourseRoadmap({ course }) {

  console.log(
    "Roadmap received:",
    course?.roadmap
  );

  const steps = Array.isArray(course?.roadmap)
    ? course.roadmap
    : [];

  return (
    <section className="mt-20">

      <h2 className="text-3xl font-bold mb-10">
        Course
        <span className="text-red-600">
          {" "}Roadmap
        </span>
      </h2>

      <div
        className="
          relative
          border-l-2
          border-red-600
          pl-8
          space-y-10
        "
      >

        {steps.length > 0 ? (

          steps.map((step, index) => (

            <div
              key={index}
              className="relative group"
            >

              {/* DOT */}

              <div
                className="
                  absolute
                  -left-[41px]
                  top-1

                  w-6
                  h-6

                  bg-red-600
                  rounded-full

                  flex
                  items-center
                  justify-center

                  text-white
                  font-bold
                  text-sm
                "
              >
                {index + 1}
              </div>

              {/* CARD */}

              <div
                className="
                  bg-white
                  border
                  border-gray-200

                  p-6
                  shadow-sm
                  hover:shadow-md

                  transition

                  w-full
                "
              >

                <h3
                  className="
                    text-lg
                    font-semibold
                    text-gray-900
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    text-gray-500
                    mt-2
                    text-sm
                  "
                >
                  {step.desc}
                </p>

              </div>

            </div>

          ))

        ) : (

          <p className="text-gray-500">
            No roadmap available.
          </p>

        )}

      </div>

    </section>
  );
}