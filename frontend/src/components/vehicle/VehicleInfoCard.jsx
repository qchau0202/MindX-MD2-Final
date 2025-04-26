import React from "react";
import { Button, Select, DatePicker, TimePicker } from "antd";
import { FireOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons";

const VehicleInfoCard = ({
  vehicle,
  rentalInfo,
  onRentalInfoChange,
  onRentNow,
}) => {
  const locations = ["Ho Chi Minh", "Hanoi", "Da Nang", "Da Lat"];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-2">
        {vehicle.make} {vehicle.model}
      </h2>
      <p className="text-base text-gray-500 mb-4">{vehicle.type}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <FireOutlined className="mr-2" />
          <span>{vehicle.fuel}</span>
        </div>
        <div className="flex items-center">
          <SettingOutlined className="mr-2" />
          <span>{vehicle.transmission}</span>
        </div>
        <div className="flex items-center">
          <TeamOutlined className="mr-2" />
          <span>{vehicle.capacity} People</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold">
            {vehicle.pricePerDay.toLocaleString("en-US")} VND/day
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Select
          placeholder="Pick-up Location"
          value={rentalInfo.pickUpLocation}
          onChange={(value) => onRentalInfoChange("pickUpLocation", value)}
          className="w-full"
        >
          {locations.map((city) => (
            <Select.Option key={city} value={city}>
              {city}
            </Select.Option>
          ))}
        </Select>
        <Select
          placeholder="Drop-off Location"
          value={rentalInfo.dropOffLocation}
          onChange={(value) => onRentalInfoChange("dropOffLocation", value)}
          className="w-full"
        >
          {locations.map((city) => (
            <Select.Option key={city} value={city}>
              {city}
            </Select.Option>
          ))}
        </Select>
        <DatePicker
          placeholder="Pick-up Date"
          value={rentalInfo.pickUpDate}
          onChange={(value) => onRentalInfoChange("pickUpDate", value)}
          className="w-full"
        />
        <TimePicker
          placeholder="Pick-up Time"
          value={rentalInfo.pickUpTime}
          onChange={(value) => onRentalInfoChange("pickUpTime", value)}
          className="w-full"
        />
        <DatePicker
          placeholder="Drop-off Date"
          value={rentalInfo.dropOffDate}
          onChange={(value) => onRentalInfoChange("dropOffDate", value)}
          className="w-full"
        />
        <TimePicker
          placeholder="Drop-off Time"
          value={rentalInfo.dropOffTime}
          onChange={(value) => onRentalInfoChange("dropOffTime", value)}
          className="w-full"
        />
      </div>
      <Button type="primary" onClick={onRentNow} className="w-full mt-4">
        Rent Now
      </Button>
    </div>
  );
};

export default VehicleInfoCard;
