import {
  Plus,
  Trash2,
} from "lucide-react";

export default function CourseMentor({
  formData,
  setFormData,
}) {

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (
    e
  ) => {

    const { name, value } =
      e.target;

    setFormData({
      ...formData,

      [name]: value,
    });
  };

  // =====================================================
  // REVIEWS
  // =====================================================

  const updateReview = (
    index,
    field,
    value
  ) => {

    const updated = [
      ...formData.reviews,
    ];

    updated[index][field] =
      value;

    setFormData({
      ...formData,

      reviews: updated,
    });
  };

  const addReview = () => {

    setFormData({
      ...formData,

      reviews: [
        ...formData.reviews,

        {
          student: "",
          comment: "",
        },
      ],
    });
  };

  const removeReview = (
    index
  ) => {

    const updated =
      formData.reviews.filter(
        (_, i) =>
          i !== index
      );

    setFormData({
      ...formData,

      reviews: updated,
    });
  };

  return (
    <div>

      {/* =====================================================
      TITLE
      ===================================================== */}

      <div className="mb-8">

        <h2 className="text-3xl font-black">
          Mentor & Reviews
        </h2>

        <p className="text-gray-500 mt-2">
          Add mentor details and student reviews
        </p>

      </div>

      {/* =====================================================
      MENTOR
      ===================================================== */}

      <div className="mb-12">

        <h3 className="text-2xl font-bold mb-6">
          Mentor Information
        </h3>

        <div className="space-y-6">

          {/* NAME */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Mentor Name
            </label>

            <input
              type="text"
              name="mentorName"
              placeholder="John Doe"
              value={
                formData.mentorName
              }
              onChange={
                handleChange
              }
              className="
                w-full
                border
                rounded-2xl
                px-5 py-4
                outline-none
                focus:border-red-500
              "
            />

          </div>

          {/* EXPERIENCE */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Experience
            </label>

            <input
              type="text"
              name="mentorExperience"
              placeholder="10+ Years Experience"
              value={
                formData.mentorExperience
              }
              onChange={
                handleChange
              }
              className="
                w-full
                border
                rounded-2xl
                px-5 py-4
                outline-none
                focus:border-red-500
              "
            />

          </div>

          {/* IMAGE */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Mentor Image URL
            </label>

            <input
              type="text"
              name="mentorImage"
              placeholder="https://..."
              value={
                formData.mentorImage
              }
              onChange={
                handleChange
              }
              className="
                w-full
                border
                rounded-2xl
                px-5 py-4
                outline-none
                focus:border-red-500
              "
            />

          </div>

          {/* PREVIEW */}

          {formData.mentorImage && (

            <div className="pt-2">

              <img
                src={
                  formData.mentorImage
                }
                alt="Mentor"
                className="
                  w-40 h-40
                  rounded-3xl
                  object-cover
                  border
                "
              />

            </div>
          )}

        </div>

      </div>

      {/* =====================================================
      REVIEWS
      ===================================================== */}

      <div className="border-t pt-10">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h3 className="text-2xl font-bold">
              Student Reviews
            </h3>

            <p className="text-gray-500 mt-1">
              Add student testimonials
            </p>

          </div>

          <button
            type="button"
            onClick={
              addReview
            }
            className="
              flex items-center gap-2
              bg-red-600
              hover:bg-red-700
              text-white
              px-5 py-3
              rounded-2xl
            "
          >
            <Plus size={18} />
            Add Review
          </button>

        </div>

        <div className="space-y-5">

          {formData.reviews.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="
                  border
                  rounded-3xl
                  p-6
                  bg-gray-50
                "
              >

                <div className="flex items-center justify-between mb-5">

                  <h4 className="font-bold text-lg">
                    Review{" "}
                    {index + 1}
                  </h4>

                  <button
                    type="button"
                    onClick={() =>
                      removeReview(
                        index
                      )
                    }
                    className="
                      w-10 h-10
                      rounded-xl
                      bg-red-100
                      text-red-600
                      flex items-center justify-center
                    "
                  >
                    <Trash2
                      size={18}
                    />
                  </button>

                </div>

                <div className="space-y-4">

                  {/* STUDENT */}

                  <input
                    type="text"
                    placeholder="Student Name"
                    value={
                      item.student
                    }
                    onChange={(
                      e
                    ) =>
                      updateReview(
                        index,
                        "student",
                        e.target
                          .value
                      )
                    }
                    className="
                      w-full
                      border
                      rounded-2xl
                      px-5 py-4
                      outline-none
                      focus:border-red-500
                    "
                  />

                  {/* COMMENT */}

                  <textarea
                    rows={4}
                    placeholder="Write review..."
                    value={
                      item.comment
                    }
                    onChange={(
                      e
                    ) =>
                      updateReview(
                        index,
                        "comment",
                        e.target
                          .value
                      )
                    }
                    className="
                      w-full
                      border
                      rounded-2xl
                      px-5 py-4
                      outline-none
                      focus:border-red-500
                    "
                  />

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}