import { useState } from "react";
import {
  Home,
  PanelLeftOpen,
  PanelLeftClose,
  Users,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { name: "Dashboard", icon: Home, link: "/dashboard" },
    { name: "Users", icon: Users, link: "/dashboard/user" },
  ];

  return (
    <div
      className={`bg-gray-800 text-white h-screen transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* HEADER */}
      <div className="p-4 flex justify-between items-center">
        {/* LOGO */}
        {isOpen && (
          <Link to="/" className="text-2xl font-semibold">
            MaxOTech
          </Link>
        )}

        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-700"
        >
          {isOpen ? (
            <PanelLeftClose className="w-6 h-6" />
          ) : (
            <PanelLeftOpen className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* NAV */}
      <nav className="mt-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.link}
            className={({ isActive }) =>
              `flex items-center p-4 transition-colors ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
            title={!isOpen ? item.name : ""}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {isOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
