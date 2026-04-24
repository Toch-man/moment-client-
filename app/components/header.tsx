"use client";

import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full px-5 py-4 flex items-center justify-between relative">
      <div className="flex items-center gap-2">
        <img src="/images/logo.png" alt="logo" className="w-8 h-8" />
        <h1 className="text-blue-900 text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider">
          M<span className="text-[#E2C37F]">o</span>ment
        </h1>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8 text-blue-950">
        <Link href="/">Home</Link>
        <Link href="/">Explore Services</Link>
        <Link href="/">Become a creative</Link>
      </nav>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/login" className="text-blue-950 text-sm sm:text-base">
          Login
        </Link>

        <Link href="/register">
          <button className="flex items-center justify-center text-blue-950 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 bg-[#E2C37F] rounded-xl">
            Get started
          </button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden text-blue-900 text-2xl"
      >
        ☰
      </button>

      {/* MOBILE DIALOG OVERLAY */}
      {open && (
        <div className="fixed inset-0 z-50">
          {/* backdrop */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          {/* dialog box */}
          <div className="absolute top-0 right-0 w-[80%] max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col gap-6 border-l-4 border-[#E2C37F]">
            {/* close button */}
            <button
              onClick={() => setOpen(false)}
              className="self-end text-blue-900 text-2xl font-bold"
            >
              ×
            </button>

            {/* nav links */}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-blue-900 text-lg font-medium"
            >
              Home
            </Link>

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-blue-900 text-lg font-medium"
            >
              Explore Services
            </Link>

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-blue-900 text-lg font-medium"
            >
              Become a creative
            </Link>

            <hr className="border-gray-200" />

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-blue-900 text-lg"
            >
              Login
            </Link>

            <Link href="/register" onClick={() => setOpen(false)}>
              <button className="w-full text-blue-950 text-base px-4 py-3 bg-[#E2C37F] rounded-xl font-medium">
                Get started
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
