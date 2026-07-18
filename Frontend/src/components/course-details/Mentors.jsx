export default function Mentors({
  course,
}) {

  return (

    <section>

      <h2 className="text-3xl font-bold mb-6">

        Meet Your{" "}

        <span className="text-red-600">
          Mentors
        </span>

      </h2>

      <div className="grid sm:grid-cols-2 gap-6">

        <div
          className="
            border
            border-gray-700
            p-5
          "
        >

          {/* Mentor Image */}

          {course?.mentor_image && (

            <img
              src={course.mentor_image}
              alt={course.mentor_name}
              className="
                w-24
                h-24
                rounded-full
                object-cover
                mb-4
              "
            />

          )}

          {/* Mentor Name */}

          <h4 className="font-bold text-xl">

            {course?.mentor_name ||
              "Mentor Not Assigned"}

          </h4>

          {/* Experience */}

          <p className="text-gray-400">

            {course?.mentor_experience
              ? `${course.mentor_experience} Years Experience`
              : "Experience not available"}

          </p>

        </div>

      </div>

    </section>
  );
}