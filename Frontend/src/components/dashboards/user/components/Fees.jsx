import { useEffect, useState } from "react";
import api from "../../../../services/api";
import {
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Video,
  CreditCard,
  Wallet,
  CalendarDays,
} from "lucide-react";

import { motion } from "framer-motion";


export default function Fees() {

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] =
  useState({
    totalPayments: 0,
    paidAmount: 0,
    pendingAmount: 0,
    liveCohorts: 0,
  });

  const fetchPayments = async () => {
  try {
    const response = await api.get(
  "/student/payments"
);

    console.log(
      "Payments API Response:",
      response.data
    );

    setPayments(
      response.data.data || []
    );
  } catch (error) {
    console.error(
      "Error fetching payments:",
      error
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchPayments();
  fetchStats();
}, []);

const fetchStats =
  async () => {

    try {

      const response =
  await api.get(
    "/student/payments/stats"
  );

      setStats(
        response.data.data
      );

    } catch (error) {

      console.log(error);

    }
};
  // ================= STATS =================

  const statsData = [
  {
    title: "Total Payments",

    value: `₹${stats.totalPayments}`,

    icon: Wallet,

    bg: "bg-orange-100",

    text: "text-orange-600",
  },

  {
    title: "Paid",

    value: `₹${stats.paidAmount}`,

    icon: CheckCircle2,

    bg: "bg-emerald-100",

    text: "text-emerald-600",
  },

  {
    title: "Pending",

    value: `₹${stats.pendingAmount}`,

    icon: AlertCircle,

    bg: "bg-rose-100",

    text: "text-rose-600",
  },

  {
    title: "Live Cohorts",

    value: stats.liveCohorts,

    icon: Video,

    bg: "bg-sky-100",

    text: "text-sky-600",
  },
];
const handlePayment = (payment) => {
  console.log("Payment clicked:", payment);

  // Later you'll integrate Razorpay or Stripe here.

  alert(`Proceeding to payment for ${payment.course}`);
};

  return (
    <div
      className="
        min-h-screen
        w-full

        bg-gradient-to-br
        from-[#f8fafc]
        via-[#f9fafb]
        to-[#eef2ff]

        px-6
        py-7
      "
    >
      {/* Container */}

      <div
        className="
          max-w-[1600px]
          mx-auto
        "
      >
        {/* ================= HEADER ================= */}

        <div className="mb-10">
          {/* Label */}

          <div
            className="
              inline-flex
              items-center
              gap-2

              px-4
              py-2

              rounded-full

              bg-white/70
              backdrop-blur-xl

              border
              border-white/80
            "
          >
            <div
              className="
                w-2
                h-2

                rounded-full

                bg-orange-500
              "
            />

            <span
              className="
                text-sm
                font-medium

                text-slate-600
              "
            >
              Learning Payments
            </span>
          </div>

          {/* Title */}

          <h1
            className="
              mt-5

              text-5xl
              font-bold
              tracking-tight

              text-slate-800
            "
          >
            Course Payments
          </h1>

          {/* Subtitle */}

          <p
            className="
              mt-3

              max-w-2xl

              text-lg
              text-slate-500
            "
          >
            Manage your live batch
            subscriptions, cohort
            fees, and premium course
            payments.
          </p>
        </div>

        {/* ================= STATS ================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4

            gap-5
            mb-10
          "
        >
          {statsData.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.05,
                }}
                whileHover={{
                  y: -3,
                }}
                className="
                  rounded-[26px]

                  border
                  border-white/80

                  bg-white/75
                  backdrop-blur-2xl

                  shadow-[0_10px_35px_rgba(15,23,42,0.05)]

                  p-5
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div>
                    <p
                      className="
                        text-sm
                        font-medium

                        text-slate-500
                      "
                    >
                      {item.title}
                    </p>

                    <h2
                      className="
                        mt-2

                        text-3xl
                        font-bold

                        text-slate-800
                      "
                    >
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className={`
                      w-14
                      h-14

                      rounded-2xl

                      flex
                      items-center
                      justify-center

                      ${item.bg}
                      ${item.text}
                    `}
                  >
                    <Icon size={24} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= PAYMENT TABLE ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            overflow-hidden

            rounded-[30px]

            border
            border-white/80

            bg-white/75
            backdrop-blur-2xl

            shadow-[0_10px_35px_rgba(15,23,42,0.05)]
          "
        >
          {/* HEADER */}

          <div
  className="
    flex
    flex-col
    sm:flex-row
    sm:items-center
    sm:justify-between
    gap-4

    px-4
    sm:px-6
    py-5

    border-b
    border-slate-100
  "
>
  <div className="min-w-0">
    <h2
      className="
        text-xl
        sm:text-2xl
        font-bold
        text-slate-800
      "
    >
      Cohort Payment History
    </h2>

    <p
      className="
        text-sm
        sm:text-base
        text-slate-500
        mt-1
      "
    >
      Live class batches and subscription details
    </p>
  </div>

  <button
    className="
      w-full
      sm:w-auto

      px-5
      py-2.5

      rounded-2xl

      bg-slate-900
      hover:bg-black

      text-white
      text-sm
      font-semibold

      transition-all
      whitespace-nowrap
    "
  >
    Payment Receipts
  </button>
</div>

          {/* TABLE HEADER */}

          <div
            className="
              hidden
              xl:grid

              grid-cols-8

              gap-4

              px-6
              py-4

              bg-slate-50/70

              border-b
              border-slate-100

              text-sm
              font-semibold

              text-slate-500
            "
          >
            <p>Course</p>

            <p>Batch Type</p>

            <p>Total Fees</p>

            <p>Paid</p>

            <p>Remaining</p>

            <p>Due Date</p>

            <p>Status</p>

            <p>Action</p>
          </div>

          {/* ROWS */}

          <div className="divide-y divide-slate-100">
            {payments.map(
              (payment, index) => (
                <motion.div
                  key={payment.id}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.05,
                  }}
                  whileHover={{
                    backgroundColor:
                      "rgba(248,250,252,0.7)",
                  }}
                  className="
                    grid
                    grid-cols-1
                    xl:grid-cols-8

                    gap-4

                    px-6
                    py-5

                    items-center

                    transition-all
                    duration-200
                  "
                >
                  {/* Course */}

                  <div>
                    <h3
                      className="
                        font-semibold
                        text-slate-800
                      "
                    >
                      {payment.title}
                    </h3>
                  </div>

                  {/* Batch Type */}

                  <div
                    className="
                      text-slate-500
                      font-medium
                    "
                  >
                    {payment.category}
                  </div>

                  {/* Total */}

                  <div
                    className="
                      text-slate-700
                      font-semibold
                    "
                  >
                    {payment.amount}
                  </div>

                  {/* Paid */}

                  <div
                    className="
                      text-emerald-600
                      font-semibold
                    "
                  >
                    {payment.paid}
                  </div>

                  {/* Remaining */}

                  <div
                    className="
                      text-rose-600
                      font-semibold
                    "
                  >
                    {payment.remaining}
                  </div>

                  {/* Due Date */}

                  <div
                    className="
                      flex
                      items-center
                      gap-2

                      text-slate-500
                    "
                  >
                    <CalendarDays
                      size={16}
                    />

                    <span>
                      {payment.due_date}
                    </span>
                  </div>

                  {/* Status */}

                  <div>
                    <span
                      className={`
                        px-4
                        py-2

                        rounded-full

                        text-sm
                        font-semibold

                        ${
                          payment.status ===
                          "Paid"
                            ? "bg-emerald-100 text-emerald-600"
                            : payment.status ===
                              "Pending"
                            ? "bg-rose-100 text-rose-600"
                            : "bg-orange-100 text-orange-600"
                        }
                      `}
                    >
                      {payment.status}
                    </span>
                  </div>

                  {/* Action */}

                  <div>
                    <button
                      disabled={
                        payment.status ===
                        "Paid"
                      }
                      onClick={() => {
    if (payment.status !== "Paid") {
      handlePayment(payment);
    }
  }}
                      className={`
                        px-5
                        py-2.5

                        rounded-2xl

                        text-sm
                        font-semibold

                        transition-all

                        ${
                          payment.status ===
                          "Paid"
                            ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                            : "bg-slate-900 hover:bg-black text-white"
                        }
                      `}
                    >
                      {payment.status ===
                      "Paid"
                        ? "Completed"
                        : "Pay Now"}
                    </button>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}