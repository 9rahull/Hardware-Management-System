// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="w-full bg-white px-8 py-4 flex justify-between items-center shadow">
//       <h1 className="text-xl font-bold">Hardware Management System</h1>

//       <div className="space-x-6">
//         <Link to="/" className="hover:text-emerald-600">
//           Home
//         </Link>

//         <Link to="/products" className="hover:text-emerald-600">
//           ViewProducts
//         </Link>

//         <Link to="/login" className="hover:text-emerald-600">
//           Staff Login
//         </Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-white px-8 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Hardware Management System</h1>

      <div className="space-x-6">
        <Link to="/" className="hover:text-emerald-600">
          Home
        </Link>

        <Link to="/products" className="hover:text-emerald-600">
          ViewProducts
        </Link>

        <Link to="/login" className="hover:text-emerald-600">
          Staff Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;