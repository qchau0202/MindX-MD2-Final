import React from "react";
import { Avatar } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  EditOutlined,
} from "@ant-design/icons";

const ProfileOverview = ({ user, statusStyle, onEditProfile }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Banner */}
      <div className="h-36 bg-gradient-to-r from-blue-500 to-indigo-500 relative">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="relative w-[120px] h-[120px]">
            <Avatar
              size={120}
              src={user.avatar || "https://i.pravatar.cc/150?img=3"}
              icon={<UserOutlined />}
              className="border-4 border-white shadow-md"
            />
            <button
              onClick={onEditProfile}
              className="absolute bottom-2 right-2 bg-white text-blue-500 rounded-full p-2 shadow hover:scale-105 transition"
            >
              <EditOutlined />
            </button>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="mt-20 px-6 pb-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
          >
            {user.role}
          </span>
        </div>

        {/* Details */}
        <div className="bg-gray-50 rounded-xl p-5 space-y-5">
          <h1 className="text-lg font-semibold text-gray-700 pb-2">
            Personal Information
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                label: "Username",
                value: user.name,
                icon: <UserOutlined />,
                color: "bg-blue-100 text-blue-500",
              },
              {
                label: "Email",
                value: user.email || "Not provided",
                icon: <MailOutlined />,
                color: "bg-green-100 text-green-500",
              },
              {
                label: "Phone",
                value: user.phone || "Not provided",
                icon: <PhoneOutlined />,
                color: "bg-purple-100 text-purple-500",
              },
              {
                label: "Role",
                value: user.role,
                icon: <IdcardOutlined />,
                color: "bg-orange-100 text-orange-500",
              },
            ].map(({ label, value, icon, color }, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-4 hover:bg-gray-100 p-3 rounded-lg shadow-sm"
              >
                <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-lg font-medium text-gray-800">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
