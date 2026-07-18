import { useEffect, useState } from "react";
import api from "../../services/api";
import ResultCard from "./ResultCard";

export default function ResultGrid() {
  const [resultsData, setResultsData] = useState([]);

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const response = await api.get("/placements");

      setResultsData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
      max-w-[1200px] mx-auto
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-x-[5px]
      gap-y-[20px]
    "
    >
      {resultsData.map((item) => (
        <ResultCard key={item.id} data={item} />
      ))}
    </div>
  );
}