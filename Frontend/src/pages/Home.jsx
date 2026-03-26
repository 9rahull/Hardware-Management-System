// import Navbar from "../Navbar/Navbar";
// import ProductDetails from "./ProductsDetails";

// function Home() {
//   return (
//     <>
//       <Navbar />

//       {/* HERO SECTION */}
//       <section
//         className="relative h-[80vh] flex items-center justify-center text-white"
//         style={{
//           backgroundImage: "url(/sample.jpg)",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/50"></div>

//         <div className="relative z-10 text-center max-w-xl px-4">
//           <h1 className="text-4xl font-bold mb-4">
//             Hardware Management System
//           </h1>

//           <p className="text-gray-200 mb-6">
//             Manage hardware products, stock, and sales efficiently using a
//             simple and user-friendly system.
//           </p>

//           <button
//             onClick={() =>
//               document
//                 .getElementById("products-section")
//                 .scrollIntoView({ behavior: "smooth" })
//             }
//             className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-md transition"
//           >
//             View Products
//           </button>
//         </div>
//       </section>

//       {/* PRODUCT SECTION */}
//       <div id="products-section">
//         <ProductDetails />
//       </div>
//     </>
//   );
// }

// export default Home;
// import { Link } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
// import ProductDetails from "./ProductsDetails";

// function Home() {
//   return (
//     <>
//       <Navbar />

//       {/* ── HERO ── */}
//       <section className="bg-white border-b border-gray-200">
//         <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">

//           {/* Left: text */}
//           <div className="flex-1">
//             <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3 block">
//               Shrestha Suppliers · Pokhara, Nepal
//             </span>
//             <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
//               Hardware Store <br />
//               <span className="text-blue-600">Management System</span>
//             </h1>
//             <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
//               A simple digital system to manage products, track stock levels,
//               and record sales — replacing manual notebooks with an easy-to-use
//               web platform.
//             </p>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() =>
//                   document
//                     .getElementById("products-section")
//                     .scrollIntoView({ behavior: "smooth" })
//                 }
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition text-sm"
//               >
//                 Browse Products
//               </button>
//               <Link
//                 to="/login"
//                 className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 text-gray-600 font-medium px-6 py-3 rounded-lg transition text-sm"
//               >
//                 Staff Login
//               </Link>
//             </div>
//           </div>

//           {/* Right: quick stats */}
//           <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-sm">
//             <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
//               <div className="text-2xl font-bold text-blue-700">11</div>
//               <div className="text-sm text-blue-600 mt-1">Total Products</div>
//             </div>
//             <div className="bg-green-50 border border-green-100 rounded-xl p-5">
//               <div className="text-2xl font-bold text-green-700">1,665</div>
//               <div className="text-sm text-green-600 mt-1">Units in Stock</div>
//             </div>
//             <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
//               <div className="text-2xl font-bold text-orange-700">2</div>
//               <div className="text-sm text-orange-600 mt-1">Categories</div>
//             </div>
//             <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
//               <div className="text-2xl font-bold text-purple-700">Rs 1.12Cr</div>
//               <div className="text-sm text-purple-600 mt-1">Total Value</div>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* ── WHY THIS SYSTEM ── */}
//       <section className="bg-gray-50 border-b border-gray-200">
//         <div className="max-w-6xl mx-auto px-6 py-14">
//           <h2 className="text-xl font-bold text-gray-800 mb-2">
//             Why Shrestha Suppliers uses this system
//           </h2>
//           <p className="text-gray-500 text-sm mb-8">
//             Moving from manual notebooks to a digital platform
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-white border border-gray-200 rounded-xl p-6">
//               <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xl mb-4">
//                 📦
//               </div>
//               <h3 className="font-semibold text-gray-800 mb-2">
//                 Product Management
//               </h3>
//               <p className="text-sm text-gray-500 leading-relaxed">
//                 Add, edit, and delete products easily. View all items with
//                 category, price, and stock in one place.
//               </p>
//             </div>

//             <div className="bg-white border border-gray-200 rounded-xl p-6">
//               <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-xl mb-4">
//                 📊
//               </div>
//               <h3 className="font-semibold text-gray-800 mb-2">
//                 Stock Tracking
//               </h3>
//               <p className="text-sm text-gray-500 leading-relaxed">
//                 Real-time stock updates after every sale. Get alerts when
//                 items are running low so you never go out of stock.
//               </p>
//             </div>

//             <div className="bg-white border border-gray-200 rounded-xl p-6">
//               <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 text-xl mb-4">
//                 🧾
//               </div>
//               <h3 className="font-semibold text-gray-800 mb-2">
//                 Sales Records
//               </h3>
//               <p className="text-sm text-gray-500 leading-relaxed">
//                 Record every sale and view daily summaries. No more lost
//                 notebooks — all data is stored safely.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── CATEGORIES ── */}
//       <section className="bg-white border-b border-gray-200">
//         <div className="max-w-6xl mx-auto px-6 py-14">
//           <h2 className="text-xl font-bold text-gray-800 mb-2">
//             Product Categories
//           </h2>
//           <p className="text-gray-500 text-sm mb-8">
//             Browse our hardware catalogue by category
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="border border-gray-200 rounded-xl p-6 flex items-center gap-5 hover:border-blue-400 hover:shadow-sm transition cursor-pointer">
//               <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
//                 🚿
//               </div>
//               <div>
//                 <div className="font-semibold text-gray-800">
//                   Bathroom Fittings
//                 </div>
//                 <div className="text-sm text-gray-500 mt-1">
//                   Soap cases, towel rods, paper holders, shower sets, basins
//                 </div>
//                 <div className="text-xs text-blue-600 mt-2 font-medium">
//                   7 products available
//                 </div>
//               </div>
//             </div>

//             <div className="border border-gray-200 rounded-xl p-6 flex items-center gap-5 hover:border-blue-400 hover:shadow-sm transition cursor-pointer">
//               <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
//                 🔧
//               </div>
//               <div>
//                 <div className="font-semibold text-gray-800">
//                   Kitchen Fittings
//                 </div>
//                 <div className="text-sm text-gray-500 mt-1">
//                   Sink mixers, kitchen taps, sinks and other kitchen hardware
//                 </div>
//                 <div className="text-xs text-blue-600 mt-2 font-medium">
//                   4 products available
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── PRODUCTS SECTION ── */}
//       <div id="products-section" className="bg-gray-50">
//         <div className="max-w-6xl mx-auto px-6 pt-14">
//           <h2 className="text-xl font-bold text-gray-800 mb-1">
//             All Products
//           </h2>
//           <p className="text-gray-500 text-sm mb-8">
//             Available hardware items with current prices and stock
//           </p>
//         </div>
//         <ProductDetails />
//       </div>

//       {/* ── FOOTER ── */}
//       <footer className="bg-gray-800 text-gray-400 text-sm">
//         <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <div className="text-white font-semibold mb-2">
//               Shrestha Suppliers
//             </div>
//             <p className="text-gray-400 text-sm leading-relaxed">
//               A web-based hardware store management system built for small
//               hardware businesses in Nepal.
//             </p>
//           </div>
//           <div>
//             <div className="text-white font-semibold mb-2">Quick Links</div>
//             <ul className="space-y-1">
//               <li>
//                 <button
//                   onClick={() =>
//                     document
//                       .getElementById("products-section")
//                       .scrollIntoView({ behavior: "smooth" })
//                   }
//                   className="hover:text-white transition"
//                 >
//                   View Products
//                 </button>
//               </li>
//               <li>
//                 <Link to="/login" className="hover:text-white transition">
//                   Staff Login
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <div className="text-white font-semibold mb-2">Contact</div>
//             <p>Sundar Marg, Pokhara</p>
//             <p>061-576880</p>
//           </div>
//         </div>
//         <div className="border-t border-gray-700 text-center py-4 text-xs text-gray-500">
//           Shrestha Suppliers Hardware Management System · Final Year Project ·
//           London Metropolitan University
//         </div>
//       </footer>
//     </>
//   );
// }

// export default Home;


import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className="bg-white border-b border-gray-200 py-14 px-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Welcome to <span className="text-blue-600">Shrestha Suppliers</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
          Your trusted hardware store in Pokhara, Nepal. Supplying quality
          bathroom and kitchen fittings.
        </p>
      </div>

      {/* MAIN: About + Shop Info */}
      <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* ABOUT US */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">About Us</h2>
          <p className="text-xs text-gray-400 mb-5">Who we are and what we do</p>

          <div className="flex flex-col gap-3">

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Who We Are
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Shrestha Suppliers is a local hardware store based in Sundar
                Marg, Pokhara, Nepal. We supply quality bathroom and kitchen
                fittings to homes and businesses.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                What We Sell
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We stock sink mixers, basin sets, towel rods, soap dispensers,
                paper holders, shower sets, and other bathroom and kitchen
                hardware items.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                About This System
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                This system was built as a Final Year Project to help the shop
                manage products, track stock, and keep records digitally
                instead of manual notebooks.
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

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

            {/* Address */}
            <div className="flex items-start gap-4 px-5 py-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-base flex-shrink-0">
                📍
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Address
                </div>
                <div className="text-sm font-medium text-gray-900">
                  Sundar Marg, Pokhara
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Gandaki Province, Nepal
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 px-5 py-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-base flex-shrink-0">
                📞
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Phone
                </div>
                <div className="text-sm font-medium text-gray-900">
                  061-576880
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Call us during business hours
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex items-start gap-4 px-5 py-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-base flex-shrink-0">
                🕐
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Opening Hours
                </div>
                <div className="text-sm font-medium text-gray-900">
                  Sunday – Friday: 9:00 AM – 6:00 PM
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Saturday: Closed
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="flex items-start gap-4 px-5 py-4">
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-base flex-shrink-0">
                📦
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Products Available
                </div>
                <div className="text-sm font-medium text-gray-900">
                  11 Products · 2 Categories
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Bathroom and Kitchen Fittings
                </div>
              </div>
            </div>

          </div>

          {/* View Products button */}
          <Link
            to="/products"
            className="mt-4 block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition"
          >
            View Our Products →
          </Link>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-800 mt-4">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="text-white font-semibold text-sm mb-1">
              Shrestha Suppliers
            </div>
            <div className="text-gray-400 text-xs">
              Hardware Management System · Final Year Project
            </div>
            <div className="text-gray-400 text-xs">
              London Metropolitan University
            </div>
          </div>
          <div className="text-gray-400 text-xs text-right">
            <div>Sundar Marg, Pokhara, Nepal</div>
            <div>061-576880</div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;

