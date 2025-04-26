import React, { useState } from "react";
import { Select, DatePicker } from "antd";

const { Option } = Select;

const DetailsRental = () => {
  const [pickUpCity, setPickUpCity] = useState("Kota Semarang");
  const [dropOffCity, setDropOffCity] = useState("Kota Semarang");
  const [pickUpDate, setPickUpDate] = useState("20 July 2022");
  const [dropOffDate, setDropOffDate] = useState("21 July 2022");
  const [pickUpTime, setPickUpTime] = useState("07:00");
  const [dropOffTime, setDropOffTime] = useState("01:00");

  const cities = ["Kota Semarang"];
  const times = ["07:00", "01:00"];

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
          <h3 className="font-semibold text-lg">Nissan GT-R</h3>
          <p className="text-gray-500 text-sm">
            <span className="mr-2">Sport Car</span>
            <span>#9761</span>
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
              <Option value="20 July 2022">20 July 2022</Option>
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
              <Option value="21 July 2022">21 July 2022</Option>
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
        <span className="text-2xl font-semibold">$80.00</span>
      </div>
    </div>
  );
};

export default DetailsRental;
