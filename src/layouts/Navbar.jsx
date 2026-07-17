import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../components/button";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white shadow-md border-b md:ml">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center relative">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 md:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Menu size={20} />
        </button>

        {/* Left Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-sky-300 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">EMS</span>

          </div>
        </div>

        {/* Center Title */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-xl font-bold text-gray-800">
            Employee Management System
          </h1>

        </div>

        {/* Right Login Button */}
        <div className="ml-auto">

          <Button asChild>
            <Link
              to="/login"
            >
              Login
            </Link></Button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;