import { useState } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar() {
  const [activeTab, setActiveTab] = useState(null);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (index) => {
    setActiveTab(index);
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen px-4 py-6">
      <ul className="space-y-4">
        <li>
          <Link to="/">
            <button
              className={`w-full flex items-center justify-between py-2 px-4 rounded-lg ${
                activeTab === 0 ? "bg-gray-700" : ""
              }`}
              onClick={() => toggleSubmenu(0)}
            >
              <span className="flex items-center space-x-2">
                <RiDashboardFill />
                <span>Dashboard</span>
              </span>
              <IoIosArrowForward />
            </button>
          </Link>
        </li>
        <li>
          <button
            className={`w-full flex items-center justify-between py-2 px-4 rounded-lg ${
              activeTab === 1 ? "bg-gray-700" : ""
            }`}
            onClick={() => toggleSubmenu(1)}
          >
            <span className="flex items-center space-x-2">
              <FaCartArrowDown />
              <span>Products</span>
            </span>
            <IoIosArrowForward />
          </button>
          {openSubmenus[1] && (
            <ul className="ml-6 mt-2 space-y-2 text-gray-300">
              <li>
                <Link to="#">Product List</Link>
              </li>
              <li>
                <Link to="#">Product View</Link>
              </li>
              <li>
                <Link to="#">Product Upload</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/orders">
            <button
              className={`w-full flex items-center justify-between py-2 px-4 rounded-lg ${
                activeTab === 2 ? "bg-gray-700" : ""
              }`}
              onClick={() => toggleSubmenu(2)}
            >
              <span className="flex items-center space-x-2">
                <FaCartArrowDown />
                <span>Orders</span>
              </span>
              <IoIosArrowForward />
            </button>
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <button className="w-full flex items-center justify-between py-2 px-4 rounded-lg">
              <span className="flex items-center space-x-2">
                <FaCartArrowDown />
                <span>Settings</span>
              </span>
              <IoIosArrowForward />
            </button>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
