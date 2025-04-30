import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { acceptOrder, rejectOrder } from "../../services/api";
import { Button, message, Tag, Tooltip, Steps, Divider } from "antd";
import {
  CarOutlined,
  UserOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  SwapRightOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";

const RentalCard = ({ order, onStatusChange }) => {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAccept = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      await acceptOrder(order._id);
      setStatus("confirmed");
      message.success("Order accepted successfully");
      onStatusChange();
    } catch (error) {
      console.error("Error accepting order:", error);
      message.error("Failed to accept order");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      await rejectOrder(order._id);
      setStatus("cancelled");
      message.success("Order rejected successfully");
      onStatusChange();
    } catch (error) {
      console.error("Error rejecting order:", error);
      message.error("Failed to reject order");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate("/admin/dashboard", { state: { order } });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("vie-VN", options);
  };

  const getStatusTag = () => {
    const statusConfig = {
      pending: { color: "warning", icon: <ClockCircleOutlined /> },
      confirmed: { color: "success", icon: <CheckCircleOutlined /> },
      cancelled: { color: "error", icon: <CloseCircleOutlined /> },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <Tag
        icon={config.icon}
        color={config.color}
        className="px-4 py-2 text-lg font-medium"
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Tag>
    );
  };

  // Helper to determine if we have both start and end dates
  const hasDateRange = order.startDate && order.endDate;

  // Calculate rental duration in days if both dates exist
  const calculateDuration = () => {
    if (!hasDateRange) return null;

    const start = new Date(order.startDate);
    const end = new Date(order.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const duration = calculateDuration();

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 h-full flex flex-col cursor-pointer overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Card Header - Vehicle Info with Highlight */}
      <div className="border-b border-gray-200 p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <CarOutlined className="mr-2 text-blue-500 text-xl" />
            {order.vehicle.make} {order.vehicle.model}
          </h3>
          <div>
            {getStatusTag()}
            {/* Format date to show only date and hour */}
            <span className="border border-gray-300 rounded px-2 py-1 text-sm">
              {formatDate(order.createdAt)}
            </span>
          </div>
        </div>
        <p className="text-base text-gray-700">
          <span className="font-medium">Type:</span> {order.vehicle.type}
        </p>
      </div>

      {/* Timeline for Rental Dates */}
      <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex flex-col items-center mr-4">
            <div className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-lg text-sm">
              PICKUP
            </div>
            <div className="text-base font-bold mt-1">
              {formatDate(order.startDate)}
            </div>
          </div>

          <div className="flex-1 px-2">
            <div className="flex items-center justify-center">
              <div className="h-0.5 bg-blue-200 flex-1"></div>
              <div className="mx-2 text-blue-500 text-base font-medium">
                {duration ? `${duration} days` : ""}
              </div>
              <div className="h-0.5 bg-blue-200 flex-1"></div>
            </div>
          </div>

          <div className="flex flex-col items-center ml-4">
            <div className="bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-lg text-sm">
              RETURN
            </div>
            <div className="text-base font-bold mt-1">
              {order.endDate ? formatDate(order.endDate) : "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Card Body - Main Info */}
      <div className="p-5 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-gray-700 flex items-center">
              <UserOutlined className="mr-2 text-blue-500" />
              People
            </h4>
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3">
              <Tooltip title="Renter Information">
                <div className="pl-2 border-l-3 border-blue-300 mb-3">
                  <p className="text-base text-gray-700 mb-1">
                    <span className="font-medium">Customer:</span>
                  </p>
                  <p className="text-base text-gray-900 font-medium ml-3">
                    {order.customer.name}
                  </p>
                </div>
              </Tooltip>
              <Tooltip title="Vehicle Owner Information">
                <div className="pl-2 border-l-3 border-gray-300">
                  <p className="text-base text-gray-700 mb-1">
                    <span className="font-medium">Provider:</span>
                  </p>
                  <p className="text-base text-gray-700 ml-3">
                    {order.provider.name}
                  </p>
                </div>
              </Tooltip>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-base font-semibold text-gray-700 flex items-center">
              <EnvironmentOutlined className="mr-2 text-blue-500" />
              Locations
            </h4>
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3">
              <Tooltip title="Pick-up Location Details">
                <div className="pl-2 border-l-3 border-blue-300 mb-3">
                  <p className="text-base text-gray-700 mb-1">
                    <span className="font-medium">Pick up:</span>
                  </p>
                  <p className="text-base text-gray-900 font-medium ml-3 truncate">
                    {order.pickUpLocation}
                  </p>
                </div>
              </Tooltip>
              <Tooltip title="Drop-off Location Details">
                <div className="pl-2 border-l-3 border-gray-300">
                  <p className="text-base text-gray-700 mb-1">
                    <span className="font-medium">Drop off:</span>
                  </p>
                  <p className="text-base text-gray-700 ml-3 truncate">
                    {order.dropOffLocation}
                  </p>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Price Info - Highlighted Box */}
        <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg mb-3 border border-gray-200">
          <p className="text-lg font-bold text-gray-800">Total Price:</p>
          <div className="bg-white px-4 py-2 rounded-md shadow-sm border border-green-100">
            <p className="text-lg font-bold text-green-600 flex items-center">
              <DollarOutlined className="mr-2 text-green-500" />
              {order.totalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer - Action Buttons */}
      {status === "pending" && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end gap-3">
            <Button
              danger
              onClick={handleReject}
              loading={loading}
              icon={<CloseCircleOutlined />}
              size="large"
              className="text-base px-4"
            >
              Reject
            </Button>
            <Button
              type="primary"
              onClick={handleAccept}
              loading={loading}
              icon={<CheckCircleOutlined />}
              size="large"
              className="text-base px-4"
            >
              Accept
            </Button>
          </div>
        </div>
      )}

      {/* View Details Hint */}
      <div className="absolute top-2 right-2">
        <Tooltip title="Click card to view details">
          <InfoCircleOutlined className="text-gray-400 hover:text-blue-500" />
        </Tooltip>
      </div>
    </div>
  );
};

export default RentalCard;