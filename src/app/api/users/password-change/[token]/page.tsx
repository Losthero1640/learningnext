"use client";

import { useState } from "react";

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/password-change", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: params.token, newPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Password reset successful! You can login now.");
    } else {
      setMessage("❌ " + data.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-lg rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Reset Password
        </button>
        {message && <p className="mt-4">{message}</p>}
      </form>
    </div>
  );
}
