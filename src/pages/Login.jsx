import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let { data } = await axios.post(
      `${import.meta.env.VITE_PUBLIC_API_URL}/user/login`,
      {
        email: formData.email,
        password: formData.password,
      },
      { withCredentials: true }
    );

    console.log(data);

    if (data.message === "Login Success") {
      toast.success("Welcome");
      sessionStorage.setItem("accesstoken", Date.now());
      navigate("/userdashboard");
    }
  } catch (error) {
    console.log(error.response?.data);
    if (error.response?.data === "Invalid Credentials") {
      toast.error("Invalid Credentials");
    } else {
      toast.error("Login failed");
    }
  }
};

  return (
    <div
      className="min-h-screen bg-slate-100 px-3 sm:px-6 lg:px-8
               flex flex-col sm:items-center sm:justify-center
               pt-6 sm:pt-0"
    >
      <div className="bg-white p-5 sm:p-8 rounded-xl shadow-lg w-full max-w-md transition-all duration-300 sm:hover:scale-105">
        <h2 className="text-xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Email */}
          <div className="space-y-1.5 sm:space-y-2">
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5 sm:space-y-2">
            <label
              htmlFor="password"
              className="block text-xs sm:text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Enter your password"
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-xs sm:text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <div className="text-xs sm:text-sm">
              <a
                href="#"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2.5 sm:py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition text-sm sm:text-base font-semibold"
          >
            Sign In
          </button>

          {/* Footer */}
          <p className="text-center text-xs sm:text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
