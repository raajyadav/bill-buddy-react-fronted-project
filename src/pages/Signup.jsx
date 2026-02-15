import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
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
    // Handle form submission here
    console.log(formData);

    try {
      let resp = await axios.post(
        "http://localhost:8182/user/saveUser",
        formData
      );
      console.log(resp);

      toast.success("Signup Successfull");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

return (
  <div className="min-h-screen bg-slate-100 px-3 sm:px-6 lg:px-8
                  flex flex-col sm:items-center sm:justify-center
                  pt-6 sm:pt-0">
    <div className="bg-white p-5 sm:p-8 rounded-xl shadow-lg w-full max-w-md transition-all duration-300 sm:hover:scale-105">
      <h2 className="text-xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-8">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Name */}
        <div className="space-y-1.5 sm:space-y-2">
          <label
            htmlFor="name"
            className="block text-xs sm:text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Enter your name"
            required
          />
        </div>

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

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2.5 sm:py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition text-sm sm:text-base font-semibold"
        >
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-gray-600">
          Already created an account?{" "}
          <Link
            to="/"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  </div>
);
};

export default Signup;
