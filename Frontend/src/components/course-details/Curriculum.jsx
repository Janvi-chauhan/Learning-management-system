import { useState } from "react";

export default function Curriculum({
  course,
}) {

  const [open, setOpen] =
    useState(null);

  // backend data

  const syllabus = Array.isArray(
    course?.curriculum
  )
    ? course.curriculum
    : [];

  return (
    <section>

      <h2 className="text-3xl font-bold mb-6">

        Detailed{" "}

        <span className="text-red-600">
          Curriculum
        </span>

      </h2>

      {syllabus.length > 0 ? (

        syllabus.map(
          (topic, i) => (

            <div
              key={i}
              className="
                border
                border-gray-300
                mb-3
              "
            >

              <button
                onClick={() =>
                  setOpen(
                    open === i
                      ? null
                      : i
                  )
                }
                className="
                  w-full
                  text-left
                  p-4
                  font-semibold
                "
              >
                {topic}
              </button>

              {open === i && (

                <div
                  className="
                    p-4
                    text-gray-600
                  "
                >
                  • {topic}
                </div>

              )}

            </div>

          )
        )

      ) : (

        <div
          className="
            border
            border-gray-300
            p-4
            text-gray-500
          "
        >
          No curriculum available.
        </div>

      )}

    </section>
  );
}