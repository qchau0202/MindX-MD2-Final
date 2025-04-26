import { Button, Dropdown, Menu } from "antd";
import { FaEllipsisV } from "react-icons/fa";

const OrderHeader = ({ order, statusStyle }) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
      <div className="flex justify-between items-start">
        <h1 className="text-xl font-bold text-gray-800">
          {order.vehicle.make} {order.vehicle.model}
        </h1>
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="contact">Contact Provider</Menu.Item>
                <Menu.Item key="receipt">Download Receipt</Menu.Item>
                {order.status === "pending" && (
                  <Menu.Item key="cancel" danger>
                    Cancel Order
                  </Menu.Item>
                )}
              </Menu>
            }
            trigger={["click"]}
          >
            <Button
              type="text"
              icon={<FaEllipsisV />}
              className="text-gray-500 hover:text-gray-700"
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
