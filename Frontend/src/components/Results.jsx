export default function Results() {
  return (
    <section className="py-16 px-10">
      <h2 className="text-4xl font-bold text-center mb-10">
        Our Results
      </h2>

      <div className="grid md:grid-cols-4 gap-6 text-center">
        {["Google", "Amazon", "Microsoft", "Samsung"].map((c, i) => (
          <div key={i} className="p-6 shadow rounded-lg">
            <h3 className="font-bold">{c}</h3>
            <p className="text-sm">Intern / SDE</p>
          </div>
        ))}
      </div>
    </section>
  );
}
