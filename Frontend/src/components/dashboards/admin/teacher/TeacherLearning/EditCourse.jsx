import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../../../services/api";

export default function EditCourse() {

  const { courseId } = useParams();

  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    duration: "",
  });

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {

      const res = await api.get(
        `/teacher/courses/${courseId}`
      );

      setCourse({
        title: res.data.data.title,
        description: res.data.data.description,
        duration: res.data.data.duration,
      });

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      await api.put(
        `/teacher/courses/${courseId}`,
        course
      );

      alert("Course updated.");

      navigate(`/teacher/course/${courseId}`);

    } catch (err) {

      console.log(err);

      alert("Update failed.");

    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-5">
        Edit Course
      </h2>

      <form
        onSubmit={handleUpdate}
        className="space-y-4"
      >

        <input
          className="w-full border p-3 rounded"
          name="title"
          value={course.title}
          onChange={handleChange}
        />

        <textarea
          className="w-full border p-3 rounded"
          name="description"
          value={course.description}
          onChange={handleChange}
        />

        <input
          className="w-full border p-3 rounded"
          name="duration"
          value={course.duration}
          onChange={handleChange}
        />

        <button
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
}