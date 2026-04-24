"use client";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 sm:px-10 md:px-20 py-12">
      {/* TOP CONTENT */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* LEFT */}
        <div className="flex flex-col gap-3 max-w-sm">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="logo" className="w-8 h-8" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-wider">
              M<span className="text-[#E2C37F]">o</span>ment
            </h1>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">
            Reprehenderit aenean occaecati fugit, orci sodales culpa
            perspiciatis optio condimentum laboris hendrerit.
          </p>
        </div>

        {/* RIGHT LINKS */}
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-20">
          {/* COMPANY */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Company</h2>
            <p className="text-gray-300 hover:text-white cursor-pointer">
              About us
            </p>
            <p className="text-gray-300 hover:text-white cursor-pointer">
              Careers
            </p>
            <p className="text-gray-300 hover:text-white cursor-pointer">
              Contact
            </p>
          </div>

          {/* LINKS */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <p
              onClick={() =>
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="cursor-pointer"
            >
              Home
            </p>

            <p
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="cursor-pointer"
            >
              Features
            </p>

            <p
              onClick={() =>
                document
                  .getElementById("how")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="cursor-pointer"
            >
              How it Works
            </p>

            <p
              onClick={() =>
                document
                  .getElementById("creatives")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="cursor-pointer"
            >
              Testimonials
            </p>
          </div>
        </div>
      </div>

      {/* DIVIDER LINE */}
      <div className="max-w-6xl mx-auto mt-10">
        <hr className="border-t border-[#E2C37F]/40" />
      </div>

      <p className="text-center text-gray-400 text-sm mt-6">
        © {new Date().getFullYear()} Moment. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
