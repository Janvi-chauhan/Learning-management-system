
const testimonials = [
  {
    name: "Rahul Kumar",
    course: "Full Stack Developer",
    comment:
      "Programming Classes helped me crack my first IT job. Trainers are very supportive and teaching style is excellent.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Priya Singh",
    course: "Data Analyst",
    comment:
      "Best institute in Bihar for coding. Live projects and interview preparation helped me a lot.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Amit Verma",
    course: "Frontend Developer",
    comment:
      "After completing React course, I got placed within 2 months. Highly recommended.",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 4,
  },
  {
    name: "Neha Sharma",
    course: "Python Developer",
    comment:
      "Faculty is very friendly and explains concepts from basics. Very helpful for beginners.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
];

export default function Testimonials() {
  const items = [...testimonials, ...testimonials, ...testimonials]; // HARD DUPLICATE

  return (
    <section className="bg-[#f9fafb] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            What Our <span className="text-red-600">Students Say</span>
          </h2>
          <p className="text-gray-600 mt-3">
            Real feedback from our placed and learning students
          </p>
        </div>

        {/* MARQUEE */}
        <div className="overflow-hidden">
          <div className="flex gap-3 w-max animate-testimonial-marquee">

            {items.map((t, i) => (
              <div
                key={i}
                className="
                  w-[280px] sm:w-[320px] lg:w-[360px]
                  bg-white p-6
                  shadow-[0_20px_50px_rgba(0,0,0,0.18)]
                  hover:-translate-y-2 transition
                "
              >
                {/* USER */}
                <div className="flex items-center gap-4">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-14 h-14 rounded-full border-2 border-red-500"
                  />
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.course}</p>
                  </div>
                </div>

                {/* COMMENT */}
                <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                  “{t.comment}”
                </p>

                {/* RATING */}
                <div className="mt-4 text-red-600 text-sm">
                  {"★".repeat(t.rating)}
                  {"☆".repeat(5 - t.rating)}
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
