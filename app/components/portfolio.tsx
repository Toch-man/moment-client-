"use client";

import Image from "next/image";
import { Star } from "lucide-react";

export default function PortfolioCarousel() {
  const data = [
    {
      name: "Anupom Kumar",
      role: "Videographer",
      location: "New York, NY",
      rating: 4.8,
      reviews: 43,
      image: "/portfolioImage1.png",
    },
    {
      name: "Sarah Johnson",
      role: "Photographer",
      location: "Los Angeles, CA",
      rating: 4.6,
      reviews: 28,
      image: "/portfolioImage1.png",
    },
    {
      name: "David Smith",
      role: "Brand Designer",
      location: "London, UK",
      rating: 4.9,
      reviews: 61,
      image: "/portfolioImage1.png",
    },
  ];

  return (
    <div className="w-full">
      {/* MOBILE SCROLL CONTAINER */}
      <div className="flex gap-4 overflow-x-auto md:hidden scroll-smooth pb-3">
        {data.map((item, i) => (
          <div
            key={i}
            className="min-w-[85%] bg-[#E2C37F] rounded-2xl overflow-hidden shadow-md"
          >
            {/* IMAGE */}
            <div className="relative w-full h-56">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-2 text-black">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">{item.name}</h2>

                <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                  Recommended
                </span>
              </div>

              <p className="text-sm text-gray-800">{item.role}</p>

              <p className="text-sm flex items-center gap-2">{item.location}</p>

              <p className="text-sm font-semibold flex items-center gap-1">
                <Star size={16} className="text-black fill-black" />
                {item.rating} ({item.reviews} reviews)
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, i) => (
          <div
            key={i}
            className="bg-[#E2C37F] rounded-2xl overflow-hidden shadow-md hover:scale-[1.02] transition"
          >
            <div className="relative w-full h-60">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5 space-y-2 text-black">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl">{item.name}</h2>

                <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                  Recommended
                </span>
              </div>

              <p className="text-sm text-gray-800">{item.role}</p>

              <p className="text-sm"> {item.location}</p>

              <p className="text-sm font-semibold flex items-center gap-1">
                <Star size={16} className="text-black fill-black" />
                {item.rating} ({item.reviews} reviews)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
