import { useEffect, useState } from "react";
import api from "../services/api"; // adjust path

export default function LatestCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/admin/courses");
      console.log(response.data.data); // same API as Courses page

      if (response.data.success) {
        setCourses(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const latestCourses = courses
  .filter(course => course.latest)
  .sort(
    (a, b) =>
      new Date(b.created_at) - new Date(a.created_at)
  )
  .slice(0, 7);

  // DUPLICATE FOR MARQUEE
  const list = [
    ...latestCourses,
    ...latestCourses,
  ];

  return (
    <section id= "courses" className="bg-[#fffdf9] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-14 px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold font-sans">
            Latest{" "}
            <span className="text-red-600">
              Job-Ready Courses
            </span>
          </h2>
          <p className="mt-3 text-gray-600 font-sans leading-relaxed">
            Industry focused programs with live projects & placement support
          </p>

   
        </div>

        {/* MARQUEE */}
        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-marquee-ltr w-max">

            {list.map((c, i) => (
              <div
                key={i}
                className="
                  w-[300px]
                  bg-white
                  rounded-2xl
                  overflow-hidden
                  shadow-lg
                  hover:-translate-y-2
                  transition-all duration-300
                  flex-shrink-0
                "
              >
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    className="h-[190px] w-full object-cover"
                    onError={(e) => {
    e.target.src = "/placeholder-course.jpg"; // optional fallback
  }}
                  />

                  <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {c.latest ? "Latest" : c.category}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="text-lg font-bold">
                    {c.title}
                  </h3>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
  {c.description}
</p>

                  <button className="mt-5 w-full py-3 bg-red-600 hover:bg-red-700 transition text-white font-semibold rounded-xl">
                    View Details
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}