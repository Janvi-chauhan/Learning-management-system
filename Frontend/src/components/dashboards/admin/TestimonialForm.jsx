import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function TestimonialForm({
  testimonial,
  onSuccess,
  onCancel,
}) {
  const [form, setForm] = useState({
    name: "",
    course: "",
    comment: "",
    rating: 5,
    image: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setForm({
        name: testimonial.name || "",
        course: testimonial.course || "",
        comment: testimonial.comment || "",
        rating: testimonial.rating || 5,
        image: testimonial.image || "",
      });
    }
  }, [testimonial]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (testimonial) {
        await api.put(
          `/admin/testimonials/${testimonial.id}`,
          form
        );
      } else {
        await api.post(
          "/admin/testimonials",
          form
        );
      }

      alert(
        testimonial
          ? "Testimonial Updated Successfully"
          : "Testimonial Added Successfully"
      );

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-xl p-6 shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
          {testimonial
            ? "Edit Testimonial"
            : "Add Testimonial"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="font-medium">
              Student Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="font-medium">
              Course
            </label>

            <input
              type="text"
              name="course"
              value={form.course}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="font-medium">
              Comment
            </label>

            <textarea
              rows={4}
              name="comment"
              value={form.comment}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg px-4 py-3 resize-none"
            />
          </div>

          <div>
            <label className="font-medium">
              Rating
            </label>

            <select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg px-4 py-3"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>

          <div>
            <label className="font-medium">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full mt-2 border rounded-lg px-4 py-3"
            />
          </div>

          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border"
            />
          )}

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-red-600 text-white"
            >
              {loading
                ? "Saving..."
                : testimonial
                ? "Update"
                : "Save"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}