import { motion } from "framer-motion";
import banner from "../../assets/banner_all.jpeg";

export default function CourseHero({ course }) {
  return (
    <section className="relative h-[420px] flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <img
        src={course?.image || banner}
        alt={course?.title || "Course Banner"}
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

          {course?.title || "Course Title"}

        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-gray-200 text-base md:text-lg">

          {course?.description ||
            "No course description available."}

        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <span className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-white">

            Category:
            {" "}
            {course?.category || "N/A"}

          </span>

          <span className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-white">

            Duration:
            {" "}
            {course?.duration || "N/A"}

          </span>

          <span className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-white">

            Timing:
            {" "}
            {course?.timing || "N/A"}

          </span>

        </div>
      </motion.div>

    </section>
  );
}