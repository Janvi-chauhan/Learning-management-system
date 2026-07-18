export default function WhatYouLearn({
  course,
}) {

  const points = Array.isArray(
    course?.learnings
  )
    ? course.learnings
    : [];

  return (
    <section className="bg-white border shadow-sm p-8">

      <h2 className="text-2xl font-bold mb-6">

        What you'll

        <span className="text-red-600">
          {" "}learn
        </span>

      </h2>

      <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">

        {points.length > 0 ? (

          points.map(
            (point, index) => (

              <div
                key={index}
                className="flex gap-3 items-start"
              >

                <span className="text-green-600 text-lg">
                  ✔
                </span>

                <p className="text-gray-700 leading-relaxed">
                  {point}
                </p>

              </div>
            )
          )

        ) : (

          <p className="text-gray-500">
            No learning outcomes available.
          </p>

        )}

      </div>

    </section>
  );
}