export default function Projects() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">
        Industry <span className="text-red-600">Projects</span>
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {["Healthcare Analytics", "Finance Dashboard", "E-Commerce Analysis"]
          .map((p, i) => (
            <div key={i} className="border border-gray-700 p-5">
              {p}
            </div>
          ))}
      </div>
    </section>
  );
}
