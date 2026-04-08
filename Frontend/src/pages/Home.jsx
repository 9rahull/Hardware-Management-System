import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Home() {

  // 🔥 IMAGES
  const images = [
    "/images/sink.jpg",
    "/images/showroom.jpg"
  ];

  const [current, setCurrent] = useState(0);

  // 🔄 AUTO CHANGE EVERY 5 SECONDS
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      {/* 🔥 HERO SECTION */}
      <div className="bg-gradient-to-r from-blue-50 to-gray-100 py-16 px-6">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT TEXT */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to <span className="text-blue-600">Shrestha Suppliers</span>
            </h1>

            <p className="text-gray-500 mb-6">
              Your trusted hardware store in Pokhara, Nepal. Supplying quality
              bathroom and kitchen fittings.
            </p>

            <Link
              to="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              View Products →
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <img
              src={images[current]}
              alt="hardware"
              className="w-full h-[400px] object-contain rounded-xl shadow-lg bg-white"
            />
          </div>

        </div>

      </div>

      {/* MAIN SECTION */}
      <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ABOUT */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">About Us</h2>
          <p className="text-xs text-gray-400 mb-5">Who we are and what we do</p>

          <div className="space-y-4">

            <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="text-sm font-semibold mb-2">Who We Are</h3>
              <p className="text-sm text-gray-500">
                Shrestha Suppliers is a local hardware store in Pokhara. We supply
                quality bathroom and kitchen fittings to homes and businesses.
              </p>
            </div>

            <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="text-sm font-semibold mb-2">What We Sell</h3>
              <p className="text-sm text-gray-500">
                We stock sink mixers, basin sets, towel rods, soap dispensers,
                and other hardware items.
              </p>
            </div>

            <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="text-sm font-semibold mb-2">About This System</h3>
              <p className="text-sm text-gray-500">
                This system helps manage inventory, track stock, and maintain
                records digitally.
              </p>
            </div>

          </div>
        </div>

        {/* SHOP INFO */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            Shop Information
          </h2>
          <p className="text-xs text-gray-400 mb-5">Find us and get in touch</p>

          <div className="bg-white border rounded-xl overflow-hidden shadow-sm">

            <div className="flex gap-4 px-5 py-4 border-b">
              <div>📍</div>
              <div>
                <div className="text-sm font-medium">Sundar Marg, Pokhara</div>
                <div className="text-xs text-gray-400">Nepal</div>
              </div>
            </div>

            <div className="flex gap-4 px-5 py-4 border-b">
              <div>📞</div>
              <div>
                <div className="text-sm font-medium">061-576880</div>
              </div>
            </div>

            <div className="flex gap-4 px-5 py-4 border-b">
              <div>🕐</div>
              <div>
                <div className="text-sm font-medium">
                  Sunday – Friday: 9AM – 6PM
                </div>
              </div>
            </div>

            <div className="flex gap-4 px-5 py-4">
              <div>📦</div>
              <div>
                <div className="text-sm font-medium">
                  Hardware Products Available
                </div>
              </div>
            </div>

          </div>

          <Link
            to="/products"
            className="mt-5 block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl"
          >
            View Products →
          </Link>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-gray-800 mt-6">
        <div className="max-w-5xl mx-auto px-6 py-8 flex justify-between text-gray-400 text-xs">
          <div>
            <div className="text-white font-semibold">Shrestha Suppliers</div>
            <div>Hardware Management System</div>
          </div>
          <div className="text-right">
            <div>Sundar Marg, Pokhara, Nepal</div>
            <div>061-576880,9856020610</div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;