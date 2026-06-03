import banner from "../../assets/banner_all.jpeg";
import ResultGrid from "./ResultGrid";

export default function Result() {
  return (
    <section className="w-full bg-[#f7f7f7]">

      {/* ======= HERO BANNER ======= */}
      <div
        className="relative w-full h-[260px] md:h-[320px] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* TEXT */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Our <span className="text-red-500">Results</span>
          </h2>

          <p className="text-gray-200 mt-3">
            Our students placed in top companies
          </p>
        </div>
      </div>

      {/* ======= GRID ======= */}
      <div className="max-w-[1200px] mx-auto px-4 py-16">
        <ResultGrid />
      </div>

    </section>
  );
}
