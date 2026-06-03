// import { useRef, useEffect } from "react";

// const placements = [
//   {
//     name: "Amar Kumar",
//     role: "Frontend Developer",
//     company: "Infosys",
//     date: "July 2025",
//     tech: "React",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
//     img: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1",
//   },
//   {
//     name: "Priya Sharma",
//     role: "Data Analyst",
//     company: "TCS",
//     date: "May 2025",
//     tech: "Python",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Tata_Consultancy_Services_Logo.svg",
//     img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
//   },
//   {
//     name: "Rahul Verma",
//     role: "Backend Engineer",
//     company: "Wipro",
//     date: "June 2025",
//     tech: "Java",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
//     img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
//   },
//   {
//     name: "Neha Singh",
//     role: "Full Stack Dev",
//     company: "Accenture",
//     date: "Aug 2025",
//     tech: "MERN",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
//     img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
//   },
// ];

// export default function LatestPlacements() {
//   const sliderRef = useRef(null);
//   const displayData = [...placements, ...placements];

//   // 🔁 AUTO RIGHT ➝ LEFT
//   useEffect(() => {
//     const slider = sliderRef.current;

//     const interval = setInterval(() => {
//       if (!slider) return;

//       slider.scrollLeft -= 1.3;

//       if (slider.scrollLeft <= 0) {
//         slider.scrollLeft = slider.scrollWidth / 2;
//       }
//     }, 20);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="bg-white py-24 relative overflow-hidden">

//       {/* TITLE */}
//       <div className="text-center mb-14 px-4">
//         <h2 className="text-3xl md:text-4xl font-extrabold">
//           Latest <span className="text-red-600">Placements</span>
//         </h2>
//         <p className="text-gray-600 mt-3">
//           Our students placed in top companies with great packages
//         </p>
//       </div>

//       {/* SLIDER */}
//       <div
//         ref={sliderRef}
//         className="flex gap-8 px-6 md:px-20 overflow-x-scroll no-scrollbar"
//       >
//         {displayData.map((p, i) => (
//           <div
//             key={i}
//             className="
//               relative min-w-[260px] md:min-w-[300px] h-[380px]
//               overflow-hidden
//               shadow-[0_30px_80px_rgba(0,0,0,0.35)]
//               group
//             "
//           >
//             {/* IMAGE */}
//             <img
//               src={p.img}
//               alt="student"
//               className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//             />

//             {/* DARK + RED BACKDROP */}
//             <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-black/70 to-transparent"></div>

//             {/* DETAILS */}
//             <div
//               className="absolute bottom-0 w-full p-5 text-white
//               translate-y-[140px] group-hover:translate-y-0
//               transition-all duration-500"
//             >
//               <h3 className="text-lg font-extrabold tracking-wide">
//                 {p.name}
//               </h3>

//               <p className="text-sm mt-1 opacity-90">
//                 {p.role}
//               </p>

//               {/* COMPANY */}
//               <div className="flex items-center gap-2 mt-3">
//                 <img
//                   src={p.logo}
//                   alt={p.company}
//                   className="h-5 bg-white px-1 py-[2px]"
//                 />
//                 <span className="font-bold text-red-300 text-sm">
//                   {p.company}
//                 </span>
//               </div>

//               {/* FOOT */}
//               <div className="flex justify-between items-center mt-4 text-xs">
//                 <span className="opacity-90">Joined: {p.date}</span>
//                 <span className="bg-red-600 px-3 py-1 font-semibold">
//                   {p.tech}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }







// import { useRef, useEffect } from "react";

// const placements = [
//   {
//     name: "Amar Kumar",
//     role: "Frontend Developer",
//     company: "Infosys",
//     date: "July 2025",
//     tech: "React",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
//     img: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1",
//   },
//   {
//     name: "Priya Sharma",
//     role: "Data Analyst",
//     company: "TCS",
//     date: "May 2025",
//     tech: "Python",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Tata_Consultancy_Services_Logo.svg",
//     img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
//   },
//   {
//     name: "Rahul Verma",
//     role: "Backend Engineer",
//     company: "Wipro",
//     date: "June 2025",
//     tech: "Java",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
//     img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
//   },
//   {
//     name: "Neha Singh",
//     role: "Full Stack Dev",
//     company: "Accenture",
//     date: "Aug 2025",
//     tech: "MERN",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
//     img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
//   },
// ];

// export default function LatestPlacements() {
//   const sliderRef = useRef(null);
//   const displayData = [...placements, ...placements, ...placements];

//   useEffect(() => {
//     const slider = sliderRef.current;
//     let rafId;

//     const animate = () => {
//       if (!slider) return;

//       slider.scrollLeft += 0.7;

//       if (slider.scrollLeft >= slider.scrollWidth / 3) {
//         slider.scrollLeft = 0;
//       }

//       rafId = requestAnimationFrame(animate);
//     };

//     rafId = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(rafId);
//   }, []);

//   return (
//     <section className="bg-white py-24 overflow-hidden">

//       {/* ✅ CENTERED CONTAINER */}
//       <div className="max-w-[1440px] mx-auto px-6">

//         {/* TITLE */}
//         <div className="text-center mb-14">
//           <h2 className="text-3xl md:text-4xl font-extrabold">
//             Latest <span className="text-red-600">Placements</span>
//           </h2>
//           <p className="text-gray-600 mt-3">
//             Our students placed in top companies with great packages
//           </p>
//         </div>

//         {/* SLIDER */}
//         <div
//           ref={sliderRef}
//           className="
//             flex gap-8
//             overflow-x-scroll no-scrollbar
//             pb-6
//           "
//         >
//           {displayData.map((p, i) => (
//             <div
//               key={i}
//               className="
//                 relative
//                 min-w-[280px] sm:min-w-[300px] lg:min-w-[320px]
//                 h-[400px]
//                 overflow-hidden
//                 shadow-[0_30px_80px_rgba(0,0,0,0.35)]
//                 group
//                 rounded-lg
//                 flex-shrink-0
//               "
//             >
//               <img
//                 src={p.img}
//                 alt={p.name}
//                 className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-black/70 to-transparent" />

//               <div className="
//                 absolute bottom-0 w-full p-5 text-white
//                 translate-y-[140px] group-hover:translate-y-0
//                 transition-all duration-500
//               ">
//                 <h3 className="text-lg font-extrabold">{p.name}</h3>
//                 <p className="text-sm mt-1">{p.role}</p>

//                 <div className="flex items-center gap-2 mt-3">
//                   <img src={p.logo} alt={p.company} className="h-5 bg-white px-1 py-[2px]" />
//                   <span className="font-bold text-red-300 text-sm">
//                     {p.company}
//                   </span>
//                 </div>

//                 <div className="flex justify-between items-center mt-4 text-xs">
//                   <span>Joined: {p.date}</span>
//                   <span className="bg-red-600 px-3 py-1 font-semibold">
//                     {p.tech}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }



const placements = [
  {
    name: "Amar Kumar",
    role: "Frontend Developer",
    company: "Infosys",
    tech: "React",
    img: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1",
  },
  {
    name: "Priya Sharma",
    role: "Data Analyst",
    company: "TCS",
    tech: "Python",
    img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
  },
  {
    name: "Rahul Verma",
    role: "Backend Engineer",
    company: "Wipro",
    tech: "Java",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
  {
    name: "Neha Singh",
    role: "Full Stack Dev",
    company: "Accenture",
    tech: "MERN",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  },
];

export default function LatestPlacements() {
  const items = [...placements, ...placements, ...placements];

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Latest <span className="text-red-600">Placements</span>
          </h2>
          <p className="text-gray-600 mt-3">
            Our students placed in top companies with great packages
          </p>
        </div>

        {/* MARQUEE */}
        <div className="overflow-hidden">
          <div className="flex gap-2 w-max animate-marquee-rtl">

            {items.map((p, i) => (
              <div
                key={i}
                className="w-[300px] h-[420px] relative overflow-hidden shadow-2xl"
              >
                <img
                  src={p.img}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-black/70 to-transparent" />
                <div className="absolute bottom-0 p-5 text-white">
                  <h3 className="font-extrabold">{p.name}</h3>
                  <p className="text-sm">{p.role}</p>
                  <p className="text-xs text-red-300 mt-1">
                    {p.company} • {p.tech}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}

