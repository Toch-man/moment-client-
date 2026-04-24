"use client";

import { useRef } from "react";

export default function FeaturedServices() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -250 : 250,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Header + Arrows */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg font-semibold">Featured services</p>

        {/* Arrows (mobile only) */}
        <div className="flex gap-2 md:hidden">
          <button
            onClick={() => scroll("left")}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            →
          </button>
        </div>
      </div>

      {/* Mobile scroll */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto md:hidden scroll-smooth"
      >
        {[
          "/photograph.png",
          "/videography.png",
          "/branding.png",
          "/drone.png",
          "/event.png",
          "/content.png",
        ].map((src) => (
          <img key={src} src={src} alt="" className="min-w-[95%] rounded-xl" />
        ))}
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <img src="/photograph.png" alt="photograph" />
        <img src="/videography.png" alt="video" />
        <img src="/branding.png" alt="branding" />
        <img src="/drone.png" alt="drone" />
        <img src="/event.png" alt="event" />
        <img src="/content.png" alt="content" />
      </div>
    </div>
  );
}
