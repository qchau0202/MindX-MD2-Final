import React from "react";
import { Input, Avatar, Badge, Space } from "antd";
import { SearchOutlined, HeartOutlined, BellOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">MORENT</div>

      {/* Search Bar */}
      <div className="w-1/3">
        <Input
          placeholder="Search something here"
          prefix={<SearchOutlined className="text-gray-400" />}
          className="rounded-full border-gray-300"
        />
      </div>

      {/* Icons and Avatar */}
      <Space size="large">
        <HeartOutlined className="text-xl text-gray-600 hover:text-blue-600 cursor-pointer" />
        <Badge dot>
          <BellOutlined className="text-xl text-gray-600 hover:text-blue-600 cursor-pointer" />
        </Badge>
        <Avatar src="https://i.pravatar.cc/150?img=3" size="default" />
      </Space>
    </header>
  );
};

export default Header;
