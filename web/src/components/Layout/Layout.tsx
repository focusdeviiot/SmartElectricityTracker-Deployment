import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Navbar from "./Navbar";
import { IoMdLogOut } from "react-icons/io";
import { AuthContext } from "../../contexts/AuthContext";
import { MdElectricBolt } from "react-icons/md";

interface LayoutProps {
  children?: React.ReactNode;
}

const ProfileDropdown: React.FC = () => {
  const auth = useContext(AuthContext);
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <FaUserCircle className="w-10 h-10" />
        </div>
      </div>
      <div
        tabIndex={0}
        className="bg-base-100 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-64"
      >
        <div className="p-1 flex items-center gap-2">
          <div className="w-10 h-10 rounded-full">
            <FaUserCircle className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-lg truncate">{auth?.userName}</h2>
            <p className="text-sm text-primary">
              <span className="text-gray-500">Role:</span>&nbsp;&nbsp;
              {auth?.role}
            </p>
          </div>
        </div>
        <ul className="mt-2 flex flex-col gap-2">
          <li>
            <Link
              className="flex justify-center items-center h-10 text-red-500"
              to="/logout"
            >
              <IoMdLogOut className="w-5 h-5" />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col bg-base-300">
      {/* <Header /> */}
      <nav className="navbar bg-opacity-30 backdrop-blur-lg fixed top-0 w-full z-50 border-b-[1px] border-b-opacity-30 border-b-stone-700">
        <div className="flex-none">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-square btn-ghost drawer-button lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl hover:bg-transparent">
            <MdElectricBolt className="w-8 h-8" />
            Smart Electricity Tracker
          </Link>
        </div>
        <div className="flex-none gap-2 mr-2">
          <ProfileDropdown />
        </div>
      </nav>

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <main className="bg-base-300 h-screen pt-20 drawer-content flex flex-col items-center overflow-y-auto px-5">
          {/* Page content here */}
          <div className="container mx-auto">{children}</div>
        </main>

        <aside className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="h-full w-64 bg-base-300 pt-20 menu p-4 text-base-content overflow-y-auto">
            {/* Sidebar content here */}
            <Navbar />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Layout;
