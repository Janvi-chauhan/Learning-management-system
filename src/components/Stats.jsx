import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { value: 25000, suffix: "+", label: "Students Trained" },
  { value: 5000, suffix: "+", label: "Placements" },
  { value: 25, suffix: "+", label: "Professional Courses" },
  { value: 50000, suffix: "+", label: "Learners Across Digital Platforms" },
  { value: 13, suffix: "+", label: "Years of Excellence" },
];

// 🔢 COUNTING EFFECT
function useCountUp(target, speed = 40) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(target / speed);

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [target, speed]);

  return count;
}

export default function Stats() {
  return (
    <section className="bg-gray-50 pt-0 pb-24">

      {/* TEXT */}
      <div className="text-center pt-20 pb-14 px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          India’s Most Trusted{" "}
          <span className="text-red-600">Coding Institute</span>
        </h2>

        <p className="text-gray-600 mt-3">
          Learn from industry experts and build your future with us
        </p>
      </div>

      {/* FULL WIDTH CARDS */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {stats.map((item, i) => {
            const count = useCountUp(item.value);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.06 }}
                className="
                  bg-white h-[160px]
                  flex flex-col items-center justify-center
                  shadow-[0_14px_40px_rgba(255,193,7,0.25)]
                  border border-gray-100
                  transition-all
                  relative overflow-hidden
                "
                style={{
                  clipPath: "polygon(0 0, 92% 0, 100% 18%, 100% 100%, 0 100%)",
                }}
              >
                <h3 className="text-3xl font-extrabold text-red-600">
                  {count.toLocaleString()}
                  {item.suffix}
                </h3>

                <p className="mt-2 text-gray-700 font-semibold text-sm text-center">
                  {item.label}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
