import logo from "../assets/logo cpc.png";
import { useState } from "react";
import { subscribeEmail } from "../services/subscribeApi";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const handleSubscribe = async () => {
  setMessage("");

  if (!email.trim()) {
    setMessage("Please enter your email.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setMessage("Please enter a valid email.");
    return;
  }

  setLoading(true);

  try {
    const response = await subscribeEmail(email);

    setMessage(response.message);
    setEmail("");
  } catch (error) {
    setMessage(error.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 border-b border-gray-800 pb-12">

          {/* Logo + Contact */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt="Creative Programming Classes"
                className="w-14 h-14 object-contain"
              />

              <h3 className="text-2xl font-bold font-sans leading-tight">
                Creative
                <br />
                Programming
                <br />
                Classes
              </h3>
            </div>

            <div className="space-y-3 text-gray-300 text-sm leading-7">
              <p>Jehanabad, Bihar, India</p>

              <p>
                <span className="font-semibold font-sans text-white">
                  Phone:
                </span>{" "}
                +91 6203821917
              </p>

              <p>
                <span className="font-semibold font-sans text-white">
                  Email:
                </span>{" "}
                Info@Drikshainfotech.com
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <ul className="space-y-3 font-sans text-gray-300">
  <li>
    <Link
      to="/#home"
      className="hover:text-white transition"
    >
      Home
    </Link>
  </li>

  <li>
    <Link
      to="/#courses"
      className="hover:text-white transition"
    >
      Courses
    </Link>
  </li>

  <li>
    <Link
      to="/#testimonials"
      className="hover:text-white transition"
    >
      Testimonials
    </Link>
  </li>
  <li>
    <Link
      to="/#placements"
      className="hover:text-white transition"
    >
      Placements
    </Link>
  </li>

  <li>
    <Link
      to="/#contact"
      className="hover:text-white transition"
    >
      Contact Us
    </Link>
  </li>
</ul>

          {/* Programs */}
          <div>
            <h4 className="text-xl font-semibold font-sans mb-5">
              Programs
            </h4>

            <ul className="space-y-3 font-sans text-gray-300">
              <li className="hover:text-white  transition cursor-pointer">
                Full Stack Development
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Backend with Java
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Python & Data Analysis
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Frontend Development
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Internship Programs
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold font-sans mb-5">
              Stay Updated
            </h4>

            <p className="text-gray-300 text-sm leading-7 mb-5">
              Enter your email to get updates
              about new batches & offers.
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-row">
              <input
  type="email"
  placeholder="Your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  disabled={loading}
  className="
    flex-1
    bg-transparent
    border
    border-white
    px-4
    py-3
    text-white
    placeholder-gray-400
    outline-none
    disabled:opacity-60
  "
/>

              <button
  onClick={handleSubscribe}
  disabled={loading}
  className="
    bg-red-600
    hover:bg-red-700
    transition
    px-6
    py-3
    font-semibold
    disabled:opacity-60
    disabled:cursor-not-allowed
  "
>
  {loading ? "Sending..." : "Send"}
</button>
            </div>
            {message && (
  <p
    className={`mt-3 text-sm ${
      message.toLowerCase().includes("success")
        ? "text-green-400"
        : message.toLowerCase().includes("subscribed")
        ? "text-green-400"
        : "text-red-400"
    }`}
  >
    {message}
  </p>
)}

            {/* Social Icons */}
            <div className="flex justify-center lg:justify-start gap-3 mt-6">

               <a
    href="https://www.facebook.com/YOUR_PAGE"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white hover:text-black transition duration-300"
  >
    <FaFacebookF size={15} />
  </a>

  {/* X (Twitter) */}
  <a
    href="https://x.com/YOUR_USERNAME"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white hover:text-black transition duration-300"
  >
    <FaXTwitter size={15} />
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/company/YOUR_COMPANY"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white hover:text-black transition duration-300"
  >
    <FaLinkedinIn size={15} />
  </a>

             
  {/* YouTube */}
  <a
    href="https://www.youtube.com/@YOUR_CHANNEL"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white hover:text-black transition duration-300"
  >
    <FaYoutube size={15} />
  </a>

            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm py-6">
          © {new Date().getFullYear()} Creative Programming Classes.
          All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}