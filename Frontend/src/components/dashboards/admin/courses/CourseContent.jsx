import {
  Plus,
  Trash2,
  X,
} from "lucide-react";

export default function CourseContent({
  formData,
  setFormData,
}) {

  // =====================================================
  // LEARNINGS
  // =====================================================

  const updateLearning = (
    index,
    value
  ) => {

    const updated = [
      ...formData.learnings,
    ];

    updated[index] = value;

    setFormData({
      ...formData,

      learnings: updated,
    });
  };

  const addLearning = () => {

    setFormData({
      ...formData,

      learnings: [
        ...formData.learnings,
        "",
      ],
    });
  };

  const removeLearning = (
    index
  ) => {

    const updated =
      formData.learnings.filter(
        (_, i) =>
          i !== index
      );

    setFormData({
      ...formData,

      learnings: updated,
    });
  };

  // =====================================================
  // ROADMAP
  // =====================================================

  const updateRoadmap = (
    index,
    field,
    value
  ) => {

    const updated = [
      ...formData.roadmap,
    ];

    updated[index][field] =
      value;

    setFormData({
      ...formData,

      roadmap: updated,
    });
  };

  const addRoadmap = () => {

    setFormData({
      ...formData,

      roadmap: [
        ...formData.roadmap,

        {
          title: "",
          desc: "",
        },
      ],
    });
  };

  const removeRoadmap = (
    index
  ) => {

    const updated =
      formData.roadmap.filter(
        (_, i) =>
          i !== index
      );

    setFormData({
      ...formData,

      roadmap: updated,
    });
  };

  // =====================================================
  // CURRICULUM
  // =====================================================

  const updateCurriculum = (
    index,
    value
  ) => {

    const updated = [
      ...formData.curriculum,
    ];

    updated[index] = value;

    setFormData({
      ...formData,

      curriculum:
        updated,
    });
  };

  const addCurriculum = () => {

    setFormData({
      ...formData,

      curriculum: [
        ...formData.curriculum,
        "",
      ],
    });
  };

  const removeCurriculum = (
    index
  ) => {

    const updated =
      formData.curriculum.filter(
        (_, i) =>
          i !== index
      );

    setFormData({
      ...formData,

      curriculum:
        updated,
    });
  };

  return (
    <div>

      {/* =====================================================
      TITLE
      ===================================================== */}

      <div className="mb-8">

        <h2 className="text-3xl font-black">
          Course Content
        </h2>

        <p className="text-gray-500 mt-2">
          Manage learnings, roadmap and curriculum
        </p>

      </div>

      {/* =====================================================
      LEARNINGS
      ===================================================== */}

      <div className="mb-12">

        <div className="flex items-center justify-between mb-5">

          <div>

            <h3 className="text-2xl font-bold">
              What You'll Learn
            </h3>

            <p className="text-gray-500 mt-1">
              Add course outcomes
            </p>

          </div>

          <button
            type="button"
            onClick={
              addLearning
            }
            className="
              flex items-center gap-2
              bg-red-600
              hover:bg-red-700
              text-white
              px-5 py-3
              rounded-2xl
              transition
            "
          >
            <Plus size={18} />
            Add Learning
          </button>

        </div>

        <div className="space-y-4">

          {formData.learnings.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="flex gap-3"
              >

                <input
                  type="text"
                  value={item}
                  onChange={(
                    e
                  ) =>
                    updateLearning(
                      index,
                      e.target
                        .value
                    )
                  }
                  placeholder={`Learning ${
                    index + 1
                  }`}
                  className="
                    flex-1
                    border
                    rounded-2xl
                    px-5 py-4
                    outline-none
                    focus:border-red-500
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    removeLearning(
                      index
                    )
                  }
                  className="
                    w-14
                    rounded-2xl
                    bg-red-100
                    text-red-600
                    flex items-center justify-center
                  "
                >
                  <Trash2 size={18} />
                </button>

              </div>
            )
          )}

        </div>

      </div>

      {/* =====================================================
      ROADMAP
      ===================================================== */}

      <div className="mb-12 border-t pt-10">

        <div className="flex items-center justify-between mb-5">

          <div>

            <h3 className="text-2xl font-bold">
              Course Roadmap
            </h3>

            <p className="text-gray-500 mt-1">
              Add learning roadmap steps
            </p>

          </div>

          <button
            type="button"
            onClick={
              addRoadmap
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
            Add Step
          </button>

        </div>

        <div className="space-y-5">

          {formData.roadmap.map(
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
                    Step{" "}
                    {index + 1}
                  </h4>

                  <button
                    type="button"
                    onClick={() =>
                      removeRoadmap(
                        index
                      )
                    }
                    className="text-red-600"
                  >
                    <X />
                  </button>

                </div>

                <div className="space-y-4">

                  <input
                    type="text"
                    value={
                      item.title
                    }
                    onChange={(
                      e
                    ) =>
                      updateRoadmap(
                        index,
                        "title",
                        e.target
                          .value
                      )
                    }
                    placeholder="Roadmap Title"
                    className="
                      w-full
                      border
                      rounded-2xl
                      px-5 py-4
                    "
                  />

                  <textarea
                    value={
                      item.desc
                    }
                    onChange={(
                      e
                    ) =>
                      updateRoadmap(
                        index,
                        "desc",
                        e.target
                          .value
                      )
                    }
                    placeholder="Roadmap Description"
                    rows={4}
                    className="
                      w-full
                      border
                      rounded-2xl
                      px-5 py-4
                    "
                  />

                </div>

              </div>
            )
          )}

        </div>

      </div>

      {/* =====================================================
      CURRICULUM
      ===================================================== */}

      <div className="border-t pt-10">

        <div className="flex items-center justify-between mb-5">

          <div>

            <h3 className="text-2xl font-bold">
              Curriculum
            </h3>

            <p className="text-gray-500 mt-1">
              Add modules/topics
            </p>

          </div>

          <button
            type="button"
            onClick={
              addCurriculum
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
            Add Module
          </button>

        </div>

        <div className="space-y-4">

          {formData.curriculum.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="flex gap-3"
              >

                <input
                  type="text"
                  value={item}
                  onChange={(
                    e
                  ) =>
                    updateCurriculum(
                      index,
                      e.target
                        .value
                    )
                  }
                  placeholder={`Module ${
                    index + 1
                  }`}
                  className="
                    flex-1
                    border
                    rounded-2xl
                    px-5 py-4
                    outline-none
                    focus:border-red-500
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    removeCurriculum(
                      index
                    )
                  }
                  className="
                    w-14
                    rounded-2xl
                    bg-red-100
                    text-red-600
                    flex items-center justify-center
                  "
                >
                  <Trash2 size={18} />
                </button>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}