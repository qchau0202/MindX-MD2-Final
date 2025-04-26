import { NavLink } from "react-router-dom";
import {
  HomeOutlined,
  CarOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md p-4 flex flex-col justify-between h-screen">
      <div>
        <h3 className="text-gray-400 text-sm font-semibold mb-4">MAIN MENU</h3>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 bg-blue-500 text-white rounded-lg"
                  : "flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              }
            >
              <HomeOutlined className="mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/carRent"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 bg-blue-500 text-white rounded-lg"
                  : "flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              }
            >
              <CarOutlined className="mr-3" />
              Car Rent
            </NavLink>
          </li>
        </ul>

        <h3 className="text-gray-400 text-sm font-semibold mt-6 mb-4">
          PREFERENCES
        </h3>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 bg-blue-500 text-white rounded-lg"
                  : "flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              }
            >
              <SettingOutlined className="mr-3" />
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/help"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 bg-blue-500 text-white rounded-lg"
                  : "flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              }
            >
              <QuestionCircleOutlined className="mr-3" />
              Help & Center
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Logout cố định ở dưới cùng */}
      <div>
        <NavLink
          to="/logout"
          className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <LogoutOutlined className="mr-3" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
