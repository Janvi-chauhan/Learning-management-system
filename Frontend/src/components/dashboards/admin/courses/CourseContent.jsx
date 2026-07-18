import {
  Plus,
  Trash2,
  X,
} from "lucide-react";

export default function CourseContent({
  formData,
  setFormData,
  goToNextTab,
  goToPreviousTab,
}) {

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
  const addModule = () => {

    setFormData({
        ...formData,

        modules: [

            ...formData.modules,

            {
                title:"",
                lessons:[
                    {
    title:"",
    duration:"",
    video:"",
    description:"",
    overview:"",
    notes_title:"",
    notes_description:"",
    notes_file:"",
    assignment:"",
    assignment_file:"",
    resources:[
        {
            title:"",
            type:"",
            file:""
        }
    ]
}
                ]
            }

        ]

    });

};

const removeModule = (moduleIndex)=>{

    const updated =
        formData.modules.filter(
            (_,i)=>i!==moduleIndex
        );

    setFormData({

        ...formData,

        modules:updated

    });

};

const updateModuleTitle = (
    moduleIndex,
    value
)=>{

    const updated=[...formData.modules];

    updated[moduleIndex].title=value;

    setFormData({

        ...formData,

        modules:updated

    });

};
const addLesson=(moduleIndex)=>{

    const updated=[...formData.modules];

    updated[moduleIndex].lessons.push({
    title:"",
    duration:"",
    video:"",
    description:"",
    overview:"",
    notes_title:"",
    notes_description:"",
    notes_file:"",
    assignment:"",
    assignment_file:"",
    resources:[
        {
            title:"",
            type:"",
            file:""
        }
    ]
});

    setFormData({

        ...formData,

        modules:updated

    });

};

const removeLesson=(moduleIndex,lessonIndex)=>{

    const updated=[...formData.modules];

    updated[moduleIndex].lessons=
        updated[moduleIndex].lessons.filter(
            (_,i)=>i!==lessonIndex
        );

    setFormData({

        ...formData,

        modules:updated

    });

};

const updateLesson=(
    moduleIndex,
    lessonIndex,
    field,
    value
)=>{

    const updated=[...formData.modules];

    updated[moduleIndex]
        .lessons[lessonIndex][field]=value;

    setFormData({

        ...formData,

        modules:updated

    });

};
const addResource = (moduleIndex, lessonIndex) => {

    const updated = [...formData.modules];

    updated[moduleIndex]
        .lessons[lessonIndex]
        .resources.push({

            title:"",
            type:"",
            file:"",
            description: "",
            size:"",
            preview: false,

        });

    setFormData({

        ...formData,

        modules: updated

    });

};

const removeResource = (
    moduleIndex,
    lessonIndex,
    resourceIndex
) => {

    const updated = [...formData.modules];

    updated[moduleIndex]
        .lessons[lessonIndex]
        .resources =
        updated[moduleIndex]
            .lessons[lessonIndex]
            .resources.filter(
                (_, i) => i !== resourceIndex
            );

    setFormData({

        ...formData,

        modules: updated

    });

};

const updateResource = (
    moduleIndex,
    lessonIndex,
    resourceIndex,
    field,
    value
) => {

    const updated = [...formData.modules];

    updated[moduleIndex]
        .lessons[lessonIndex]
        .resources[resourceIndex][field] = value;

    setFormData({

        ...formData,

        modules: updated

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
      {/* =====================================================
COURSE MODULES
===================================================== */}

<div className="border-t pt-10 mt-10">

  <div className="flex justify-between items-center mb-6">

    <h3 className="text-2xl font-bold">
      Course Modules
    </h3>

    <button
      type="button"
      onClick={addModule}
      className="
        bg-red-600
        hover:bg-red-700
        text-white
        px-5
        py-3
        rounded-xl
      "
    >
      + Add Module
    </button>

  </div>

  {
    (formData.modules || []).map((module, moduleIndex) => (

      <div
        key={moduleIndex}
        className="
          border
          rounded-3xl
          p-6
          bg-gray-50
          mb-8
        "
      >

        {/* Module Header */}

        <div className="flex justify-between items-center mb-5">

          <h4 className="text-xl font-bold">

            Module {moduleIndex + 1}

          </h4>

          <button
            type="button"
            onClick={() => removeModule(moduleIndex)}
            className="text-red-600"
          >
            <Trash2 size={20} />
          </button>

        </div>

        {/* Module Title */}

        <input
          type="text"
          value={module.title}
          onChange={(e) =>
            updateModuleTitle(
              moduleIndex,
              e.target.value
            )
          }
          placeholder="Module Title"
          className="
            w-full
            border
            rounded-xl
            px-5
            py-4
            mb-6
          "
        />

        <div className="border-t pt-6">

  <div className="flex justify-between items-center mb-5">

    <h5 className="text-lg font-bold">
      Lessons
    </h5>

    <button
      type="button"
      onClick={() => addLesson(moduleIndex)}
      className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-4
        py-2
        rounded-lg
      "
    >
      + Add Lesson
    </button>

  </div>

  {
   (module.lessons || []).map((lesson, lessonIndex) => (

      <div
        key={lessonIndex}
        className="
          border
          rounded-2xl
          bg-white
          p-5
          mb-5
        "
      >

        <div className="flex justify-between items-center mb-4">

          <h6 className="font-bold">
            Lesson {lessonIndex + 1}
          </h6>

          <button
            type="button"
            onClick={() =>
              removeLesson(
                moduleIndex,
                lessonIndex
              )
            }
            className="text-red-600"
          >
            <Trash2 size={18}/>
          </button>

        </div>

        {/* Lesson Title */}

        <input
          type="text"
          value={lesson.title}
          onChange={(e)=>
            updateLesson(
              moduleIndex,
              lessonIndex,
              "title",
              e.target.value
            )
          }
          placeholder="Lesson Title"
          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            mb-4
          "
        />

        {/* Duration */}

        <input
          type="text"
          value={lesson.duration}
          onChange={(e)=>
            updateLesson(
              moduleIndex,
              lessonIndex,
              "duration",
              e.target.value
            )
          }
          placeholder="Duration (08:25)"
          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            mb-4
          "
        />

        {/* Video */}

        <input
          type="text"
          value={lesson.video}
          onChange={(e)=>
            updateLesson(
              moduleIndex,
              lessonIndex,
              "video",
              e.target.value
            )
          }
          placeholder="Video URL"
          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            mb-4
          "
        />

        {/* Description */}

        <textarea
          rows={4}
          value={lesson.description}
          onChange={(e)=>
            updateLesson(
              moduleIndex,
              lessonIndex,
              "description",
              e.target.value
            )
          }
          placeholder="Lesson Description"
          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        />
        <hr className="my-6"/>

<h4 className="text-lg font-bold mb-4">
Lesson Resources
</h4>

<button
    type="button"
    onClick={() =>
        addResource(moduleIndex, lessonIndex)
    }
    className="
        bg-green-600
        text-white
        px-4
        py-2
        rounded-lg
        mb-4
    "
>
    + Add Resource
</button>

{
(lesson.resources || []).map(
(resource, resourceIndex) => (

<div
key={resourceIndex}
className="
border
rounded-xl
p-4
mb-4
bg-gray-50
">

<div className="flex justify-between">

<h5 className="font-semibold">
Resource {resourceIndex+1}
</h5>

<button

type="button"

onClick={()=>

removeResource(

moduleIndex,

lessonIndex,

resourceIndex

)

}

className="text-red-600"

>

<Trash2 size={18}/>

</button>

</div>

<input

type="text"

placeholder="Title"

value={resource.title}

onChange={(e)=>

updateResource(

moduleIndex,

lessonIndex,

resourceIndex,

"title",

e.target.value

)

}

className="
w-full
border
rounded-xl
px-4
py-3
mt-3
mb-3
"

/>

<select

value={resource.type}

onChange={(e)=>

updateResource(

moduleIndex,

lessonIndex,

resourceIndex,

"type",

e.target.value

)

}

className="
w-full
border
rounded-xl
px-4
py-3
mb-3
"

>

<option value="">Select Type</option>

<option value="pdf">PDF</option>

<option value="zip">ZIP</option>

<option value="source">Source Code</option>

<option value="link">External Link</option>

</select>

<input

type="text"

placeholder="File URL"

value={resource.file}

onChange={(e)=>

updateResource(

moduleIndex,

lessonIndex,

resourceIndex,

"file",

e.target.value

)

}

className="
w-full
border
rounded-xl
px-4
py-3
"

/>

</div>

))
}

      </div>

    ))
  }

</div>

      </div>

    ))
  }

</div>
      <div className="mt-10 flex justify-between">

  <button
    onClick={goToPreviousTab}
    className="
      bg-gray-200
      hover:bg-gray-300
      px-8
      py-4
      rounded-2xl
      font-semibold
    "
  >
    ← Previous
  </button>

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
    "
  >
    Save & Next →
  </button>

</div>
    </div>
  );
}