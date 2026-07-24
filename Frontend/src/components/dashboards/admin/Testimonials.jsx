import { useEffect, useState } from "react";
import api from "../../../services/api";

import TestimonialTable from "./TestimonialTable";
import TestimonialForm from "./TestimonialForm";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await api.get("/testimonials");

      if (response.data.success) {
        setTestimonials(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    setEditingTestimonial(null);
    setShowForm(true);
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;

    try {
      await api.delete(`/admin/testimonials/${id}`);

      fetchTestimonials();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* Header */}

     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Testimonials
          </h1>

          <p className="text-gray-500 mt-1">
            Manage student testimonials
          </p>
        </div>

       <button
  onClick={handleAdd}
  className="
    w-full
    sm:w-auto
    bg-red-600
    hover:bg-red-700
    text-white
    px-6
    py-3
    rounded-xl
    font-semibold
    transition
  "
>
  + Add Testimonial
</button>
      </div>

      {/* Table */}

      <TestimonialTable
        testimonials={testimonials}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Form */}

      {showForm && (
        <TestimonialForm
          testimonial={editingTestimonial}
          onSuccess={() => {
            fetchTestimonials();
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

    </div>
  );
}