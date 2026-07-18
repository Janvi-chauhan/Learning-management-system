import { useEffect, useState } from "react";
import api from "../services/api";

export default function Results() {
  console.log("Results mounted");

  const [placements, setPlacements] = useState([]);

  const fetchPlacements = async () => {

    try {

        const { data } = await api.get("/placements");

        console.log(data);

        setPlacements(data.data);

    } catch (err) {

        console.log(err);

    }

};

  useEffect(() => {

    fetchPlacements();

  }, []);

  return (
    <section className="py-16 px-10">

      <h2 className="text-4xl font-bold text-center mb-10">
        Our Results
      </h2>

      <div className="grid md:grid-cols-4 gap-6 text-center">

        {placements.map((placement) => (

          <div
            key={placement.id}
            className="p-6 shadow rounded-lg"
          >

            <img
              src={placement.image}
              alt={placement.name}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
            />

            <h3 className="font-bold">
              {placement.name}
            </h3>

            <p>{placement.company}</p>

            <p className="text-sm text-gray-500">
              {placement.domain}
            </p>

            <p className="text-sm text-gray-500">
              Batch : {placement.batch}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}