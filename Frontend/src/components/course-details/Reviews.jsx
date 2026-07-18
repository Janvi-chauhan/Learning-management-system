export default function Reviews({ course }) {

  const reviews = course?.reviews || [];

  return (
    <section>

      <h2 className="text-3xl font-bold mb-6">
        Student{" "}
        <span className="text-red-600">
          Reviews
        </span>
      </h2>

      {
        reviews.length > 0 ? (

          <div className="space-y-4">

            {
              reviews.map((review, index) => (

                <div
                  key={index}
                  className="border border-gray-700 p-5"
                >

                  <div className="flex items-center gap-3 mb-2">

                    <h3 className="font-semibold">
                      {review.name || "Student"}
                    </h3>

                    <span className="text-yellow-500">
                      {"⭐".repeat(review.rating || 5)}
                    </span>

                  </div>

                  <p className="text-gray-300">
                    {review.comment}
                  </p>

                </div>

              ))
            }

          </div>

        ) : (

          <div className="border border-gray-700 p-5">
            No reviews available yet.
          </div>

        )
      }

    </section>
  );
}