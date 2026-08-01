import { useEffect, useState } from "react";
import {
  Mail,
  Trash2,
  Users,
  CalendarDays,
} from "lucide-react";

import {
  getSubscribers,
  deleteSubscriber,
} from "../../../services/subscribeApi";

export default function Subscribe() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const data = await getSubscribers();
      setSubscribers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subscriber?")) return;

    try {
      await deleteSubscriber(id);

      setSubscribers((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Unable to delete subscriber.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="h-12 w-12 rounded-full border-4 border-red-600 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Heading */}

      <div className="flex flex-col lg:flex-row justify-between gap-5 mb-8">

        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
            Newsletter Subscribers
          </h1>

          <p className="text-slate-500 mt-2">
            Manage everyone who subscribed from your website.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div
            className="
            bg-gradient-to-r
            from-[#0f172a]
            to-[#1e293b]
            text-white
            rounded-2xl
            shadow-xl
            p-5
            min-w-[220px]
            "
          >
            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-gray-300">
                  Total Subscribers
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {subscribers.length}
                </h2>

              </div>

              <div className="bg-red-600 p-3 rounded-xl">
                <Users size={26} />
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Desktop Table */}

      <div
        className="
        hidden
        md:block
        bg-white
        rounded-3xl
        shadow-xl
        overflow-hidden
        border
        border-slate-200
        "
      >
        <table className="w-full">

          <thead className="bg-red-600 text-white">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-bold text-white">
                S.No
              </th>

              <th className="px-6 py-5 text-left text-sm font-bold text-white">
                Email Address
              </th>

              <th className="px-6 py-5 text-left text-sm font-bold text-white">
                Subscribed On
              </th>

              <th className="px-6 py-5 text-center text-sm text-bold text-white">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {subscribers.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="text-center py-16 text-gray-500"
                >
                  No Subscribers Found
                </td>

              </tr>

            ) : (

              subscribers.map((subscriber, index) => (

                <tr
                  key={subscriber.id}
                  className="
                  border-b
                  hover:bg-slate-50
                  transition
                  "
                >
                  <td className="px-6 py-5 font-semibold">
                    {index + 1}
                  </td>

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                        h-10
                        w-10
                        rounded-full
                        bg-red-100
                        text-red-600
                        flex
                        items-center
                        justify-center
                        "
                      >
                        <Mail size={18} />
                      </div>

                      <span className="font-medium text-slate-700">
                        {subscriber.email}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2 text-slate-600">

                      <CalendarDays size={18} />

                      {new Date(
                        subscriber.created_at
                      ).toLocaleDateString()}

                    </div>

                  </td>

                  <td className="px-6 py-5 text-center">

                    <button
                      onClick={() =>
                        handleDelete(subscriber.id)
                      }
                      className="
                      inline-flex
                      items-center
                      gap-2
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      px-5
                      py-2.5
                      rounded-xl
                      transition
                      "
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}

      <div className="md:hidden space-y-4">

        {subscribers.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-500">
            No Subscribers Found
          </div>

        ) : (

          subscribers.map((subscriber, index) => (

            <div
              key={subscriber.id}
              className="
              bg-white
              rounded-2xl
              shadow-lg
              p-5
              "
            >
              <div className="flex justify-between">

                <h3 className="font-bold text-lg">
                  #{index + 1}
                </h3>

                <Mail
                  className="text-red-600"
                  size={22}
                />

              </div>

              <p className="mt-4 break-all text-slate-700">
                {subscriber.email}
              </p>

              <p className="text-gray-500 mt-2 text-sm">
                {new Date(
                  subscriber.created_at
                ).toLocaleDateString()}
              </p>

              <button
                onClick={() =>
                  handleDelete(subscriber.id)
                }
                className="
                mt-5
                w-full
                bg-red-600
                hover:bg-red-700
                text-white
                py-3
                rounded-xl
                font-semibold
                transition
                "
              >
                Delete Subscriber
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}