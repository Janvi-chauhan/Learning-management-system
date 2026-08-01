
import { useEffect, useState } from "react";
import sir from "../assets/sir.png";
import logo from "../assets/logo.png"
// import vector from "../assets/vector.png";

const courses = [
  "C For Your Core Foundation",
  "C++ , JAVA, PYTHON",
  "Full Stack Development",
  "Frontend Development",
  "Data Analysis With Gen-AI",
  "Java Backend Development",
  "DSA with C / C++ / Java / Python",
];

export default function Hero() {
  const [text, setText] = useState("");
  const [courseIndex, setCourseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = courses[courseIndex];
    const speed = isDeleting ? 60 : 120;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1));
        if (text === current) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setText(current.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setCourseIndex((prev) => (prev + 1) % courses.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, courseIndex]);

  return (
    <section id="home" className="relative w-full bg-white pt-[90px] overflow-hidden">

      {/* ================= DESKTOP / LAPTOP ================= */}
      <div className="hidden lg:block relative h-[calc(100vh-90px)]">

        {/* RIGHT FIXED BANNER AREA */}
<div className="absolute top-0 right-0 h-full w-[55vw] min-w-[620px] max-w-[900px]">
  {/* Background Vector */}
  {/* <img
    src={vector}
    alt="vector"
    className="absolute inset-0 w-full h-full object-cover"
  /> */}

  {/* Banner Image */}
  <img
  src={logo}
  alt="Banner"
  className="
    absolute
    top-8
    right-0
    w-[88%]
    max-w-[760px]
    h-auto
    object-contain
    drop-shadow-2xl
    pointer-events-none
  "
/>
</div>

        {/* LEFT CONTENT SAFE ZONE */}
        <div className="relative z-10 h-full">
          <div className="max-w-[1200px] mx-auto px-1 h-full flex items-start pt-28">
           <div className="max-w-xl ">
              <h1 className="text-5xl xl:text-6xl font-bold font-sans leading-tight text-black">
                Not Just Learning, <br />
                Building Skills
              </h1>

              <p className="mt-4 text-lg xl:text-xl font-bold  text-red-600">
                Most Trusted Coding Institute
              </p>

              <p className="mt-2 text-xl xl:text-2xl font-semibold text-black min-h-[32px]">
                {text}
                <span className="text-red-600 font-bold font-sans" >|</span>
              </p>

              <button className="mt-8 px-10 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white text-lg font-bold shadow-xl shadow-red-400 hover:scale-105 transition-all">
                Join New Batch
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE ONLY ================= */}
<div className="block md:hidden">
  <div className="max-w-xl mx-auto px-6 pt-8 pb-12 text-center">

    <h1 className="text-4xl font-extrabold leading-tight text-black">
      Not Just Learning,
      <br />
      Building Skills
    </h1>

    <p className="mt-5 text-lg font-bold text-red-600">
      Most Trusted Coding Institute
    </p>

    <p className="mt-4 text-lg font-semibold text-gray-800 min-h-[55px]">
      {text}
      <span className="text-red-600">|</span>
    </p>

    <button className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-lg hover:scale-105 transition">
      Join New Batch
    </button>

  </div>
</div>
      {/* ================= TABLET ONLY (md → lg) ================= */}
      <div className="hidden md:block lg:hidden w-full bg-white">

        <div className="grid grid-cols-2 items-center min-h-[500px] px-6">
          {/* LEFT – TEXT */}
          <div className="px-8">
            <h1 className="-mt-2 text-[34px] font-bold leading-tight text-black">
              Not Just Learning, <br />
              Building Skills
            </h1>

            <p className="mt-4 text-[18px] font-bold text-red-600">
              Most Trusted Coding Institute
            </p>

            <p className="mt-2 text-[18px] font-semibold text-black min-h-[28px]">
              {text}
              <span className="text-red-600">|</span>
            </p>

            <button className="mt-6 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white text-lg font-bold shadow-xl shadow-red-400">
              Join New Batch
            </button>
          </div>

          {/* RIGHT – IMAGE + RED BANNER */}
          <div className="relative h-full overflow-hidden">

            {/* RED VECTOR */}
            {/* <img
              src={vector}
              alt="vector"
              className="absolute inset-0 w-full h-full object-cover"
            /> */}

            {/* BANNER IMAGE*/}
            <img
  src={logo}
  alt="Banner"
  className="
  absolute
  top-6
  right-0
  w-[90%]
  h-auto
  object-contain
  drop-shadow-2xl
"
/>
            
          </div>

        </div>
      </div>
    </section>
  );
}
