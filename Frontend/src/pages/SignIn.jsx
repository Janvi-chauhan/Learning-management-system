import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Code2,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function PremiumSignInPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

       localStorage.setItem(
      "token",
      response.data.token
    );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful");

      navigate("/admin/dashboard");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Invalid Credentials"
      );
    }
  };


  return (
    <div className="h-screen bg-white flex overflow-hidden">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
        {/* Red Gradient Glow */}
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
            Learn.
            <br />
            Build.
            <br />
            <span className="text-red-500">Become Elite.</span>
          </h2>

          <p className="mt-8 text-gray-300 text-lg leading-relaxed max-w-xl">
            Join the most trusted coding institute and level up your programming
            journey with real-world projects, mentorship, and career-focused
            learning.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            <div>
              <h3 className="text-red-500 text-4xl font-black">10K+</h3>
              <p className="text-gray-400 mt-1">Students</p>
            </div>

            <div>
              <h3 className="text-red-500 text-4xl font-black">95%</h3>
              <p className="text-gray-400 mt-1">Placements</p>
            </div>

            <div>
              <h3 className="text-red-500 text-4xl font-black">50+</h3>
              <p className="text-gray-400 mt-1">Courses</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center px-6 py-10 bg-white">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/5 rounded-full blur-3xl  p-3 " />

        {/* Card */}
        <div className="relative z-10 w-full max-w-xl">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">
            <div className="bg-red-600 p-3 rounded-2xl">
              <Code2 className="text-white w-7 h-7" />
            </div>

            <div>
              <h1 className="text-2xl font-black text-black">PROGRAMMING</h1>
              <p className="text-red-600 text-sm font-semibold">Classes</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-2xl border border-gray-200 shadow-2xl rounded-[35px] p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-red-600 w-5 h-5" />
                <p className="text-red-600 font-semibold tracking-wide uppercase text-sm">
                  Welcome Back
                </p>
              </div>

              <h2 className="text-4xl font-black text-black">Sign In</h2>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Continue your coding journey and access your dashboard,
                assignments, and courses.
              </p>
            </div>

            {/* FORM */}
            <form
            onSubmit={handleLogin}
            className="space-y-6">

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
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="bg-transparent outline-none border-none w-full ml-4 text-black placeholder-gray-400"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm text-red-600 hover:text-red-700 font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="group flex items-center bg-gray-100 border border-transparent focus-within:border-red-500 rounded-2xl px-5 py-4 transition-all duration-300">
                  <Lock className="text-gray-400 group-focus-within:text-red-500 transition w-5 h-5" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
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

              {/* REMEMBER */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="accent-red-600 w-4 h-4" />
                  <span className="text-gray-600 text-sm">Remember me</span>
                </label>
              </div>

              {/* BUTTON */}
              <button
              type="submit"
              className="group relative w-full overflow-hidden bg-red-600 hover:bg-red-700 transition-all duration-300 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-red-500/30">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </span>

                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition duration-300" />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-sm">OR CONTINUE WITH</span>
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
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-red-600 font-bold cursor-pointer hover:text-red-700 transition"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
