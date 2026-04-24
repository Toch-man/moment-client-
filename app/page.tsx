"use client";

import { useState } from "react";
import Image from "next/image";
import Portfolio from "./components/portfolio";
import Footer from "./components/footer";
import Header from "./components/header";
import FeaturedServices from "./components/featured_services";
import Testimonials from "./components/testimonials";

export default function Home() {
  const [services, set_Services] = useState("");
  const [location, set_location] = useState("");
  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO SECTION */}
      <div className="relative">
        {/* Background Image */}
        <Image
          src="/moment_background.png"
          alt="home"
          width={1476}
          height={1179}
          className="w-full h-125 sm:h-150 md:h-175 object-cover"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center">
          <p className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
            Capture Your Best MOMENTs
            <br />
            with Top creatives
          </p>

          <p className="text-sm sm:text-base text-gray-100 mb-6">
            Book professional photographers, videographers and
            <br className="hidden sm:block" />
            branding experts in minutes
          </p>

          {/* FORM */}
          <div className="w-full max-w-4xl bg-black/80 backdrop-blur border border-amber-200 rounded-xl p-4 sm:p-6">
            <form className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex flex-col w-full">
                <label className="text-gray-300 text-sm mb-1">Service</label>

                <select
                  value={services}
                  onChange={(e) => set_Services(e.target.value)}
                  className="w-full rounded-xl px-3 py-2 border border-gray-700 bg-black text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E2C37F]"
                >
                  <option value="">Select service</option>
                  <option>Photography</option>
                  <option>Videography</option>
                  <option>Branding</option>
                  <option>Drone</option>
                  <option>Event Coverage</option>
                  <option>Content Creation</option>
                </select>
              </div>

              <div className="flex flex-col w-full">
                <label className="text-gray-300 text-sm mb-1">Location</label>

                <div className="relative w-full">
                  {/* ICON */}
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M2 12C1.99953 12.1913 2.05392 12.3786 2.15672 12.5399C2.25952 12.7012 2.40642 12.8297 2.58 12.91L11.18 16.82C11.4392 16.9374 11.7205 16.9981 12.005 16.9981C12.2895 16.9981 12.5708 16.9374 12.83 16.82L21.41 12.92C21.587 12.8404 21.737 12.7111 21.8418 12.5477C21.9466 12.3844 22.0015 12.1941 22 12M2 17C1.99953 17.1913 2.05392 17.3786 2.15672 17.5399C2.25952 17.7012 2.40642 17.8297 2.58 17.91L11.18 21.82C11.4392 21.9374 11.7205 21.9981 12.005 21.9981C12.2895 21.9981 12.5708 21.9374 12.83 21.82L21.41 17.92C21.587 17.8404 21.737 17.7111 21.8418 17.5477C21.9466 17.3844 22.0015 17.1941 22 17M12.83 2.17999C12.5694 2.06114 12.2864 1.99963 12 1.99963C11.7136 1.99963 11.4306 2.06114 11.17 2.17999L2.6 6.07999C2.42255 6.15823 2.27168 6.28639 2.16577 6.44885C2.05985 6.61131 2.00346 6.80106 2.00346 6.99499C2.00346 7.18893 2.05985 7.37868 2.16577 7.54113C2.27168 7.70359 2.42255 7.83175 2.6 7.90999L11.18 11.82C11.4406 11.9388 11.7236 12.0003 12.01 12.0003C12.2964 12.0003 12.5794 11.9388 12.84 11.82L21.42 7.91999C21.5975 7.84175 21.7483 7.71359 21.8542 7.55113C21.9602 7.38868 22.0165 7.19893 22.0165 7.00499C22.0165 6.81106 21.9602 6.6213 21.8542 6.45885C21.7483 6.29639 21.5975 6.16823 21.42 6.08999L12.83 2.17999Z"
                        stroke="#4B5563"
                        strokeOpacity="0.7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* INPUT */}
                  <input
                    className="w-full rounded-xl pl-10 pr-3 py-2 border-2 border-gray-300 text-white"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => set_location(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-end w-full sm:w-auto">
                <button className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-[#E2C37F] rounded-xl font-medium">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* FEATURED SERVICES */}
      <FeaturedServices />

      {/* HOW IT WORKS */}
      <div className="p-6 sm:p-10 md:p-20 bg-gray-200">
        <h1 className="text-center text-2xl mb-10">How it works</h1>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center gap-3">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <path
                d="M56 56L44.4267 44.4267M50.6667 29.3333C50.6667 41.1154 41.1154 50.6667 29.3333 50.6667C17.5513 50.6667 8 41.1154 8 29.3333C8 17.5513 17.5513 8 29.3333 8C41.1154 8 50.6667 17.5513 50.6667 29.3333Z"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="font-semibold">Search</h2>
            <p className="text-sm text-gray-600">
              This is a dummy description that will
              <br /> definitely need real content
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden md:block">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <path
                d="M10.833 26H41.1663M41.1663 26L25.9997 10.8333M41.1663 26L25.9997 41.1667"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center gap-3">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <path
                d="M21.3333 5.33333V16M42.6667 5.33333V16M8 26.6667H56M13.3333 10.6667H50.6667C53.6122 10.6667 56 13.0545 56 16V53.3333C56 56.2789 53.6122 58.6667 50.6667 58.6667H13.3333C10.3878 58.6667 8 56.2789 8 53.3333V16C8 13.0545 10.3878 10.6667 13.3333 10.6667Z"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="font-semibold">Book</h2>
            <p className="text-sm text-gray-600">
              This is a dummy description that will
              <br /> definitely need real content
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden md:block">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <path
                d="M10.833 26H41.1663M41.1663 26L25.9997 10.8333M41.1663 26L25.9997 41.1667"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center gap-3">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <path
                d="M23.9997 32L29.333 37.3333L39.9997 26.6667M58.6663 32C58.6663 46.7276 46.7273 58.6667 31.9997 58.6667C17.2721 58.6667 5.33301 46.7276 5.33301 32C5.33301 17.2724 17.2721 5.33333 31.9997 5.33333C46.7273 5.33333 58.6663 17.2724 58.6663 32Z"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="font-semibold">Review</h2>
            <p className="text-sm text-gray-600">
              This is a dummy description that will
              <br /> definitely need real content
            </p>
          </div>
        </div>
      </div>

      {/* FEATURED CREATIVES */}
      <div className="py-12 bg-gray-100">
        <h1 className="text-center text-lg font-semibold mb-6">
          Featured creatives
        </h1>
        <Portfolio />
      </div>

      {/* FOR CREATIVES */}
      <div className="px-6 sm:px-10 md:px-20 py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          {/* LEFT */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-semibold mb-4">For the creatives</h1>

            <p className="text-gray-600 mb-6">
              Reprehenderit aenean occaecati fugit, orci sodales culpa
              <br />
              perspiciatis optio condimentum laboris hendrerit, rutrum bibendum
              <br />
              minima est! Ornare leo eum.
              <br />
            </p>

            <button className="bg-[#E2C37F] text-black px-6 py-3 rounded-xl font-medium">
              Become a creative
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex flex-col gap-6">
            {[
              "Create your account",
              "Setup your portfolio",
              "Begin your journey",
            ].map((title) => (
              <div key={title} className="flex items-start gap-4">
                <div className="bg-[#E2C37F] p-2 rounded-full">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M16.6663 5L7.49967 14.1667L3.33301 10"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="font-semibold">{title}</h2>
                  <p className="text-sm text-gray-600">
                    Simple steps to start growing your creative career.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Testimonials />
      <Footer />
    </div>
  );
}
