"use client";

import { useRef } from "react";

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const creatives = [
    {
      image: "/profile.png",
      name: "Edward Ruther",
      rating: 4,
      text: "Reprehenderit aenean occaecati fugit, orci sodales culpa perspiciatis optio condimentum laboris hendrerit, rutrum bibendum minima est...",
    },
    {
      image: "/profile.png",
      name: "Edward Ruther",
      rating: 4,
      text: "Reprehenderit aenean occaecati fugit, orci sodales culpa perspiciatis optio condimentum laboris hendrerit, rutrum bibendum minima est...",
    },
    {
      image: "/profile.png",
      name: "Edward Ruther",
      rating: 5,
      text: "Reprehenderit aenean occaecati fugit, orci sodales culpa perspiciatis optio condimentum laboris hendrerit, rutrum bibendum minima est...",
    },
    {
      image: "/profile.png",
      name: "Edward Ruther",
      rating: 3,
      text: "Reprehenderit aenean occaecati fugit, orci sodales culpa perspiciatis optio condimentum laboris hendrerit, rutrum bibendum minima est...",
    },
  ];

  return (
    <div className="px-4 sm:px-10 py-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Testimonials</h2>

        {/* arrows mobile */}
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

      {/* MOBILE SCROLL */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto md:hidden scroll-smooth pb-2 no-scrollbar"
      >
        {creatives.map((c, i) => (
          <div
            key={i}
            className="min-w-[85%] bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col justify-between h-65"
          >
            {/* TOP */}
            <div className="flex items-center gap-3">
              <img
                src={c.image}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-sm">{c.name}</p>
                <p className="text-xs text-gray-500">{"★".repeat(c.rating)}</p>
              </div>
            </div>

            {/* TEXT */}
            <p className="text-sm text-gray-700 mt-3 line-clamp-4">{c.text}</p>
          </div>
        ))}
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden md:grid grid-cols-4 gap-5 mt-6">
        {creatives.map((c, i) => (
          <div
            key={i}
            className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex flex-col justify-between h-65"
          >
            <div className="flex items-center gap-3">
              <img
                src={c.image}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-sm">{c.name}</p>
                <p className="text-xs text-gray-500">{"★".repeat(c.rating)}</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 mt-3 line-clamp-4">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
