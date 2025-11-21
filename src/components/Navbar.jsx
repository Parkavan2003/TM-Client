import React, { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { updateURL } from "../utils";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  useEffect(() => {
    updateURL({ searchTerm, navigate, location });
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center px-4 py-3 2xl:py-4 sticky top-0 z-20
      bg-white/40 dark:bg-black/20 backdrop-blur-xl shadow-md border-b border-white/20">

      {/* Sidebar Toggle */}
      <div className="flex gap-4 items-center">
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className="text-3xl text-blue-700 block md:hidden"
        >
          ☰
        </button>

        {location?.pathname !== "/dashboard" && (
          <form
            onSubmit={handleSubmit}
            className="w-64 2xl:w-[400px] flex items-center gap-2 px-3 py-2
            rounded-full bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/30 shadow-sm"
          >
            <MdOutlineSearch className="text-blue-700 text-xl" />

            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white placeholder:text-gray-500"
            />
          </form>
        )}
      </div>

      {/* Profile */}
      <div className="flex gap-3 items-center">
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
