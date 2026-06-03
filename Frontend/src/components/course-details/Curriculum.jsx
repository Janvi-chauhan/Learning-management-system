import { useState } from "react";

const syllabus = {
  "Python Basics": ["Syntax", "Loops", "Functions"],
  "DSA": ["Arrays", "Linked List", "Trees", "Graphs"],
};

export default function Curriculum() {
  const [open, setOpen] = useState(null);

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">
        Detailed <span className="text-red-600">Curriculum</span>
      </h2>

      {Object.entries(syllabus).map(([title, items], i) => (
        <div key={i} className="border border-gray-700 mb-3">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left p-4 font-semibold"
          >
            {title}
          </button>

          {open === i && (
            <div className="p-4 bg-[#0f0f0f] text-gray-300">
              {items.map((it, idx) => (
                <p key={idx}>• {it}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
