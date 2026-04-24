"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import ErrorModal from "@/app/components/ErrorModal";
import SuccessModal from "@/app/components/SuccessModal";
import { registerUser } from "@/libs/api";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister() {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      setShowError(true);
      return;
    }

    if (!form.email.includes("@")) {
      setError("Invalid email address");
      setShowError(true);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setShowError(true);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setShowError(true);
      return;
    }

    try {
      const res = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (res?.success || res?.message) {
        setShowSuccess(true);

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setError(res?.message || "Registration failed");
        setShowError(true);
      }
    } catch (err) {
      setError("Network error. Try again.");
      setShowError(true);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:block md:w-1/2">
        <img src="/images/auth-bg.png" className="w-full h-full object-cover" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#f4f4f4] px-4 sm:px-6 py-8">
        <div className="w-full max-w-lg rounded-[20px] px-6 sm:px-10 py-8">
          <h2 className="text-center font-semibold text-[20px] mb-6 text-black">
            CREATE YOUR MOMENT ACCOUNT
          </h2>

          <div className="space-y-5">
            <div>
              <label className="text-xs text-gray-600">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-lg border"
              />
            </div>

            <div>
              <label className="text-xs text-gray-600">Email Address</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-lg border"
              />
            </div>

            <div>
              <label className="text-xs text-gray-600">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-600">Confirm Password</label>
              <div className="relative mt-1">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showConfirm ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleRegister}
            className="w-full mt-7 bg-[#E2C37F] text-black py-3 rounded-lg"
          >
            Sign Up
          </button>

          <div className="flex justify-center mt-4">
            <button className="bg-black text-white px-4 py-2 rounded flex items-center gap-2">
              <FcGoogle />
              Google
            </button>
          </div>

          <p className="text-center text-xs mt-6 text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-[#E2C37F]">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <ErrorModal
        show={showError}
        message={error}
        onClose={() => setShowError(false)}
      />

      <SuccessModal
        show={showSuccess}
        message="Account Created Successfully!"
      />
    </div>
  );
}
