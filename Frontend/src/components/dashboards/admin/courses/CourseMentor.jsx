import {
  Plus,
  Trash2,
} from "lucide-react";

export default function CourseMentor({
  formData,
  setFormData,
  goToNextTab,
  goToPreviousTab,
}) {

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

const addProject = () => {
  setFormData({
    ...formData,
    projects: [
      ...formData.projects,
      {
        title: "",
        description: "",
      },
    ],
  });
};

const removeProject = (index) => {
  setFormData({
    ...formData,
    projects: formData.projects.filter(
      (_, i) => i !== index
    ),
  });
};

const updateProject = (
  index,
  field,
  value
) => {
  const updated = [...formData.projects];

  updated[index][field] = value;

  setFormData({
    ...formData,
    projects: updated,
  });
};

const addCertificate = () => {
  setFormData({
    ...formData,
    certifications: [
      ...formData.certifications,
      {
        title: "",
        image: "",
      },
    ],
  });
};

const removeCertificate = (
  index
) => {
  setFormData({
    ...formData,
    certifications:
      formData.certifications.filter(
        (_, i) => i !== index
      ),
  });
};

const updateCertificate = (
  index,
  field,
  value
) => {
  const updated = [
    ...formData.certifications,
  ];

  updated[index][field] = value;

  setFormData({
    ...formData,
    certifications: updated,
  });
};
  return (
    <div>

      {/* =====================================================
      TITLE
      ===================================================== */}

      <div className="mb-8">

        <h2 className="text-3xl font-black">
          Mentor, Projects & Certification
        </h2>

        <p className="text-gray-500 mt-2">
          Add mentor details 
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
      <div className="border-t pt-10">

  <div className="flex justify-between mb-6">

    <div>
      <h3 className="text-2xl font-bold">
        Industry Projects
      </h3>

      <p className="text-gray-500 mt-1">
        Add real-world projects.
      </p>
    </div>

    <button
      onClick={addProject}
      className="
        bg-red-600
        hover:bg-red-700
        text-white
        px-5 py-3
        rounded-2xl
        flex items-center gap-2
      "
    >
      <Plus size={18}/>
      Add Project
    </button>

  </div>

  <div className="space-y-5">

    {(formData.projects || []).map(
      (project, index) => (
      
      <div
        key={index}
        className="
          border
          rounded-3xl
          p-6
          bg-gray-50
        "
      >

        <div className="flex justify-between mb-4">

          <h4 className="font-bold">
            Project {index + 1}
          </h4>

          <button
            onClick={() =>
              removeProject(index)
            }
            className="
              bg-red-100
              text-red-600
              w-10 h-10
              rounded-xl
              flex items-center justify-center
            "
          >
            <Trash2 size={18}/>
          </button>

        </div>

        <input
          type="text"
          placeholder="Project Title"
          value={project.title}
          onChange={(e)=>
            updateProject(
              index,
              "title",
              e.target.value
            )
          }
          className="
            w-full
            border
            rounded-2xl
            px-5 py-4
            mb-4
          "
        />

        <textarea
          rows={4}
          placeholder="Project Description"
          value={project.description}
          onChange={(e)=>
            updateProject(
              index,
              "description",
              e.target.value
            )
          }
          className="
            w-full
            border
            rounded-2xl
            px-5 py-4
          "
        />

      </div>

    ))}

  </div>

</div>

<div className="border-t pt-10">

  <div className="flex justify-between mb-6">

    <div>

      <h3 className="text-2xl font-bold">
        Certification
      </h3>

      <p className="text-gray-500 mt-1">
        Add certificate details.
      </p>

    </div>

    <button
      onClick={addCertificate}
      className="
        bg-red-600
        hover:bg-red-700
        text-white
        px-5 py-3
        rounded-2xl
        flex items-center gap-2
      "
    >
      <Plus size={18}/>
      Add Certificate
    </button>

  </div>

  <div className="space-y-5">
    

    {(formData.certifications || []).map(
      (cert, index) => (

      <div
        key={index}
        className="
          border
          rounded-3xl
          p-6
          bg-gray-50
        "
      >

        <div className="flex justify-between mb-4">

          <h4 className="font-bold">
            Certificate {index + 1}
          </h4>

          <button
            onClick={() =>
              removeCertificate(index)
            }
            className="
              bg-red-100
              text-red-600
              w-10 h-10
              rounded-xl
              flex items-center justify-center
            "
          >
            <Trash2 size={18}/>
          </button>

        </div>

        <input
          type="text"
          placeholder="Certificate Title"
          value={cert.title}
          onChange={(e)=>
            updateCertificate(
              index,
              "title",
              e.target.value
            )
          }
          className="
            w-full
            border
            rounded-2xl
            px-5 py-4
            mb-4
          "
        />

        <input
          type="text"
          placeholder="Certificate Image / Drive Link"
          value={cert.image}
          onChange={(e)=>
            updateCertificate(
              index,
              "image",
              e.target.value
            )
          }
          className="
            w-full
            border
            rounded-2xl
            px-5 py-4
          "
        />

      </div>

    ))}

  </div>

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
