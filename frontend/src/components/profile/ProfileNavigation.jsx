import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUser,
  FaBoxOpen,
  FaEdit,
  FaSignOutAlt,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
import { Button, Tooltip, Divider } from "antd";

const ProfileNavigation = ({ onEditProfile, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.includes("orders")
    ? "orders"
    : "overview";

  const handleNavigation = (key) => {
    navigate(key === "overview" ? "/profile" : "/profile/orders");
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6 overflow-hidden">
      {/* Profile Navigation Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
          <FaUser className="text-white text-lg" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Account Menu</h2>
      </div>

      <nav className="space-y-3 mb-8">
        <Tooltip title="View your profile information" placement="right">
          <button
            onClick={() => handleNavigation("overview")}
            className={`w-full flex items-center space-x-3 p-4 rounded-xl text-md font-medium transition-all duration-200 ${
              activeTab === "overview"
                ? "bg-blue-50 text-blue-700 border-blue-600 shadow-sm"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FaUser
              className={`text-xl ${
                activeTab === "overview" ? "text-blue-600" : "text-gray-500"
              }`}
            />
            <span>Overview</span>
          </button>
        </Tooltip>

        <Tooltip title="View your rental orders" placement="right">
          <button
            onClick={() => handleNavigation("orders")}
            className={`w-full flex items-center space-x-3 p-4 rounded-xl text-md font-medium transition-all duration-200 ${
              activeTab === "orders"
                ? "bg-blue-50 text-blue-700 border-blue-600 shadow-sm"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FaBoxOpen
              className={`text-xl ${
                activeTab === "orders" ? "text-blue-600" : "text-gray-500"
              }`}
            />
            <span>Orders</span>
          </button>
        </Tooltip>

        {/* Thêm các menu item sau */}
        <button
          className="w-full flex items-center space-x-3 p-4 rounded-xl text-md font-medium transition-all duration-200 text-gray-400 hover:text-gray-500 hover:bg-gray-50"
          disabled
        >
          <FaCog className="text-xl text-gray-400" />
          <span>Settings</span>
        </button>

        <button
          className="w-full flex items-center space-x-3 p-4 rounded-xl text-md font-medium transition-all duration-200 text-gray-400 hover:text-gray-500 hover:bg-gray-50"
          disabled
        >
          <FaQuestionCircle className="text-xl text-gray-400" />
          <span>Help Center</span>
        </button>
      </nav>

      <Divider className="my-6" />

      <div className="space-y-4">
        <Button
          type="primary"
          onClick={onEditProfile}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-none text-white h-12 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          size="large"
        >
          <FaEdit />
          <span>Edit Profile</span>
        </Button>

        <Button
          type="default"
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 border border-gray-300 hover:border-red-300 hover:text-red-600 text-gray-700 h-12 rounded-xl transition-all duration-300"
          size="large"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default ProfileNavigation;
