import React, {useMemo,useState,useEffect} from "react";
import api from "../../../services/api.js";

import {
  Search,
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
  title: "",
  amount: "",
  dueDate: "",
  status: "Pending",
  category: "",
  paid: "",
  remaining: "",
};


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
    useState([]);

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


  const fetchPayments = async () => {
  try {
    const response =
      await api.get(
        "/admin/payments"
      );

    console.log(
      "Payments API:",
      response.data
    );

    setPayments(
      response.data.data
    );
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchPayments();
}, []);

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

  const openModal = (payment = null) => {
  if (payment) {
    setEditId(payment.id);

    setFormData({
      title: payment.title,
      amount: payment.amount,
      dueDate: payment.due_date,
      status: payment.status,
      category: payment.category,
      paid: payment.paid,
      remaining: payment.remaining,
});
  } else {
    setEditId(null);
    setFormData(initialForm);
  }

  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);

  setEditId(null);

  setFormData(initialForm);
};

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
     title: formData.title,
     amount: Number(formData.amount),
     due_date: formData.dueDate,
     status: formData.status,
     category: formData.category,
     paid: Number(formData.paid),
     remaining: Number(formData.remaining),
};

  await api.put(
  `/admin/payments/${editId}`,
  payload
);

alert("Payment Updated Successfully");

fetchPayments();
closeModal();
};

  // ================= DELETE =================

  const handleDelete = async (id) => {
  const confirmDelete =
    window.confirm(
      "Delete this payment?"
    );

  if (!confirmDelete) return;

  try {
    await api.delete(
      `/admin/payments/${id}`
    );

    fetchPayments();
  } catch (error) {
    console.log(error);
  }
};

  // ================= FILTER =================

  const filteredPayments = useMemo(() => {
  return payments.filter((payment) => {
    const matchesSearch =
      payment.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      payment.category
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      payment.status === statusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );
  });
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
        sum +
        Number(payment.amount || 0),
      0
    );

  const paid =
    payments.reduce(
      (sum, payment) =>
        sum +
        Number(payment.paid || 0),
      0
    );

  const pending =
    payments.reduce(
      (sum, payment) =>
        sum +
        Number(
          payment.remaining || 0
        ),
      0
    );

  return {
    total,
    paid,
    pending,
  };

}, [payments]);
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f9fafb] to-[#eef2ff] md:p-6">
      
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

          <h1 className="mt-5 text-3xl md:text-5xl font-bold tracking-tight text-slate-800">
            Manage Payments
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Track student fee payments and transaction history.
          </p>

        </div>

        {/* BUTTONS */}

        <div className="flex flex-wrap gap-3">
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/80 bg-white/70 backdrop-blur-xl text-slate-700 font-medium shadow-sm hover:bg-white transition-all"
  >
    <Download size={18} />
    Export
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

              <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
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
              placeholder="Search by course title, category or batch type..."
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

      {/* ================= DESKTOP TABLE ================= */}

<div className="hidden lg:block rounded-[30px] border border-white/80 bg-white/75 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.05)] overflow-hidden">

  <table className="w-full">
    
    <thead className="bg-gradient-to-r from-red-600 to-red-500 text-white">
      <tr className="text-left text-sm font-semibold">
        <th className="px-6 py-5">Course Title</th>
        <th className="px-6 py-5">Batch Type</th>
        <th className="px-6 py-5">Total Fees</th>
        <th className="px-6 py-5">Paid Amount</th>
        <th className="px-6 py-5">Remaining Amount</th>
        <th className="px-6 py-5">Due Date</th>
        <th className="px-6 py-5">Status</th>
        <th className="px-6 py-5">Actions</th>
      </tr>
    </thead>

    <tbody>
      {filteredPayments.map((payment) => {
        const StatusIcon =
          statusIcons[payment.status];

        return (
          <tr
            key={payment.id}
            className="border-t border-slate-100 hover:bg-slate-50 transition"
          >
            <td className="px-6 py-5 font-semibold">
              {payment.title}
            </td>

            <td className="px-6 py-5">
              {payment.category}
            </td>

            <td className="px-6 py-5 font-bold">
              {formatCurrency(payment.amount)}
            </td>

            <td className="px-6 py-5">
              {payment.paid}
            </td>

            <td className="px-6 py-5 font-mono text-sm">
              {payment.remaining}
            </td>

            <td className="px-6 py-5">
              {payment.due_date}
            </td>

            <td className="px-6 py-5">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyles[payment.status]}`}
              >
                <StatusIcon size={12} />
                {payment.status}
              </span>
            </td>

            <td className="px-6 py-5">
              <div className="flex gap-2">
                
                <button className="p-2.5 rounded-xl bg-blue-100 text-blue-600">
                  <Eye size={16} />
                </button>

                <button
                  onClick={() =>
                    openModal(payment)
                  }
                  className="p-2.5 rounded-xl bg-yellow-100 text-yellow-600"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() =>
                    handleDelete(payment.id)
                  }
                  className="p-2.5 rounded-xl bg-rose-100 text-rose-600"
                >
                  <Trash2 size={16} />
                </button>

              </div>
            </td>
          </tr>
        );
      })}
    </tbody>

  </table>

</div>

{/* ================= MOBILE CARDS ================= */}

<div className="grid gap-4 lg:hidden">

  {filteredPayments.length > 0 ? (
    filteredPayments.map((payment) => {
      const StatusIcon =
        statusIcons[payment.status];

      return (
        <motion.div
          key={payment.id}
          whileHover={{ y: -2 }}
          className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-5 shadow-sm"
        >
          
          {/* Header */}

          <div className="flex justify-between items-start mb-4">

            <div>
              <h3 className="font-bold text-lg text-slate-800">
                {payment.title}
              </h3>

              <p className="text-sm text-slate-500">
                {payment.category}
              </p>
            </div>

            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[payment.status]}`}
            >
              <StatusIcon size={12} />
              {payment.status}
            </span>

          </div>

          {/* Details */}

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span className="text-slate-500">
                Amount
              </span>

              <span className="font-bold text-slate-800">
                {formatCurrency(payment.amount)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                Method
              </span>

              <span>
                {payment.paid}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                Transaction
              </span>

              <span className="font-mono text-xs">
                {payment.remaining}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                Date
              </span>

              <span>
                {payment.due_ate}
              </span>
            </div>

          </div>

          {/* Actions */}

          <div className="flex gap-3 mt-5">

            <button className="flex-1 py-2 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Eye size={16} />
            </button>

            <button
              onClick={() =>
                openModal(payment)
              }
              className="flex-1 py-2 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={() =>
                handleDelete(payment.id)
              }
              className="flex-1 py-2 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center"
            >
              <Trash2 size={16} />
            </button>

          </div>

        </motion.div>
      );
    })
  ) : (
    <div className="bg-white rounded-3xl p-8 text-center text-slate-500">
      No payment records found.
    </div>
  )}

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
            className="w-full max-w-2xl max-h-[90vh] rounded-[32px] border border-white/80 bg-white/90 backdrop-blur-2xl shadow-2xl"
          >
            
            {/* HEADER */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              
              <h2 className="text-3xl font-bold text-slate-800">
                  Edit Payment
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
                    "title",
                     "Course Title"
                  ],

                  [
                    "category",
                    "Batch Type",
                  ],

                  [
                    "amount",
                    "Total Fees",
                  ],

                  [
                    "paid",
                    "Paid Amount",
                  ],

                  [
                    "remaining",
                    "Remaining Amount",
                  ]
                ].map(
                  ([
                    name,
                    label,
                  ]) => (
                    <input
                      key={name}
                      type={
                        ["amount", "paid", "remaining"].includes(name)
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
                <input
                   type="date"
                   name="dueDate"
                   value={formData.dueDate}
                   onChange={handleChange}
                   required
                   className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
/>
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
                    Update Payment
                </button>

              </div>

            </form>

          </motion.div>

        </div>
      )}
    </div>
  );
}