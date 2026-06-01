import React, {
  useMemo,
  useState,
} from "react";

import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  X,
  CreditCard,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

import { motion } from "framer-motion";

// ================= INITIAL FORM =================

const initialForm = {
  studentName: "",
  course: "",
  amount: "",
  paymentMethod: "UPI",
  status: "Paid",
  transactionId: "",
  paymentDate:
    new Date()
      .toISOString()
      .split("T")[0],
};

// ================= SAMPLE DATA =================

const samplePayments = [
  {
    id: 1,
    studentName:
      "Aarav Sharma",
    course:
      "Java Full Stack Development",
    amount: 25000,
    paymentMethod: "UPI",
    status: "Paid",
    transactionId: "TXN894512",
    paymentDate: "2026-05-08",
  },

  {
    id: 2,
    studentName:
      "Priya Verma",
    course:
      "MERN Stack Development",
    amount: 18000,
    paymentMethod: "Card",
    status: "Pending",
    transactionId: "TXN894513",
    paymentDate: "2026-05-09",
  },

  {
    id: 3,
    studentName:
      "Rohan Mehta",
    course:
      "Python with Data Science",
    amount: 22000,
    paymentMethod:
      "Bank Transfer",
    status: "Paid",
    transactionId: "TXN894514",
    paymentDate: "2026-05-10",
  },

  {
    id: 4,
    studentName:
      "Ananya Kulkarni",
    course:
      "UI/UX Design",
    amount: 15000,
    paymentMethod: "Cash",
    status: "Failed",
    transactionId: "TXN894515",
    paymentDate: "2026-05-11",
  },
];

// ================= HELPERS =================

const formatCurrency = (
  amount
) =>
  new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(amount);

// ================= STATUS STYLES =================

const statusStyles = {
  Paid:
    "bg-emerald-100 text-emerald-600",

  Pending:
    "bg-orange-100 text-orange-600",

  Failed:
    "bg-rose-100 text-rose-600",
};

const statusIcons = {
  Paid: CheckCircle,

  Pending: Clock,

  Failed: AlertCircle,
};

// ================= COMPONENT =================

export default function ManagePayments() {
  const [payments, setPayments] =
    useState(samplePayments);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showModal, setShowModal] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const [formData, setFormData] =
    useState(initialForm);

  // ================= HANDLE CHANGE =================

  const handleChange = ({
    target,
  }) => {
    setFormData((prev) => ({
      ...prev,

      [target.name]:
        target.name ===
        "amount"
          ? Number(
              target.value
            )
          : target.value,
    }));
  };

  // ================= MODAL =================

  const openModal = (
    payment = null
  ) => {
    setEditId(
      payment?.id || null
    );

    setFormData(
      payment || initialForm
    );

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);

    setEditId(null);

    setFormData(initialForm);
  };

  // ================= SUBMIT =================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === editId
            ? {
                ...payment,
                ...formData,
              }
            : payment
        )
      );
    } else {
      setPayments((prev) => [
        {
          id: Date.now(),
          ...formData,
        },

        ...prev,
      ]);
    }

    closeModal();
  };

  // ================= DELETE =================

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Delete this payment record?"
      )
    ) {
      setPayments((prev) =>
        prev.filter(
          (payment) =>
            payment.id !== id
        )
      );
    }
  };

  // ================= FILTER =================

  const filteredPayments =
    useMemo(() => {
      return payments.filter(
        (payment) => {
          const matchesSearch =
            payment.studentName
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            payment.course
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            payment.transactionId
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesStatus =
            statusFilter ===
              "All" ||
            payment.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      payments,
      search,
      statusFilter,
    ]);

  // ================= SUMMARY =================

  const summary = useMemo(() => {
    const total =
      payments.reduce(
        (sum, payment) =>
          sum + payment.amount,
        0
      );

    const paid = payments
      .filter(
        (payment) =>
          payment.status ===
          "Paid"
      )
      .reduce(
        (sum, payment) =>
          sum + payment.amount,
        0
      );

    const pending =
      payments
        .filter(
          (payment) =>
            payment.status ===
            "Pending"
        )
        .reduce(
          (
            sum,
            payment
          ) =>
            sum +
            payment.amount,
          0
        );

    return {
      total,
      paid,
      pending,
    };
  }, [payments]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f9fafb] to-[#eef2ff] p-6">
      
      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        
        {/* LEFT */}

        <div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-sm">
            
            <div className="w-2 h-2 rounded-full bg-[#ff6b3d]" />

            <span className="text-sm font-medium text-slate-600">
              Payment Workspace
            </span>

          </div>

          <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-800">
            Manage Payments
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Track student fee payments and transaction history.
          </p>

        </div>

        {/* BUTTONS */}

        <div className="flex flex-wrap gap-3">
          
          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/80 bg-white/70 backdrop-blur-xl text-slate-700 font-medium shadow-sm hover:bg-white transition-all"
          >
            <Download size={18} />
            Export
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() =>
              openModal()
            }
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#ff6b3d] to-[#ff9f43] text-white font-semibold shadow-lg shadow-orange-200 transition-all"
          >
            <Plus size={18} />
            Add Payment
          </motion.button>

        </div>

      </div>

      {/* ================= SUMMARY CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {[
          {
            title:
              "Total Collection",

            value:
              formatCurrency(
                summary.total
              ),
          },

          {
            title: "Paid Amount",

            value:
              formatCurrency(
                summary.paid
              ),
          },

          {
            title:
              "Pending Amount",

            value:
              formatCurrency(
                summary.pending
              ),
          },
        ].map((card) => (
          <motion.div
            key={card.title}
            whileHover={{
              y: -2,
            }}
            className="rounded-[28px] border border-white/80 bg-white/75 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.05)] p-6"
          >
            
            <div className="flex items-center justify-between">
              
              <div>
                
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h3 className="text-3xl font-bold text-slate-800 mt-2">
                  {card.value}
                </h3>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <CreditCard size={24} />
              </div>

            </div>

          </motion.div>
        ))}

      </div>

      {/* ================= FILTER ================= */}

      <div className="rounded-[28px] border border-white/80 bg-white/75 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.05)] p-5 mb-6">
        
        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* SEARCH */}

          <div className="flex items-center flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3">
            
            <Search
              className="text-slate-400 mr-3"
              size={18}
            />

            <input
              type="text"
              placeholder="Search by student, course or transaction ID..."
              className="w-full bg-transparent outline-none text-slate-700"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          {/* FILTER */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option>
              All
            </option>

            <option>
              Paid
            </option>

            <option>
              Pending
            </option>

            <option>
              Failed
            </option>

          </select>

        </div>

      </div>

      {/* ================= TABLE ================= */}

      <div className="overflow-x-auto rounded-[30px] border border-white/80 bg-white/75 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
        
        <table className="w-full min-w-[1100px]">
          
          {/* HEAD */}

          <thead className="bg-gradient-to-r from-red-600 to-red-500 text-white">
            
            <tr className="text-left text-sm font-semibold text-white">
              
              {[
                "Student",
                "Course",
                "Amount",
                "Method",
                "Transaction ID",
                "Date",
                "Status",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-5"
                >
                  {head}
                </th>
              ))}

            </tr>

          </thead>

          {/* BODY */}

          <tbody>
            
            {filteredPayments.length >
            0 ? (
              filteredPayments.map(
                (
                  payment
                ) => {
                  const StatusIcon =
                    statusIcons[
                      payment
                        .status
                    ];

                  return (
                    <tr
                      key={
                        payment.id
                      }
                      className="border-t border-slate-100 hover:bg-slate-50/50 transition-all"
                    >
                      
                      <td className="px-6 py-5 font-semibold text-slate-800">
                        {
                          payment.studentName
                        }
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {
                          payment.course
                        }
                      </td>

                      <td className="px-6 py-5 font-bold text-slate-800">
                        {formatCurrency(
                          payment.amount
                        )}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {
                          payment.paymentMethod
                        }
                      </td>

                      <td className="px-6 py-5 font-mono text-sm text-slate-500">
                        {
                          payment.transactionId
                        }
                      </td>

                      <td className="px-6 py-5 text-slate-500">
                        {
                          payment.paymentDate
                        }
                      </td>

                      <td className="px-6 py-5">
                        
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyles[payment.status]}`}
                        >
                          <StatusIcon
                            size={
                              12
                            }
                          />

                          {
                            payment.status
                          }

                        </span>

                      </td>

                      <td className="px-6 py-5">
                        
                        <div className="flex gap-2">
                          
                          <button className="p-2.5 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all">
                            <Eye size={16} />
                          </button>

                          <button
                            onClick={() =>
                              openModal(
                                payment
                              )
                            }
                            className="p-2.5 rounded-xl bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-all"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                payment.id
                              )
                            }
                            className="p-2.5 rounded-xl bg-rose-100 text-rose-600 hover:bg-rose-200 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                }
              )
            ) : (
              <tr>
                
                <td
                  colSpan="8"
                  className="py-16 text-center text-slate-500"
                >
                  No payment records found.
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* ================= MODAL ================= */}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="w-full max-w-2xl rounded-[32px] border border-white/80 bg-white/90 backdrop-blur-2xl shadow-2xl"
          >
            
            {/* HEADER */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              
              <h2 className="text-3xl font-bold text-slate-800">
                {editId
                  ? "Edit Payment"
                  : "Add Payment"}
              </h2>

              <button
                onClick={
                  closeModal
                }
                className="p-2 rounded-xl hover:bg-slate-100 transition-all"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={
                handleSubmit
              }
              className="p-6 space-y-4"
            >
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {[
                  [
                    "studentName",
                    "Student Name",
                  ],

                  [
                    "course",
                    "Course",
                  ],

                  [
                    "amount",
                    "Amount",
                  ],

                  [
                    "transactionId",
                    "Transaction ID",
                  ],
                ].map(
                  ([
                    name,
                    label,
                  ]) => (
                    <input
                      key={name}
                      type={
                        name ===
                        "amount"
                          ? "number"
                          : "text"
                      }
                      name={name}
                      placeholder={
                        label
                      }
                      value={
                        formData[
                          name
                        ]
                      }
                      onChange={
                        handleChange
                      }
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  )
                )}

                <select
                  name="paymentMethod"
                  value={
                    formData.paymentMethod
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <option>
                    UPI
                  </option>

                  <option>
                    Card
                  </option>

                  <option>
                    Cash
                  </option>

                  <option>
                    Bank Transfer
                  </option>

                </select>

                <select
                  name="status"
                  value={
                    formData.status
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <option>
                    Paid
                  </option>

                  <option>
                    Pending
                  </option>

                  <option>
                    Failed
                  </option>

                </select>

                <input
                  type="date"
                  name="paymentDate"
                  value={
                    formData.paymentDate
                  }
                  onChange={
                    handleChange
                  }
                  className="md:col-span-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-2">
                
                <button
                  type="button"
                  onClick={
                    closeModal
                  }
                  className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#ff6b3d] to-[#ff9f43] text-white font-semibold shadow-lg shadow-orange-200 transition-all"
                >
                  {editId
                    ? "Update Payment"
                    : "Add Payment"}
                </button>

              </div>

            </form>

          </motion.div>

        </div>
      )}
    </div>
  );
}