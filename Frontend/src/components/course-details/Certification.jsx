export default function Certification({
  course,
}) {

  const certifications = Array.isArray(
    course?.certifications
  )
    ? course.certifications
    : [];

  return (

    <section
      className="
        border
        border-red-700
        p-6
      "
    >

      <h2
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Certification
      </h2>

      {certifications.length > 0 ? (

        <div className="grid md:grid-cols-2 gap-6">

          {certifications.map(
            (cert, index) => (

              <div
                key={index}
                className="
                  border
                  rounded-2xl
                  p-5
                "
              >

                <h3 className="text-xl font-bold mb-3">
                  {cert.title}
                </h3>

                {cert.image ? (

                  cert.image.includes("http") ? (

                    <a
                      href={cert.image}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        text-red-600
                        underline
                      "
                    >
                      View Certificate
                    </a>

                  ) : (

                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="
                        w-full
                        rounded-xl
                      "
                    />

                  )

                ) : (

                  <p className="text-gray-500">
                    No certificate image uploaded.
                  </p>

                )}

              </div>

            )
          )}

        </div>

      ) : (

        <p className="text-gray-600">
          No certification details available.
        </p>

      )}

    </section>

  );
}