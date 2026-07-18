import { useEffect, useState } from "react";
import api from "../../../services/api";
import { Trash2 } from "lucide-react";

export default function ContactQueries() {

  const [queries, setQueries] = useState([]);

  const fetchQueries = async () => {

    try {

      const response =
        await api.get(
          "/admin/contacts"
        );
        console.log(response.data);
      setQueries(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchQueries();

  }, []);

  const handleDelete = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this query?"
      );

    if (!confirmDelete)
      return;

    try {

      await api.delete(
        `/admin/contacts/${id}`
      );

      fetchQueries();

    } catch (error) {

      console.log(error);
    }
  };
  console.log("Queries State:", queries);
  return (

    <div className="p-6">

      <h1 className="text-3xl font-black mb-8">
        Contact Queries
      </h1>

      <div className="space-y-5">
        {queries.length === 0 && (
  <div className="text-gray-500">
    No contact queries found.
  </div>
)}

        {queries.map((query) => (

          <div
            key={query.id}
            className="
              bg-white
              border
              rounded-3xl
              p-6
              shadow-sm
            "
          >

            <div className="flex justify-between">

              <div>

                <h3 className="font-bold text-xl">
                  {query.name}
                </h3>

                <p className="text-gray-500">
                  {query.email}
                </p>

                <p className="text-gray-500">
                  {query.phone}
                </p>

              </div>

              <button
                onClick={() =>
                  handleDelete(query.id)
                }
                className="
                  bg-red-100
                  text-red-600
                  w-12
                  h-12
                  rounded-xl
                  flex
                  items-center
                  justify-center
                "
              >
                <Trash2 />
              </button>

            </div>

            <div className="mt-6">

              <h4 className="font-semibold mb-2">
                Message
              </h4>

              <p className="text-gray-600">
                {query.message}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

