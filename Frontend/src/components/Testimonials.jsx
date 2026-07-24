import { useEffect, useState } from "react";
import api from "../services/api";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    try {
      const response = await api.get("admin/testimonials");
      setTestimonials(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const items =
    testimonials.length > 0
      ? [...testimonials, ...testimonials, ...testimonials]
      : [];

  return (
    <section className="bg-[#f9fafb] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            What Our <span className="text-red-600">Students Say</span>
          </h2>

          <p className="text-gray-600 mt-3">
            Real feedback from our placed and learning students
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="flex gap-3 w-max animate-testimonial-marquee">

            {items.map((t, index) => (
  <div
    key={`${t.id}-${index}`}
                className="w-[280px] sm:w-[320px] lg:w-[360px] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)] hover:-translate-y-2 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full border-2 border-red-500 object-cover"
                  />

                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.course}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                  "{t.comment}"
                </p>

                <div className="mt-4 text-red-600 text-sm">
                  {"★".repeat(Number(t.rating))}
                  {"☆".repeat(5 - Number(t.rating))}
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}