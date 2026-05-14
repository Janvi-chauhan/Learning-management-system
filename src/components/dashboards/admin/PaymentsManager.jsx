
import React, { useMemo, useState } from "react";
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

const initialForm = {
  studentName: "",
  course: "",
  amount: "",
  paymentMethod: "UPI",
  status: "Paid",
  transactionId: "",
  paymentDate: new Date().toISOString().split("T")[0],
};

const samplePayments = [
  {
    id: 1,
    studentName: "Aarav Sharma",
    course: "Java Full Stack Development",
    amount: 25000,
    paymentMethod: "UPI",
    status: "Paid",
    transactionId: "TXN894512",
    paymentDate: "2026-05-08",
  },
  {
    id: 2,
    studentName: "Priya Verma",
    course: "MERN Stack Development",
    amount: 18000,
    paymentMethod: "Card",
    status: "Pending",
    transactionId: "TXN894513",
    paymentDate: "2026-05-09",
  },
  {
    id: 3,
    studentName: "Rohan Mehta",
    course: "Python with Data Science",
    amount: 22000,
    paymentMethod: "Bank Transfer",
    status: "Paid",
    transactionId: "TXN894514",
    paymentDate: "2026-05-10",
  },
  {
    id: 4,
    studentName: "Ananya Kulkarni",
    course: "UI/UX Design",
    amount: 15000,
    paymentMethod: "Cash",
    status: "Failed",
    transactionId: "TXN894515",
    paymentDate: "2026-05-11",
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const statusStyles = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed: "bg-red-100 text-red-700",
};

const statusIcons = {
  Paid: CheckCircle,
  Pending: Clock,
  Failed: AlertCircle,
};

export default function ManagePayments() {
  const [payments, setPayments] = useState(samplePayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const handleChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.name]:
        target.name === "amount" ? Number(target.value) : target.value,
    }));
  };

  const openModal = (payment = null) => {
    setEditId(payment?.id || null);
    setFormData(payment || initialForm);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData(initialForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === editId
            ? { ...payment, ...formData }
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

  const handleDelete = (id) => {
    if (window.confirm("Delete this payment record?")) {
      setPayments((prev) =>
        prev.filter((payment) => payment.id !== id)
      );
    }
  };

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch =
        payment.studentName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        payment.course
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        payment.transactionId
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  const summary = useMemo(() => {
    const total = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    const paid = payments
      .filter((payment) => payment.status === "Paid")
      .reduce((sum, payment) => sum + payment.amount, 0);

    const pending = payments
      .filter((payment) => payment.status === "Pending")
      .reduce((sum, payment) => sum + payment.amount, 0);

    return { total, paid, pending };
  }, [payments]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Payments
          </h1>
          <p className="text-gray-500 mt-1">
            Track student fee payments and transaction history.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium">
            <Download size={18} />
            Export
          </button>

          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EF0000] to-[#C40000] hover:from-[#D90000] hover:to-[#A80000] text-white px-5 py-3 rounded-xl shadow-lg shadow-red-200 font-semibold transition-all duration-300"
          >
            <Plus size={18} />
            Add Payment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          {
            title: "Total Collection",
            value: formatCurrency(summary.total),
          },
          {
            title: "Paid Amount",
            value: formatCurrency(summary.paid),
          },
          {
            title: "Pending Amount",
            value: formatCurrency(summary.pending),
          },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                  {card.value}
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <CreditCard size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex items-center flex-1 border border-gray-200 rounded-xl px-4 py-3">
            <Search className="text-gray-400 mr-3" size={18} />
            <input
              type="text"
              placeholder="Search by student, course or transaction ID..."
              className="w-full outline-none text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
          >
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-gradient-to-r from-red-50 to-yellow-50">
            <tr className="text-left text-sm font-semibold text-gray-600">
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
                <th key={head} className="px-6 py-4">
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => {
                const StatusIcon =
                  statusIcons[payment.status];

                return (
                  <tr
                    key={payment.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {payment.studentName}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {payment.course}
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {formatCurrency(payment.amount)}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {payment.paymentMethod}
                    </td>

                    <td className="px-6 py-4 text-gray-600 font-mono text-sm">
                      {payment.transactionId}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {payment.paymentDate}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          statusStyles[payment.status]
                        }`}
                      >
                        <StatusIcon size={12} />
                        {payment.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() =>
                            openModal(payment)
                          }
                          className="p-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(payment.id)
                          }
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="py-12 text-center text-gray-500"
                >
                  No payment records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                {editId ? "Edit Payment" : "Add Payment"}
              </h2>

              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["studentName", "Student Name"],
                  ["course", "Course"],
                  ["amount", "Amount"],
                  ["transactionId", "Transaction ID"],
                ].map(([name, label]) => (
                  <input
                    key={name}
                    type={
                      name === "amount"
                        ? "number"
                        : "text"
                    }
                    name={name}
                    placeholder={label}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
                  />
                ))}

                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                >
                  <option>UPI</option>
                  <option>Card</option>
                  <option>Cash</option>
                  <option>Bank Transfer</option>
                </select>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                >
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>

                <input
                  type="date"
                  name="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleChange}
                  className="md:col-span-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#EF0000] to-[#C40000] hover:from-[#D90000] hover:to-[#A80000] text-white font-semibold shadow-lg shadow-red-200 transition-all duration-300"
                >
                  {editId
                    ? "Update Payment"
                    : "Add Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}