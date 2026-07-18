import { useState } from "react";
import api from "../services/api";

export default function EnrollmentModal({
  course,
  student,
  onClose,
}) {

  console.log("Student:", student);
  console.log("Course:", course);

  const [formData, setFormData] = useState({

    full_name: student?.name || "",

    email: student?.email || "",

    phone: "",

    city: "",

    qualification: "",
  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!student?.id) {

      alert("Please login first.");

      return;
    }

    if (!course?.id) {

      alert("Course information not found.");

      return;
    }

    try {

      const payload = {

        student_id: student.id,

        course_id: course.id,

        amount: course.price || 5000,

        ...formData,
      };

      console.log("Payload:", payload);

      const response = await api.post(
        "/student/enroll",
        payload
      );

      console.log(response.data);

      const options = {

        // UPDATED
        key: response.data.key,

        // UPDATED
        amount: response.data.amount,

        // UPDATED
        currency: response.data.currency,

        name: "Creative Programming Classes",

        description:
          course.title || "Course Purchase",

        order_id:
          response.data.order_id,

        handler: async function (paymentResponse) {

          console.log(
            "Payment Success:",
            paymentResponse
          );

          try {

            await api.post(
              "/student/payments/verify",
              {

                enrollment_id:
                  response.data.enrollment_id,

                razorpay_order_id:
                  paymentResponse.razorpay_order_id,

                razorpay_payment_id:
                  paymentResponse.razorpay_payment_id,

                razorpay_signature:
                  paymentResponse.razorpay_signature,
              }
            );

            alert(
              "Payment Successful!"
            );

            onClose();

          } catch (error) {

            console.log(error);

            alert("Payment Verification Failed");
          }

        },

        prefill: {

          name: formData.full_name,

          email: formData.email,

          contact: formData.phone,
        },

        notes: {

          course: course.title,
        },

        theme: {

          color: "#dc2626",
        },
      };

      console.log("Razorpay Options:", options);
      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Enrollment failed."
      );
    }
  };

  console.log("Course:", course);

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white p-8 w-[600px] rounded-xl">

        <h2 className="text-2xl font-bold mb-5">
          Course Enrollment
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-3"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-3"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border p-3"
          />

          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full border p-3"
          />

          <input
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            placeholder="Qualification"
            className="w-full border p-3"
          />

          <button
            type="submit"
            className="bg-red-600 text-white px-5 py-3 w-full"
          >
            Proceed To Payment
          </button>

          <button
            type="button"
            onClick={onClose}
            className="border px-5 py-3 w-full"
          >
            Cancel
          </button>

        </form>

      </div>

    </div>
  );
}