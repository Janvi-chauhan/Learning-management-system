import { useState} from "react";
import api from "../services/api";

export default function ContactUs() {

const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  message: "",
});

const handleChange = (e) => {

  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value,
  });
};

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    await api.post(
      "/contact",
      formData
    );

    alert("Message sent successfully");

    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });

  } catch (error) {

    console.log(error);

    alert("Something went wrong");
  }
};

  return (
    <section id="contact"className="bg-[#fdfdfd] py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold font-sans">
            Contact <span className="text-red-600">Us</span>
          </h2>
          <p className="text-gray-600 mt-3">
            Visit our center or send us a message — we’ll contact you shortly
          </p>
        </div>

        {/* MAP + FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* MAP */}
          <div className="w-full h-[360px] md:h-[420px] lg:h-full shadow-xl overflow-hidden border-r border-gray-200">
  <iframe
    title="Jehanabad Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28877.99086752321!2d84.98956904999999!3d25.211690549999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2b579d16d21cd%3A0xa38f8ace26806cfa!2sJehanabad%2C%20Bihar!5e0!3m2!1sen!2sin!4v1784710881527!5m2!1sen!2sin"
    className="w-full h-full border-0"
    loading="lazy"
    allowFullScreen
    referrerPolicy="strict-origin-when-cross-origin"
  ></iframe>
</div>

          {/* FORM */}
          <div className="bg-white p-8 md:p-10 shadow-xl h-full border-l border-gray-200">

            <h3 className="text-2xl font-bold font-sans mb-6">
              Send Us a Message
            </h3>

            <form
             className="space-y-5"
             onSubmit={handleSubmit}>

              <div>
                <label className="text-sm font-semibold">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full mt-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full mt-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full mt-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  className="w-full mt-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-red-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold font-sans hover:scale-105 transition"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

