import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Select, Statistic, Row, Col } from "antd";
import { getOrders } from "../../services/api";

const { Option } = Select;

const DetailsRental = () => {
  const location = useLocation();
  const order = location.state?.order;
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getOrders();
        const orders = response.data.data;
        setStats({
          totalOrders: orders.length,
          pendingOrders: orders.filter((o) => o.status === "pending").length,
          confirmedOrders: orders.filter((o) => o.status === "confirmed")
            .length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  const [pickUpCity, setPickUpCity] = useState(
    order?.pickUpLocation || "Kota Semarang"
  );
  const [dropOffCity, setDropOffCity] = useState(
    order?.dropOffLocation || "Kota Semarang"
  );
  const [pickUpDate, setPickUpDate] = useState(
    order?.startDate ? new Date(order.startDate).toLocaleDateString() : ""
  );
  const [dropOffDate, setDropOffDate] = useState(
    order?.endDate ? new Date(order.endDate).toLocaleDateString() : ""
  );
  const [pickUpTime, setPickUpTime] = useState(order?.pickUpTime || "07:00");
  const [dropOffTime, setDropOffTime] = useState(order?.dropOffTime || "01:00");

  const cities = ["Kota Semarang", "Jakarta"];
  const times = ["07:00", "01:00", "12:00", "15:00"];

  if (!order) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">
          Rental Management Dashboard
        </h2>
        <p className="text-gray-600 mb-6">
          Welcome to the rental management system. Select an order from the list
          to view details or review the statistics below.
        </p>
        <Row gutter={16}>
          <Col span={8}>
            <Statistic title="Total Orders" value={stats.totalOrders} />
          </Col>
          <Col span={8}>
            <Statistic title="Pending Orders" value={stats.pendingOrders} />
          </Col>
          <Col span={8}>
            <Statistic title="Confirmed Orders" value={stats.confirmedOrders} />
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Details Rental</h2>

      {/* Map Placeholder */}
      <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
        <span className="text-gray-500">Map Placeholder</span>
      </div>

      {/* Car Info */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src="https://placehold.co/200x200"
          alt="Car"
          className="w-24 h-16 object-cover rounded-lg"
        />
        <div>
          <h3 className="font-semibold text-lg">
            {order.vehicle.make} {order.vehicle.model}
          </h3>
          <p className="text-gray-500 text-sm">
            <span className="mr-2">{order.vehicle.type}</span>
            <span>#{order.vehicle._id.slice(-4)}</span>
          </p>
        </div>
      </div>

      {/* Pick-Up Section */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-blue-500">●</span>
          <span className="font-semibold">Pick-Up</span>
        </div>
        <div className="flex space-x-4 text-sm">
          <div className="flex-1">
            <label className="block text-gray-600 mb-1">Locations</label>
            <Select
              value={pickUpCity}
              className="w-full"
              onChange={(value) => setPickUpCity(value)}
              suffixIcon={<span className="text-gray-400">▼</span>}
            >
              {cities.map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 mb-1">Date</label>
            <Select
              value={pickUpDate}
              className="w-full"
              onChange={(value) => setPickUpDate(value)}
              suffixIcon={<span className="text-gray-400">▼</span>}
            >
              <Option value={pickUpDate}>{pickUpDate}</Option>
            </Select>
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 mb-1">Time</label>
            <Select
              value={pickUpTime}
              className="w-full"
              onChange={(value) => setPickUpTime(value)}
              suffixIcon={<span className="text-gray-400">▼</span>}
            >
              {times.map((time) => (
                <Option key={time} value={time}>
                  {time}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* Drop-Off Section */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-blue-300">●</span>
          <span className="font-semibold">Drop-Off</span>
        </div>
        <div className="flex space-x-4 text-sm">
          <div className="flex-1">
            <label className="block text-gray-600 mb-1">Locations</label>
            <Select
              value={dropOffCity}
              className="w-full"
              onChange={(value) => setDropOffCity(value)}
              suffixIcon={<span className="text-gray-400">▼</span>}
            >
              {cities.map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 mb-1">Date</label>
            <Select
              value={dropOffDate}
              className="w-full"
              onChange={(value) => setDropOffDate(value)}
              suffixIcon={<span className="text-gray-400">▼</span>}
            >
              <Option value={dropOffDate}>{dropOffDate}</Option>
            </Select>
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 mb-1">Time</label>
            <Select
              value={dropOffTime}
              className="w-full"
              onChange={(value) => setDropOffTime(value)}
              suffixIcon={<span className="text-gray-400">▼</span>}
            >
              {times.map((time) => (
                <Option key={time} value={time}>
                  {time}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* Total Rental Price */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">Total Rental Price</p>
          <p className="text-gray-400 text-sm">
            Overall price and includes rental discount
          </p>
        </div>
        <span className="text-2xl font-semibold">
          {order.totalPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
    </div>
  );
};

export default DetailsRental;