// import { useRef, useEffect } from "react";

// const courses = [
//   {
//     tag: "Job Ready",
//     title: "Backend with Java",
//     desc: "Spring Boot, REST API, Security, DB",
//     img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
//   },
//   {
//     tag: "New",
//     title: "Python + Data Analysis",
//     desc: "Python, Pandas, Excel, Projects",
//     img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
//   },
//   {
//     tag: "Trending",
//     title: "Full Stack Developer",
//     desc: "React, Node, MongoDB, Projects",
//     img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
//   },
//   {
//     tag: "Popular",
//     title: "Frontend Mastery",
//     desc: "HTML, CSS, JS, React, UI Projects",
//     img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
//   },
// ];

// export default function LatestCourses() {
//   const sliderRef = useRef(null);

//   // 🔁 DUPLICATE FOR INFINITE LOOP
//   const displayCourses = [...courses, ...courses];

//   // 🔁 CONTINUOUS AUTO SLIDE
//   useEffect(() => {
//     const slider = sliderRef.current;

//     const interval = setInterval(() => {
//       if (!slider) return;

//       slider.scrollLeft += 1.2; // speed

//       if (slider.scrollLeft >= slider.scrollWidth / 2) {
//         slider.scrollLeft = 0; // reset for infinite feel
//       }
//     }, 20);

//     return () => clearInterval(interval);
//   }, []);

//   const scroll = (dir) => {
//     sliderRef.current.scrollBy({
//       left: dir === "left" ? -360 : 360,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="bg-[#fffdf9] py-20 relative overflow-hidden">

//       {/* TITLE */}
//       <div className="text-center mb-14 px-4">
//         <h2 className="text-3xl md:text-4xl font-extrabold">
//           Latest <span className="text-red-600">Job-Ready Courses</span>
//         </h2>
//         <p className="text-gray-600 mt-3">
//           Industry focused programs with live projects & placement support
//         </p>
//       </div>

//       {/* LEFT ARROW */}
//       {/* <button
//         onClick={() => scroll("left")}
//         className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20
//         bg-white shadow-2xl w-12 h-12 rounded-full items-center justify-center
//         hover:scale-110 transition"
//       >
//         ‹
//       </button> */}

//       {/* RIGHT ARROW */}
//       {/* <button
//         onClick={() => scroll("right")}
//         className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20
//         bg-white shadow-2xl w-12 h-12 rounded-full items-center justify-center
//         hover:scale-110 transition"
//       >
//         ›
//       </button> */}

//       {/* SLIDER */}
//       <div
//         ref={sliderRef}
//         className="flex gap-8 px-6 md:px-20 overflow-x-scroll no-scrollbar"
//       >
//         {displayCourses.map((c, i) => (
//           <div
//             key={i}
//             className="
//               min-w-[300px] md:min-w-[340px]
//               bg-white
//               shadow-[0_25px_60px_rgba(0,0,0,0.18)]
//               hover:shadow-[0_35px_80px_rgba(0,0,0,0.28)]
//               hover:-translate-y-3 transition-all duration-300
//             "
//           >
//             {/* IMAGE */}
//             <div className="relative">
//               <img
//                 src={c.img}
//                 alt=""
//                 className="h-[190px] w-full object-cover"
//               />

//               <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 shadow">
//                 {c.tag}
//               </span>
//             </div>

//             {/* CONTENT */}
//             <div className="p-6">
//               <h3 className="text-lg font-bold">{c.title}</h3>
//               <p className="text-sm text-gray-600 mt-1">{c.desc}</p>

//               <button
//                 className="
//                   mt-5 w-full py-3
//                   bg-gradient-to-r from-red-600 to-red-700
//                   text-white font-semibold
//                   hover:scale-105 transition
//                 "
//               >
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }





// import { useRef, useEffect } from "react";

// const courses = [
//   {
//     tag: "Job Ready",
//     title: "Backend with Java",
//     desc: "Spring Boot, REST API, Security, DB",
//     img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
//   },
//   {
//     tag: "New",
//     title: "Python + Data Analysis",
//     desc: "Python, Pandas, Excel, Projects",
//     img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
//   },
//   {
//     tag: "Trending",
//     title: "Full Stack Developer",
//     desc: "React, Node, MongoDB, Projects",
//     img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
//   },
//   {
//     tag: "Popular",
//     title: "Frontend Mastery",
//     desc: "HTML, CSS, JS, React, UI Projects",
//     img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
//   },
// ];

// export default function LatestCourses() {
//   const sliderRef = useRef(null);

//   const displayCourses = [...courses, ...courses];

//   // 🔁 CONTINUOUS AUTO SLIDE
//   useEffect(() => {
//     const slider = sliderRef.current;
//     if (!slider) return;

//     const interval = setInterval(() => {
//       slider.scrollLeft += 1.2;

//       if (slider.scrollLeft >= slider.scrollWidth / 2) {
//         slider.scrollLeft = 0;
//       }
//     }, 20);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="bg-[#fffdf9] py-20">

//       {/* ===== FIXED WIDTH WRAPPER ===== */}
//       <div className="max-w-[1440px] mx-auto">

//         {/* TITLE */}
//         <div className="text-center mb-14 px-6">
//           <h2 className="text-3xl md:text-4xl font-extrabold">
//             Latest <span className="text-red-600">Job-Ready Courses</span>
//           </h2>
//           <p className="text-gray-600 mt-3">
//             Industry focused programs with live projects & placement support
//           </p>
//         </div>

//         {/* SLIDER */}
//         <div
//           ref={sliderRef}
//           className="
//             flex gap-8
//             px-6 md:px-12
//             overflow-x-scroll no-scrollbar
//           "
//         >
//           {displayCourses.map((c, i) => (
//             <div
//               key={i}
//               className="
//                 min-w-[300px] md:min-w-[340px]
//                 bg-white
//                 shadow-[0_25px_60px_rgba(0,0,0,0.18)]
//                 hover:shadow-[0_35px_80px_rgba(0,0,0,0.28)]
//                 hover:-translate-y-3
//                 transition-all duration-300
//               "
//             >
//               {/* IMAGE */}
//               <div className="relative">
//                 <img
//                   src={c.img}
//                   alt={c.title}
//                   className="h-[190px] w-full object-cover"
//                 />
//                 <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 shadow">
//                   {c.tag}
//                 </span>
//               </div>

//               {/* CONTENT */}
//               <div className="p-6">
//                 <h3 className="text-lg font-bold">{c.title}</h3>
//                 <p className="text-sm text-gray-600 mt-1">{c.desc}</p>

//                 <button
//                   className="
//                     mt-5 w-full py-3
//                     bg-gradient-to-r from-red-600 to-red-700
//                     text-white font-semibold
//                     hover:scale-105 transition
//                   "
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }


// const courses = [
//   {
//     tag: "Job Ready",
//     title: "Backend with Java",
//     desc: "Spring Boot, REST API, Security, DB",
//     img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
//   },
//   {
//     tag: "New",
//     title: "Python + Data Analysis",
//     desc: "Python, Pandas, Excel, Projects",
//     img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
//   },
//   {
//     tag: "Trending",
//     title: "Full Stack Developer",
//     desc: "React, Node, MongoDB, Projects",
//     img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
//   },
//   {
//     tag: "Popular",
//     title: "Frontend Mastery",
//     desc: "HTML, CSS, JS, React, UI Projects",
//     img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
//   },
// ];

// export default function LatestCourses() {
//   const list = [...courses, ...courses, ...courses]; // MUST duplicate

//   return (
//     <section className="bg-[#fffdf9] py-24 overflow-hidden">
//       <div className="max-w-7xl mx-auto">

//         {/* TITLE */}
//         <div className="text-center mb-14 px-6">
//           <h2 className="text-3xl md:text-4xl font-extrabold">
//             Latest <span className="text-red-600">Job-Ready Courses</span>
//           </h2>
//           <p className="text-gray-600 mt-3">
//             Industry focused programs with live projects & placement support
//           </p>
//         </div>

//         {/* MARQUEE */}
//         <div className="relative w-full overflow-hidden">
//           <div className="flex gap-2 animate-marquee-ltr w-max">

//             {list.map((c, i) => (
//               <div
//                 key={i}
//                 className="
//                   w-[280px] md:w-[300px] lg:w-[320px]
//                   bg-white
//                   shadow-[0_20px_45px_rgba(0,0,0,0.15)]
//                   hover:-translate-y-2 transition
//                   flex-shrink-0
//                 "
//               >
//                 <div className="relative">
//                   <img
//                     src={c.img}
//                     alt={c.title}
//                     className="h-[180px] w-full object-cover"
//                   />
//                   <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1">
//                     {c.tag}
//                   </span>
//                 </div>

//                 <div className="p-5">
//                   <h3 className="text-base font-bold">{c.title}</h3>
//                   <p className="text-sm text-gray-600 mt-1">{c.desc}</p>

//                   <button className="mt-4 w-full py-2.5 bg-red-600 text-white font-semibold">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))}

//           </div>
//         </div>

//       </div>
//     </section>

//   );
// }


const courses = [
  {
    id: 8,
    createdAt: "2026-08-01",
    tag: "Latest",
    title: "AI + Prompt Engineering",
    desc: "ChatGPT, Gemini, AI Apps, Automation",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },

  {
    id: 7,
    createdAt: "2026-07-28",
    tag: "Trending",
    title: "MERN Full Stack",
    desc: "React, Node, MongoDB, Express",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },

  {
    id: 6,
    createdAt: "2026-07-22",
    tag: "New",
    title: "DSA with C++",
    desc: "Arrays, Trees, Graphs, STL",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  },

  {
    id: 5,
    createdAt: "2026-07-18",
    tag: "Job Ready",
    title: "Backend with Java",
    desc: "Spring Boot, REST API, Security",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },

  {
    id: 4,
    createdAt: "2026-07-10",
    tag: "Popular",
    title: "Frontend Mastery",
    desc: "HTML, CSS, JS, React",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },

  {
    id: 3,
    createdAt: "2026-07-02",
    tag: "New",
    title: "Python + Data Analysis",
    desc: "Python, Pandas, Excel, Projects",
    img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
  },

  {
    id: 2,
    createdAt: "2026-06-25",
    tag: "Trending",
    title: "Web Development Bootcamp",
    desc: "Frontend + Backend Complete",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },

  {
    id: 1,
    createdAt: "2026-06-15",
    tag: "Old",
    title: "C Programming",
    desc: "Programming Fundamentals",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  },
];

export default function LatestCourses() {

  // SORT NEWEST FIRST
  const latestCourses = [...courses]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 7); // KEEP ONLY LATEST 7

  // DUPLICATE FOR MARQUEE
  const list = [
    ...latestCourses,
    ...latestCourses,
  ];

  return (
    <section className="bg-[#fffdf9] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-14 px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Latest{" "}
            <span className="text-red-600">
              Job-Ready Courses
            </span>
          </h2>

   
        </div>

        {/* MARQUEE */}
        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-marquee-ltr w-max">

            {list.map((c, i) => (
              <div
                key={i}
                className="
                  w-[300px]
                  bg-white
                  rounded-2xl
                  overflow-hidden
                  shadow-lg
                  hover:-translate-y-2
                  transition-all duration-300
                  flex-shrink-0
                "
              >
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="h-[190px] w-full object-cover"
                  />

                  <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {c.tag}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="text-lg font-bold">
                    {c.title}
                  </h3>

                  <p className="text-sm text-gray-600 mt-2">
                    {c.desc}
                  </p>

                  <button className="mt-5 w-full py-3 bg-red-600 hover:bg-red-700 transition text-white font-semibold rounded-xl">
                    View Details
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}