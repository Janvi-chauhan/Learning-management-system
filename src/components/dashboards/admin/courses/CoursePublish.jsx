export default function CoursePublish({
  formData,
  setFormData,
  handleSubmit,
}) {

  // =====================================================
  // HANDLE CHECKBOX
  // =====================================================

  const handleCheckbox = (
    e
  ) => {

    const { name, checked } =
      e.target;

    setFormData({
      ...formData,

      [name]: checked,
    });
  };

  // =====================================================
  // HANDLE STATUS
  // =====================================================

  const handleStatus = (
    e
  ) => {

    setFormData({
      ...formData,

      status:
        e.target.value,
    });
  };

  return (
    <div>

      {/* =====================================================
      TITLE
      ===================================================== */}

      <div className="mb-8">

        <h2 className="text-3xl font-black">
          Publish Course
        </h2>

        <p className="text-gray-500 mt-2">
          Configure publishing and visibility settings
        </p>

      </div>

      {/* =====================================================
      STATUS
      ===================================================== */}

      <div className="mb-10">

        <label className="block mb-3 font-semibold text-gray-700">
          Course Status
        </label>

        <select
          value={
            formData.status
          }
          onChange={
            handleStatus
          }
          className="
            w-full
            border
            rounded-2xl
            px-5 py-4
            outline-none
            focus:border-red-500
          "
        >

          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>

          <option value="Draft">
            Draft
          </option>

        </select>

      </div>

      {/* =====================================================
      SETTINGS
      ===================================================== */}

      <div className="space-y-5">

        {/* FEATURED */}

        <div
          className="
            flex items-center justify-between
            border rounded-3xl
            p-5
          "
        >

          <div>

            <h3 className="font-bold text-lg">
              Featured Course
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Show this course in featured sections
            </p>

          </div>

          <input
            type="checkbox"
            name="featured"
            checked={
              formData.featured
            }
            onChange={
              handleCheckbox
            }
            className="
              w-5 h-5
              accent-red-600
            "
          />

        </div>

        {/* LATEST */}

        <div
          className="
            flex items-center justify-between
            border rounded-3xl
            p-5
          "
        >

          <div>

            <h3 className="font-bold text-lg">
              Latest Course
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Show this in latest courses section
            </p>

          </div>

          <input
            type="checkbox"
            name="latest"
            checked={
              formData.latest
            }
            onChange={
              handleCheckbox
            }
            className="
              w-5 h-5
              accent-red-600
            "
          />

        </div>

      </div>

      {/* =====================================================
      PREVIEW
      ===================================================== */}

      <div className="border-t pt-10 mt-10">

        <h3 className="text-2xl font-bold mb-6">
          Course Preview
        </h3>

        <div
          className="
            border
            rounded-3xl
            overflow-hidden
            max-w-md
            bg-white
          "
        >

          {/* IMAGE */}

          <div className="h-[220px] bg-gray-100 overflow-hidden">

            {formData.thumbnail ? (

              <img
                src={
                  formData.thumbnail
                }
                alt="Preview"
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

            ) : (

              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Thumbnail
              </div>

            )}

          </div>

          {/* CONTENT */}

          <div className="p-5">

            <span
              className={`
                inline-block
                px-3 py-1
                rounded-full
                text-xs font-semibold
                mb-4

                ${
                  formData.status ===
                  "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }
              `}
            >
              {formData.status}
            </span>

            <h2 className="text-2xl font-black">
              {formData.title ||
                "Course Title"}
            </h2>

            <p className="text-gray-500 mt-2">
              {
                formData.category
              }
            </p>

            <div className="flex gap-3 mt-5 flex-wrap">

              {formData.featured && (

                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>

              )}

              {formData.latest && (

                <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                  Latest
                </span>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
      BUTTON
      ===================================================== */}

      <div className="pt-10">

        <button
          type="button"
          onClick={
            handleSubmit
          }
          className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-8 py-4
            rounded-2xl
            font-semibold
            shadow-lg
            transition
          "
        >
          Create Course
        </button>

      </div>

    </div>
  );
}