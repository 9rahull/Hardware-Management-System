import Navbar from "../Navbar/Navbar";
import ProductDetails from "./ProductsDetails";

function Home() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section
        className="relative h-[80vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url(/sample.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center max-w-xl px-4">
          <h1 className="text-4xl font-bold mb-4">
            Hardware Management System
          </h1>

          <p className="text-gray-200 mb-6">
            Manage hardware products, stock, and sales efficiently using a
            simple and user-friendly system.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("products-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-md transition"
          >
            View Products
          </button>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <div id="products-section">
        <ProductDetails />
      </div>
    </>
  );
}

export default Home;
