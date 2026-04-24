"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/InputField";
import LoginSuccessModal from "@/app/components/LoginSuccessModal";
import ErrorModal from "@/app/components/ErrorModal";
import Link from "next/link";
import { loginUser } from "@/libs/api";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin() {
    if (!form.email || !form.password) {
      setError("All fields are required");
      setShowError(true);
      return;
    }

    if (!form.email.includes("@")) {
      setError("Invalid email format");
      setShowError(true);
      return;
    }

    try {
      const res = await loginUser({
        email: form.email,
        password: form.password,
      });

      if (res?.token || res?.access_token) {
        localStorage.setItem("access_token", res.token || res.access_token);

        setShowSuccess(true);

        window.location.href = "/TEAM MOMENT/dashboard.html";
      } else {
        setError(res?.message || "Invalid credentials");
        setShowError(true);
      }
    } catch (err) {
      setError("Network error. Try again.");
      setShowError(true);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 relative">
        <img src="/images/auth-bg.png" className="w-full h-full object-cover" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#f7f8fa] px-4 sm:px-6 py-8">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl sm:text-2xl font-semibold text-center text-black mb-6">
            WELCOME BACK
          </h2>

          <div className="space-y-4">
            <InputField
              label="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full mt-6 bg-[#E2C37F] text-black py-3 rounded-md hover:bg-[#a18d60] transition"
          >
            Sign In
          </button>

          <p className="text-center text-xs sm:text-sm mt-6 text-gray-500">
            Don’t have an account?{" "}
            <Link href="/register" className="text-[#E2C37F]">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <LoginSuccessModal show={showSuccess} message="Login Successful!" />

      <ErrorModal
        show={showError}
        message={error}
        onClose={() => setShowError(false)}
      />
    </div>
  );
}
