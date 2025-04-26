import React from "react";
import { Input, Avatar, Badge, Space, Button, Dropdown } from "antd";
import { SearchOutlined, HeartOutlined, BellOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FaBoxOpen } from "react-icons/fa";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log(user);
  const menuItems = [
    {
      key: "profile",
      label: <NavLink to="/profile" className="text-lg">My Profile</NavLink>,
    },
    {
      key: "logout",
      label: <span onClick={logout} className="text-lg">Logout</span>,
    },
  ];

  return (
    <header className="bg-white shadow-sm">
      {/* Desktop layout */}
      <div className="hidden md:flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <NavLink className="text-2xl font-bold text-blue-600" to="/">
          MORENT
        </NavLink>

        {/* Search Bar */}
        <div className="w-1/3">
          <Input
            placeholder="Search something here"
            prefix={<SearchOutlined className="text-gray-400 h-8" />}
            className="rounded-full border-gray-300"
          />
        </div>

        {/* Icons and Auth Buttons */}
        <Space size="large">
          <Button
            type="default"
            icon={<FaBoxOpen />}
            onClick={() => navigate("/orders")}
          >
            Order
          </Button>
          <HeartOutlined className="text-xl text-gray-600 hover:text-blue-600 cursor-pointer" />
          <Badge dot>
            <BellOutlined className="text-xl text-gray-600 hover:text-blue-600 cursor-pointer" />
          </Badge>
          {user ? (
            <Dropdown
              menu={{ items: menuItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Space className="cursor-pointer">
                <span className="text-gray-600">{user.name}</span>
                <Avatar src="https://i.pravatar.cc/150?img=3" size="default" />
              </Space>
            </Dropdown>
          ) : (
            <Space>
              <NavLink to="/login">
                <Button type="default">Login</Button>
              </NavLink>
              <NavLink to="/register">
                <Button type="primary">Register</Button>
              </NavLink>
            </Space>
          )}
        </Space>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col px-4 py-3">
        {/* Row 1: Icons and Auth Buttons */}
        <div className="flex justify-end items-center mb-3">
          <Space size="middle">
            <HeartOutlined className="text-lg text-gray-600 hover:text-blue-600 cursor-pointer" />
            <Badge dot>
              <BellOutlined className="text-lg text-gray-600 hover:text-blue-600 cursor-pointer" />
            </Badge>
            {user ? (
              <Dropdown
                menu={{ items: menuItems }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Space className="cursor-pointer">
                  <Avatar src="https://i.pravatar.cc/150?img=3" size="small" />
                  <span className="text-gray-600 text-sm">{user.name}</span>
                </Space>
              </Dropdown>
            ) : (
              <Space size="small">
                <NavLink to="/login">
                  <Button type="default" size="small">
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/register">
                  <Button type="primary" size="small">
                    Register
                  </Button>
                </NavLink>
              </Space>
            )}
          </Space>
        </div>

        {/* Row 2: Logo */}
        <div className="flex mb-3">
          <div className="text-xl font-bold text-blue-600">MORENT</div>
        </div>

        {/* Row 3: Search Bar */}
        <div className="w-full">
          <Input
            placeholder="Search something here"
            prefix={<SearchOutlined className="text-gray-400" />}
            className="rounded-full border-gray-300 text-sm"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
