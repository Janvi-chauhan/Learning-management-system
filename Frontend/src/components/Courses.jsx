export default function Courses() {
  const courses = [
    "Foundation + Full Stack (MERN)",
    "DSA with C / C++",
    "DSA with Java",
    "DSA with Python",
    "Frontend Development",
    "Data Analysis"
  ];

  return (
    <section className="bg-gray-100 py-16 px-10">
      <h2 className="text-4xl font-bold text-center mb-10">
        Job Oriented Courses
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((c, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="font-semibold">{c}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
