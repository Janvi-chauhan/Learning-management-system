import { useState, useEffect} from "react";
import api from "../../../services/api";
import {
  Mail,
  Phone,
  User,
  MessageCircle,
  Search,
} from "lucide-react";

import { motion } from "framer-motion";

export default function ContactUs() {

 const [queries, setQueries] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);

 const [lastPage, setLastPage] = useState(1);

 //const [loading, setLoading] = useState(false);

 const fetchQueries = async (page = 1) => {

  try {

    const response = await api.get(
      `/admin/contacts?page=${page}`
    );

    // Laravel pagination response

    setQueries(
      response.data.data
    );

    setCurrentPage(
      response.data.current_page
    );

    setLastPage(
      response.data.last_page
    );

  } catch (error) {

    console.log(error);
  }
};

useEffect(() => {

  fetchQueries(currentPage);

}, [currentPage]);

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

fetchQueries(currentPage);
  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-[#f8fafc]
      via-[#f9fafb]
      to-[#eef2ff]
      p-7
    "
    >
      {/* HEADER */}

      <div className="mb-10">

        <h1
          className="
          text-5xl
          font-bold
          text-slate-800
        "
        >
          Contact Us
        </h1>

        <p className="text-slate-500 mt-3">
          Manage all contact queries submitted
          by students and visitors.
        </p>
      </div>

      {/* SEARCH */}

      <div
        className="
          bg-white
          rounded-2xl
          p-4
          shadow-sm
          mb-6
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <Search size={18} />

          <input
            type="text"
            placeholder="Search Query..."
            className="
              w-full
              outline-none
            "
          />
        </div>
      </div>

      {/* TABLE */}

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="
    bg-white
    rounded-3xl
    shadow-sm
    overflow-hidden
  "
>
  <div className="overflow-x-auto">

    <table className="w-full min-w-[900px]">

      {/* TABLE HEADER */}

      <thead className="bg-red-600 border-b border-gray-200">
        <tr>

          <th className="px-6 py-4 text-left text-sm font-bold text-white">
            Name
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-white">
            Email
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-white">
            Phone
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-white">
            Message
          </th>

          {/* <th className="px-6 py-4 text-left text-sm font-semibold text-white">
            Status
          </th> */}
{/* 
          <th className="px-6 py-4 text-center text-sm font-semibold text-white">
            Actions
          </th> */}

        </tr>
      </thead>

      {/* TABLE BODY */}

      <tbody className="divide-y divide-gray-100">

        {queries.length === 0 && (

  <tr>

    <td
      colSpan="6"
      className="
        text-center
        py-10
        text-gray-500
      "
    >
      No contact queries found.
    </td>

  </tr>

)}

        {queries.map((query) => (
          <tr
  key={query.id}
  className="hover:bg-gray-50 transition"
>
  <td className="px-6 py-5 text-sm font-bold text-gray-800">
    {query.name}
  </td>

  <td className="px-6 py-5 text-sm">

  <a
    href={`mailto:${query.email}`}
    className="
      text-blue-600
      hover:underline
      break-all
    "
  >
    {query.email}
  </a>

</td>
  <td className="px-6 py-5 text-sm">

  <a
    href={`https://wa.me/91${query.phone}`}
    target="_blank"
    rel="noreferrer"
    className="
      text-green-600
      hover:underline
    "
  >
    {query.phone}
  </a>

</td>

  <td className="px-6 py-5 text-sm font-semibold text-slate-500">
    {query.message}
  </td>

  {/* <td className="px-6 py-5">
    <span
      className={`
        px-3 py-2 rounded-full text-sm

        ${
          query.status === "Resolved"
            ? "bg-emerald-100 text-emerald-600"
            : "bg-orange-100 text-orange-600"
        }
      `}
    >
      {query.status}
    </span>
  </td> */}

  {/* <td className="px-6 py-5 text-center">
    <button
    onClick={() =>
        handleDelete(query.id)
    }
      className="
        bg-red-500
        hover:bg-red-700
        text-white
        px-4
        py-2
        rounded-xl
        text-sm
        transition
      "
    >
    Delete
    </button>
  </td> */}
</tr>
        ))}

      </tbody>

    </table>

  </div>
</motion.div>
<div className="
  flex
  justify-center
  gap-3
  mt-8
">

  <button

    disabled={currentPage === 1}

    onClick={() =>
      fetchQueries(currentPage - 1)
    }

    className="
      px-5
      py-2
      rounded-xl
      bg-red-600
      text-white
      disabled:opacity-50
    "
  >
    Previous
  </button>

  <span className="
    flex
    items-center
    font-semibold
  ">

    Page {currentPage}
    of {lastPage}

  </span>

  <button

    disabled={currentPage === lastPage}

    onClick={() =>
      fetchQueries(currentPage + 1)
    }

    className="
      px-5
      py-2
      rounded-xl
      bg-red-600
      text-white
      disabled:opacity-50
    "
  >
    Next
  </button>

</div>
        

        {/* ROWS */}


      {/* </motion.div> */}
    </div>
  );
}