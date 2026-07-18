import { useEffect, useState } from "react";
import api from "../services/api";

export default function LatestPlacements() {
  console.log("LatestPlacements mounted");
  const [placements, setPlacements] = useState([]);

  const fetchPlacements = async () => {
  console.log("Fetching placements...");

  try {
    const response = await api.get("/placements");

    console.log("Public API:", response.data);

    setPlacements(response.data.data);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {

  fetchPlacements();

}, []);
  const items =
  placements.length > 0
    ? [...placements, ...placements, ...placements]
    : [];

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
                  src={p.image}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-black/70 to-transparent" />
                <div className="absolute bottom-0 p-5 text-white">
                  <h3 className="font-extrabold">{p.name}</h3>
                 <p className="text-sm">
  {p.domain}
</p>

<p className="text-xs text-red-300 mt-1">
  {p.company}
</p>

<p className="text-xs mt-1">
  Batch {p.batch}
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

