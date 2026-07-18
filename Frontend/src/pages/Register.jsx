import React, { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Code2,
  Sparkles,
  Phone,
} from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("");
  
 const [otpSent, setOtpSent] = useState(false);
const [otp, setOtp] = useState("");

const handleRegister = async (e) => {

  e.preventDefault();

  try {

    const response = await api.post(
      "/send-otp",
      {
        name,
        email,
        phone,
        password,
        password_confirmation:
          confirmPassword,
        role,
      }
    );

    alert(response.data.message);

    setOtpSent(true);

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to send OTP"
    );
  }
};
const handleVerifyOtp = async () => {

  try {

    const response = await api.post(
      "/verify-otp",
      {
        email: email,
        otp: otp,
      }
    );

    alert(response.data.message);

    localStorage.setItem(
      "token",
      response.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    navigate("/login");

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Invalid OTP"
    );
  }
};

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
        {/* Background Glow */}
        <div className="absolute w-[500px] h-[500px] bg-red-600/30 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-red-500/20 blur-[100px] rounded-full bottom-[-100px] right-[-100px]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-16">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-red-600 p-4 rounded-2xl shadow-2xl shadow-red-500/40">
              <Code2 className="text-white w-10 h-10" />
            </div>

            <div>
              <h1 className="text-white text-4xl font-black tracking-wide">
                PROGRAMMING
              </h1>

              <p className="text-red-500 text-lg font-semibold">
                Building Careers, Not Just Coders
              </p>
            </div>
          </div>

          <h2 className="text-6xl font-black text-white leading-tight">
            Start
            <br />
            Your Coding
            <br />
            <span className="text-red-500">Journey Today.</span>
          </h2>

          <p className="mt-8 text-gray-300 text-lg leading-relaxed max-w-xl">
            Join thousands of students learning programming, development,
            problem solving, and real-world tech skills from industry experts.
          </p>

          {/* FEATURES */}
          <div className="mt-12 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <p className="text-gray-300 text-lg">
                Live Coding Sessions
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <p className="text-gray-300 text-lg">
                Placement Preparation
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <p className="text-gray-300 text-lg">
                Industry Level Projects
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center px-6 py-10 bg-white">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-60" />

        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/5 rounded-full blur-3xl" />

        {/* CARD */}
        <div className="relative z-10 w-full max-w-xl">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">
            <div className="bg-red-600 p-3 rounded-2xl">
              <Code2 className="text-white w-7 h-7" />
            </div>

            <div>
              <h1 className="text-2xl font-black text-black">
                PROGRAMMING
              </h1>

              <p className="text-red-600 text-sm font-semibold">
                Classes
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-2xl border border-gray-200 shadow-2xl rounded-[35px] p-8 sm:p-10">
            {/* HEADER */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-red-600 w-5 h-5" />

                <p className="text-red-600 font-semibold tracking-wide uppercase text-sm">
                  Create Account
                </p>
              </div>

              <h2 className="text-4xl font-black text-black">
                Register
              </h2>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Create your account and start learning with the best
                programming community.
              </p>
            </div>

            {/* FORM */}
            <form
            onSubmit={handleRegister} 
            className="space-y-5">
              {/* FULL NAME */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-3">
                  Full Name
                </label>

                <div className="group flex items-center bg-gray-100 border border-transparent focus-within:border-red-500 rounded-2xl px-5 py-4 transition-all duration-300">
                  <User className="text-gray-400 group-focus-within:text-red-500 transition w-5 h-5" />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => 
                      setName(e.target.value)
                    }
                    className="bg-transparent outline-none border-none w-full ml-4 text-black placeholder-gray-400"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-3">
                  Email Address
                </label>

                <div className="group flex items-center bg-gray-100 border border-transparent focus-within:border-red-500 rounded-2xl px-5 py-4 transition-all duration-300">
                  <Mail className="text-gray-400 group-focus-within:text-red-500 transition w-5 h-5" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                     onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent outline-none border-none w-full ml-4 text-black placeholder-gray-400"
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-3">
                  Phone Number
                </label>

                <div className="group flex items-center bg-gray-100 border border-transparent focus-within:border-red-500 rounded-2xl px-5 py-4 transition-all duration-300">
                  <Phone className="text-gray-400 group-focus-within:text-red-500 transition w-5 h-5" />

                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-transparent outline-none border-none w-full ml-4 text-black placeholder-gray-400"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-3">
                  Password
                </label>

                <div className="group flex items-center bg-gray-100 border border-transparent focus-within:border-red-500 rounded-2xl px-5 py-4 transition-all duration-300">
                  <Lock className="text-gray-400 group-focus-within:text-red-500 transition w-5 h-5" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent outline-none border-none w-full ml-4 text-black placeholder-gray-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-3">
                  Confirm Password
                </label>

                <div className="group flex items-center bg-gray-100 border border-transparent focus-within:border-red-500 rounded-2xl px-5 py-4 transition-all duration-300">
                  <Lock className="text-gray-400 group-focus-within:text-red-500 transition w-5 h-5" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-transparent outline-none border-none w-full ml-4 text-black placeholder-gray-400"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

            <div>
               <label className="text-sm font-semibold text-gray-700 block mb-3">
                   Select Role
                 </label>
               
                 <select
                   value={role}
                   onChange={(e) =>
                     setRole(e.target.value)
                   }
                   className="w-full bg-gray-100 border rounded-2xl px-5 py-4"
                 >
                  <option value="" disabled >
                     Select Role
                   </option>

                   <option value="student">
                     Student
                   </option>
               
                   {/* <option value="teacher">
                     Teacher
                   </option> */}
                   
                   {/* <option value="admin">
                     Admin
                   </option> */}

                 </select>
               </div>

              {/* TERMS */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="accent-red-600 mt-1"
                />

                <p className="text-sm text-gray-600 leading-relaxed">
                  I agree to the{" "}
                  <span className="text-red-600 font-semibold cursor-pointer">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-red-600 font-semibold cursor-pointer">
                    Privacy Policy
                  </span>
                </p>
              </div>

              {/* BUTTON */}
              {
  otpSent && (
    <div>
      <label className="text-sm font-semibold text-gray-700 block mb-3">
        Enter OTP
      </label>

      <div className="group flex items-center bg-gray-100 border border-transparent focus-within:border-red-500 rounded-2xl px-5 py-4">

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          className="bg-transparent outline-none border-none w-full text-black placeholder-gray-400"
        />

      </div>
    </div>
  )
}
              <button
  type="button"
  onClick={() => {

    if (!otpSent) {

      handleRegister(new Event("submit"));

    } else {

      handleVerifyOtp();

    }

  }}
  className="group relative w-full overflow-hidden bg-red-600 hover:bg-red-700 transition-all duration-300 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-red-500/30 mt-2"
>
  <span className="relative z-10 flex items-center justify-center gap-2">

    {otpSent
      ? "Verify OTP"
      : "Send OTP"}

    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />

  </span>
</button>
            </form>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gray-200" />

              <span className="text-gray-400 text-sm">
                OR REGISTER WITH
              </span>

              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* SOCIAL */}
            <div className="grid grid-cols-2 gap-4">
              <button className="border border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all duration-300 rounded-2xl py-4 font-semibold text-gray-700">
                Google
              </button>

              <button className="border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300 rounded-2xl py-4 font-semibold text-gray-700">
                GitHub
              </button>
            </div>

            {/* FOOTER */}
            <p className="text-center text-gray-500 mt-8">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-red-600 font-bold hover:text-red-700 transition"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}