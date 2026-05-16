import React from "react";
import {
  CreditCard,
  CheckCircle,
  Clock3,
} from "lucide-react";

const fees = [
  {
    id: 1,
    course: "Full Stack Development",
    amount: "₹25,000",
    due: "12 June 2026",
    status: "Paid",
  },
  {
    id: 2,
    course: "Data Analysis with AI",
    amount: "₹18,000",
    due: "25 June 2026",
    status: "Pending",
  },
  {
    id: 3,
    course: "Java Backend Development",
    amount: "₹20,000",
    due: "10 July 2026",
    status: "Paid",
  },
];

export default function Fees() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Fees & Payments
        </h1>

        <p className="text-gray-500 mt-1">
          Track your course fees and payment status
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {fees.map((fee) => (
          <div
            key={fee.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5"
          >
            {/* Top */}
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-red-100 text-red-600">
                <CreditCard size={24} />
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  fee.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {fee.status}
              </span>
            </div>

            {/* Content */}
            <div className="mt-5">
              <h2 className="text-xl font-bold text-gray-800">
                {fee.course}
              </h2>

              <p className="text-3xl font-bold text-red-600 mt-4">
                {fee.amount}
              </p>

              {/* Due Date */}
              <div className="flex items-center gap-2 mt-4 text-gray-600">
                <Clock3 size={18} />
                <span className="text-sm">
                  Due: {fee.due}
                </span>
              </div>

              {/* Button */}
              <button
                className={`w-full mt-6 py-3 rounded-xl font-semibold text-white transition ${
                  fee.status === "Paid"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {fee.status === "Paid" ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle size={18} />
                    Payment Completed
                  </span>
                ) : (
                  "Pay Now"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}