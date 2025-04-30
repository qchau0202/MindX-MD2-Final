import { Button, Dropdown, Menu, message } from "antd";
import { FaEllipsisV } from "react-icons/fa";
import { cancelOrder, deleteOrder } from "../../services/api";

const OrderHeader = ({ order, statusStyle, onUpdateOrder }) => {
  const handleCancelOrder = async () => {
    try {
      const response = await cancelOrder(order._id);
      console.log(response.data.message); // Log success message
      message.success(response.data.message); // Show success message
      onUpdateOrder(order._id, "cancelled"); // Update parent state
    } catch (error) {
      console.error("Error cancelling order:", error.message);
      message.error(error.message || "Failed to cancel order");
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const response = await deleteOrder(order._id);
      console.log(response.data.message); // Log success message
      message.success(response.data.message); // Show success message
      onUpdateOrder(order._id, "deleted"); // Update parent state
    } catch (error) {
      console.error("Error deleting order:", error.message);
      message.error(error.message || "Failed to delete order");
    }
  };

  return (
    <div className="bg-white p-4 border-b border-gray-200">
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
                  <Menu.Item key="cancel" danger onClick={handleCancelOrder}>
                    Cancel Order
                  </Menu.Item>
                )}
                {order.status === "cancelled" && (
                  <Menu.Item key="delete" danger onClick={handleDeleteOrder}>
                    Delete Order
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