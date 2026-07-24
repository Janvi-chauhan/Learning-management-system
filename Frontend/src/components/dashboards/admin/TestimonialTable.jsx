import {
  Pencil,
  Trash2,
  Star,
} from "lucide-react";

export default function TestimonialTable({
  testimonials,
  onEdit,
  onDelete,
}) {
  return (
    <>
      {/* ================= DESKTOP TABLE ================= */}

      <div className="hidden lg:block bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gradient-to-r from-red-600 to-red-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Image</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Course</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Comment</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Rating</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {testimonials.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-500"
                  >
                    No testimonials found.
                  </td>
                </tr>
              ) : (
                testimonials.map((testimonial) => (
                  <tr
                    key={testimonial.id}
                    className=" hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border"
                      />
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {testimonial.name}
                    </td>

                    <td className="px-6 py-4">
                      {testimonial.course}
                    </td>

                    <td className="px-6 py-4 max-w-sm">
                      <p className="line-clamp-2 text-gray-600">
                        {testimonial.comment}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {[...Array(Number(testimonial.rating))].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() => onEdit(testimonial)}
                          className="w-9 h-9 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 flex items-center justify-center transition"
                        >
                          <Pencil
                            size={18}
                          />
                        </button>

                        <button
                          onClick={() => onDelete(testimonial.id)}
                          className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition"
                  >
                          <Trash2
                            size={18}
                          />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* ================= MOBILE / TABLET CARDS ================= */}

<div
  className="
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-2
    gap-5
    lg:hidden
    w-full
  "
>
  {testimonials.length === 0 ? (
    <div className="col-span-full bg-white rounded-xl shadow p-8 text-center text-gray-500">
      No testimonials found.
    </div>
  ) : (
    testimonials.map((testimonial) => (
      <div
        key={testimonial.id}
        className="
          w-full
          bg-white
          rounded-2xl
          shadow-md
          hover:shadow-xl
          transition
          p-5
          flex
          flex-col
        "
      >
        {/* Header */}

        <div className="flex items-center gap-4">

          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-red-500"
          />

          <div className="min-w-0">
            <h3 className="font-bold text-lg truncate">
              {testimonial.name}
            </h3>

            <p className="text-gray-500 text-sm truncate">
              {testimonial.course}
            </p>
          </div>

        </div>

        {/* Comment */}

        <div className="mt-5">

          <p className="text-xs font-semibold uppercase text-gray-500 mb-1">
            Comment
          </p>

          <p className="text-gray-700 text-sm leading-6 break-words">
            {testimonial.comment}
          </p>

        </div>

        {/* Rating */}

        <div className="mt-5">

          <p className="text-xs font-semibold uppercase text-gray-500 mb-2">
            Rating
          </p>

          <div className="flex flex-wrap gap-1">
            {[...Array(Number(testimonial.rating))].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

        </div>

        {/* Buttons */}

        <div className="mt-6 grid grid-cols-2 gap-3">

          <button
            onClick={() => onEdit(testimonial)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-700 text-white transition"
          >
            <Pencil size={18} />
            Edit
          </button>

          <button
            onClick={() => onDelete(testimonial.id)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
          >
            <Trash2 size={18} />
            Delete
          </button>

        </div>

      </div>
    ))
  )}
</div>
    </>
  );
}