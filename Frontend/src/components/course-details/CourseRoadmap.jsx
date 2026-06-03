export default function CourseRoadmap() {
  const steps = [
    {
      title: "Python Basics",
      desc: "Syntax, variables, loops, functions and core foundations",
    },
    {
      title: "DSA Core",
      desc: "Arrays, strings, linked list, stack, queue & recursion",
    },
    {
      title: "Advanced Algorithms",
      desc: "Trees, graphs, hashing, dynamic programming",
    },
    {
      title: "Real-World Projects",
      desc: "Problem solving with real datasets & scenarios",
    },
    {
      title: "Placement Preparation",
      desc: "Mock interviews, resume building & company patterns",
    },
  ];

  return (
    <section className="mt-20">
      <h2 className="text-3xl font-bold mb-10">
        Course <span className="text-red-600">Roadmap</span>
      </h2>

      <div className="relative border-l-2 border-red-600 pl-8 space-y-10">
        {steps.map((step, index) => (
          <div key={index} className="relative group">
            {/* DOT */}
            <div className="absolute -left-[41px] top-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {index + 1}
            </div>

            {/* CARD */}
            <div className="bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition w-full">
              <h3 className="text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-400 mt-2 text-sm">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
