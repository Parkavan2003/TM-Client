import clsx from "clsx";
import React from "react";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlinePendingActions,
  MdTaskAlt,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import logo from "../assets/cogni-logo.jpeg";

const linkData = [
  { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
  { label: "Tasks", link: "tasks", icon: <FaTasks /> },
  { label: "Completed", link: "completed/completed", icon: <MdTaskAlt /> },
  { label: "In Progress", link: "in-progress/in progress", icon: <MdOutlinePendingActions /> },
  { label: "To Do", link: "todo/todo", icon: <MdOutlinePendingActions /> },
  { label: "Team", link: "team", icon: <FaUsers /> },
  { label: "Status", link: "status", icon: <IoCheckmarkDoneOutline /> },
  { label: "Trash", link: "trashed", icon: <FaTrashAlt /> },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    const isActive = path === el.link.split("/")[0];

    return (
      <Link
        onClick={closeSidebar}
        to={el.link}
        className={clsx(
          "w-full lg:w-3/4 flex gap-3 px-4 py-2 rounded-xl items-center text-base font-medium transition-all backdrop-blur-lg",
          isActive
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-700 dark:text-gray-300 hover:bg-blue-100/30 dark:hover:bg-white/10 hover:text-blue-600"
        )}
      >
        <span className={isActive ? "text-white text-xl" : "text-blue-600 text-xl"}>
          {el.icon}
        </span>
        <span>{el.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5 bg-white/30 dark:bg-black/20 backdrop-blur-xl border-r border-white/20 shadow-lg">
      <h1 className="flex items-center text-center">
        <p className="w-12 p-1 rounded-xl bg-white/40 backdrop-blur-md">
          <img src={logo} alt="logo-img" className="rounded-lg" />
        </p>
        <span className="text-2xl font-bold text-blue-700 dark:text-white tracking-wide">
          Taskifyz
        </span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
