export default function CourseBasics({
  formData,
  setFormData,
  goToNextTab,
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

  return (
    <div>

      {/* =====================================================
      TITLE
      ===================================================== */}

      <div className="mb-8">

        <h2 className="text-3xl font-black">
          Course Basics
        </h2>

        <p className="text-gray-500 mt-2">
          Add course details and media
        </p>

      </div>

      {/* =====================================================
      FORM
      ===================================================== */}

      <div className="space-y-6">

        {/* COURSE TITLE */}

        <div>

          <label className="block mb-2 font-semibold text-gray-700">
            Course Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Enter course title"
            value={formData.title}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:border-red-500
            "
          />
          <textarea
           name="what_you_learn"
           placeholder="What you learn (comma separated)"
           value={formData.what_you_learn || ""}
           onChange={handleChange}
           className="
             w-full
             rounded-2xl
             border
             border-slate-200
             bg-white
             px-4
             py-3
             outline-none
            "
            />

        </div>

        {/* COURSE DESCRIPTION */}

<div className="mt-5">
  <label className="block mb-2 font-semibold text-gray-700">
    Course Description
  </label>

  <textarea
    name="description"
    placeholder="Enter course description"
    value={formData.description || ""}
    onChange={handleChange}
    rows={4}
    className="
      w-full
      border
      rounded-2xl
      px-5
      py-4
      outline-none
      focus:border-red-500
      resize-none
    "
  />
</div>

        {/* SLUG */}

        <div>

          <label className="block mb-2 font-semibold text-gray-700">
            Course URL
          </label>

          <input
            type="text"
            name="slug"
            placeholder="mern-stack-development"
            value={formData.slug}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:border-red-500
            "
          />

        </div>

        {/* CATEGORY */}

        <div>

          <label className="block mb-2 font-semibold text-gray-700">
            Category
          </label>

          <input
            type="text"
            name="category"
            placeholder="Web Development / MERN"
            value={formData.category}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:border-red-500
            "
          />

        </div>

        {/* GRID */}

        <div className="grid md:grid-cols-3 gap-5">

          {/* DURATION */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Duration
            </label>

            <input
              type="text"
              name="duration"
              placeholder="6 Months"
              value={formData.duration}
              onChange={handleChange}
              className="
                w-full
                border
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-red-500
              "
            />

          </div>

          {/* LEVEL */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Level
            </label>

            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="
                w-full
                border
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-red-500
              "
            >

              <option value="">
                Select Level
              </option>

              <option value="Beginner">
                Beginner
              </option>

              <option value="Intermediate">
                Intermediate
              </option>

              <option value="Advanced">
                Advanced
              </option>

            </select>

          </div>

          {/* LANGUAGE */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Language
            </label>

            <input
              type="text"
              name="language"
              placeholder="English, Hindi"
              value={formData.language}
              onChange={handleChange}
              className="
                w-full
                border
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-red-500
              "
            />

          </div>

        </div>

        {/* MEDIA SECTION */}

        <div className="border-t pt-8">

          <h3 className="text-2xl font-bold mb-6">
            Course Media
          </h3>

          <div className="space-y-6">

            {/* THUMBNAIL */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Thumbnail URL
              </label>

              <input
                type="text"
                name="thumbnail"
                placeholder="https://..."
                value={
                  formData.thumbnail
                }
                onChange={handleChange}
                className="
                  w-full
                  border
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-red-500
                "
              />

              {/* PREVIEW */}

              {formData.thumbnail && (

                <div className="mt-5">

                  <img
                    src={
                      formData.thumbnail
                    }
                    alt="Thumbnail"
                    className="
                      w-full
                      max-w-md
                      h-[220px]
                      object-cover
                      rounded-3xl
                      border
                    "
                  />

                </div>
              )}

            </div>

            {/* PREVIEW VIDEO */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Preview Video URL
              </label>

              <input
                type="text"
                name="previewVideo"
                placeholder="https://youtube.com"
                value={
                  formData.previewVideo
                }
                onChange={handleChange}
                className="
                  w-full
                  border
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-red-500
                "
              />

            </div>

            {/* BROCHURE */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Brochure URL
              </label>

              <input
                type="text"
                name="brochure"
                placeholder="/brochure.pdf"
                value={
                  formData.brochure
                }
                onChange={handleChange}
                className="
                  w-full
                  border
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-red-500
                "
              />

            </div>

          </div>

        </div>

      </div>
      {/* BUTTONS */}

<div className="mt-10 flex justify-end">

  <button
    onClick={goToNextTab}
    className="
      bg-red-600
      hover:bg-red-700
      text-white
      px-8
      py-4
      rounded-2xl
      font-semibold
      shadow-lg
      transition-all
    "
  >
    Save & Next →
  </button>

</div>
    </div>
  );
}