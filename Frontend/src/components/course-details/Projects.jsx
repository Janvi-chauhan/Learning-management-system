export default function Projects({
  course,
}) {

  const projects =
    Array.isArray(course?.projects)
      ? course.projects
      : [];

  return (

    <section>

      <h2 className="text-3xl font-bold mb-6">

        Industry{" "}

        <span className="text-red-600">
          Projects
        </span>

      </h2>

      <div className="grid sm:grid-cols-2 gap-6">

        {
          projects.length > 0 ? (

            projects.map(
              (project, index) => (

                <div
                  key={index}
                  className="
                    border
                    border-gray-700
                    p-5
                  "
                >

                  {
                    typeof project === "string"
                      ? project
                      : project.title
                  }

                </div>

              )
            )

          ) : (

            <div
              className="
                border
                border-gray-700
                p-5
              "
            >
              No projects available.
            </div>

          )
        }

      </div>

    </section>
  );
}