import sir from "../assets/sir.png";
import vector from "../assets/vector.png"; // background design image

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white">

      {/* ✅ RIGHT SIDE FULL SCREEN BACKGROUND */}
      <div
        className="
          absolute top-0 right-0 h-full w-1/2
          bg-no-repeat bg-right-bottom bg-contain
        "
        style={{ backgroundImage: `url(${vector})` }}
      ></div>

      {/* ✅ SIR IMAGE — SCREEN RIGHT + BOTTOM */}
      <img
        src={sir}
        alt="Instructor"
        className="
          absolute right-0 bottom-0
          w-[220px] sm:w-[360px] lg:w-[480px]
          object-contain
          z-20
        "
      />

      {/* ✅ CENTER CONTENT ONLY */}
      <div
        className="
          relative max-w-7xl mx-auto
          px-6 md:px-12 lg:px-20
          + min-h-[70vh] lg:min-h-[80vh]
          flex items-center
        "
      >
        <div>
          <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-tight text-black">
            Not Just Learning, <br />
            Building Skills
          </h1>

          <p className="mt-3 text-[17px] sm:text-[19px] font-bold text-red-600">
            Skills Jha, Job Waha
          </p>

          <button
            className="
              mt-6 px-9 py-3 rounded-xl
              bg-gradient-to-r from-red-600 to-red-700
              text-white font-bold
              shadow-xl shadow-red-400
              hover:scale-105 transition-all
            "
          >
            Join New Batch
          </button>
        </div>
      </div>

    </section>
  );
}
