import React, { useState, useEffect } from "react";
import { getOrders } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { message, Empty, Spin, Button, Dropdown, Menu } from "antd";
import { FaCar, FaFilter, FaSearch } from "react-icons/fa";
import OrderCard from "../../components/order/OrderCard";
import getStatusColor from "../../utils/getStatusColor";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch orders data
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        message.error("Please log in to view your orders.");
        navigate("/login");
        return;
      }

      try {
        const response = await getOrders();
        if (response.data.success) {
          setOrders(response.data.data);
          setFilteredOrders(response.data.data);
        } else {
          message.error(response.data.message || "Failed to fetch orders.");
        }
      } catch (error) {
        message.error(
          error.message || "An error occurred while fetching orders."
        );
        if (error.response?.data?.message === "Invalid token") {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  // Filter orders based on status and search term
  useEffect(() => {
    let result = orders;

    if (filter !== "all") {
      result = result.filter((order) => order.status === filter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (order) =>
          `${order.vehicle.make} ${order.vehicle.model}`
            .toLowerCase()
            .includes(term) ||
          order.pickUpLocation.toLowerCase().includes(term) ||
          order.dropOffLocation.toLowerCase().includes(term) ||
          order.provider.name.toLowerCase().includes(term)
      );
    }

    setFilteredOrders(result);
  }, [orders, filter, searchTerm]);

  // Callback to update orders after cancellation or deletion
  const updateOrderStatus = (orderId, newStatus) => {
    if (newStatus === "deleted") {
      setOrders(orders.filter((order) => order._id !== orderId));
    } else {
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <Spin size="large" />
        <div className="text-lg text-gray-600 mt-4">Loading your orders...</div>
      </div>
    );
  }

  // Filter menu for dropdown
  const filterMenu = (
    <Menu onClick={({ key }) => setFilter(key)}>
      <Menu.Item key="all">All Orders</Menu.Item>
      <Menu.Item key="confirmed">Confirmed</Menu.Item>
      <Menu.Item key="pending">Pending</Menu.Item>
      <Menu.Item key="cancelled">Cancelled</Menu.Item>
      <Menu.Item key="completed">Completed</Menu.Item>
    </Menu>
  );

  // Empty state content
  const emptyContent = (
    <div className="text-center py-12">
      <p className="text-lg text-gray-500 mb-4">
        {searchTerm || filter !== "all"
          ? "No orders match your filters."
          : "You have no orders yet."}
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
      >
        <FaCar />
        <span>Browse Vehicles</span>
      </button>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header with search and filter */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Orders</h1>

        <div className="flex space-x-3">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 hover:border-blue-500 focus:border-blue-500 w-60 bg-white"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Filter Dropdown */}
          <Dropdown overlay={filterMenu} trigger={["click"]}>
            <Button className="flex items-center w-54">
              <FaFilter />
              <span>
                {filter === "all"
                  ? "All Orders"
                  : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </span>
            </Button>
          </Dropdown>
        </div>
      </div>

      {/* Order list or empty state */}
      {filteredOrders.length === 0 ? (
        <Empty description={emptyContent} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              statusStyle={getStatusColor(order.status)}
              onUpdateOrder={updateOrderStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;