import CoursePreviewCard from "./CoursePreviewCard";

export default function CourseHero() {
  return (
    <section className="relative bg-[#0f0f12]">
      {/* HERO HEIGHT FIX */}
      <div className="max-w-[1200px] mx-auto px-6 pt-30 pb-10 relative">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-400 mb-4">
          IT & Software / Other IT & Software / DSA
        </p>

        {/* LEFT CONTENT */}
        <div className="max-w-[650px]">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            DSA with <span className="text-red-600">Python</span>
          </h1>

          <p className="mt-4 text-gray-300">
            Master Data Structures & Algorithms with Python through real
            projects and placement focused training.
          </p>

          <p className="mt-4 text-sm text-gray-400">
            Created by <span className="text-white">Programming Classes</span>
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Last updated 02/2026 • English • Hindi
          </p>

          {/* STATS */}
          <div className="mt-6 inline-flex items-center gap-6 bg-white/5 px-6 py-3 rounded-md">
            <span className="text-yellow-400 font-semibold">★ 4.8</span>
            <span className="text-gray-300">1200+ Students</span>
            <span className="text-gray-300">6 Months</span>
          </div>
        </div>

        {/* RIGHT PREVIEW CARD */}
        <CoursePreviewCard />
      </div>
    </section>
  );
}
