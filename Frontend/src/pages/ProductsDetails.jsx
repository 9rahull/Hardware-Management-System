export default function ProductDescription() {
  return (
    <section className="bg-[#f9f5e7] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Product Categories
          </h1>
          <p className="text-gray-600 text-lg">
            A complete range of hardware products for everyday needs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Bathroom Fixtures
            </h3>
            <p className="text-gray-600">
              Taps, showers, commodes, and bathroom accessories.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Kitchen Essentials
            </h3>
            <p className="text-gray-600">
              Sinks, faucets, and kitchen accessories.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Plumbing Solutions
            </h3>
            <p className="text-gray-600">
              Pipes, fittings, and plumbing repair tools.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Tools & Equipment
            </h3>
            <p className="text-gray-600">
              Professional tools for construction and maintenance.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Door Fittings
            </h3>
            <p className="text-gray-600">
              Handles, locks, hinges, and accessories.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Faucets
            </h3>
            <p className="text-gray-600">
              Different varieties of faucets from multiple brands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
