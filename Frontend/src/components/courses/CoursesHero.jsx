import { motion } from "framer-motion";
import banner from "../../assets/banner_all.jpeg";

export default function CoursesHero() {
  return (
    <section className="relative h-[420px] flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <img
        src={banner}
        alt="Courses Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white">
          Our <span className="text-red-500">Courses</span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-gray-200 text-base md:text-lg">
          Industry-focused programs designed to make you job-ready with
          hands-on projects, expert mentors and placement support.
        </p>
      </motion.div>
    </section>
  );
}
