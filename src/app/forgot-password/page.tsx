"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/forgot-password", { email });
      toast.success(res.data.message);

      // 🚨 sirf debugging ke liye reset URL show karega
      console.log("Reset link:", res.data.resetUrl);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">
        {loading ? "Processing..." : "Forgot Password"}
      </h1>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
      />

      <button
        onClick={handleForgotPassword}
        disabled={!email || loading}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </div>
  );
}
