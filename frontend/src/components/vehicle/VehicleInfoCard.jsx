import React from "react";
import { Button, Select, DatePicker, TimePicker, message } from "antd";
import { FireOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const VehicleInfoCard = ({ vehicle, rentalInfo, onRentalInfoChange }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const locations = ["Ho Chi Minh", "Hanoi", "Da Nang", "Da Lat"];

  const disabledPickUpDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const disabledDropOffDate = (current) => {
    if (rentalInfo.pickUpDate) {
      return (
        current &&
        current < dayjs(rentalInfo.pickUpDate, "YYYY-MM-DD").startOf("day")
      );
    }
    return current && current < dayjs().startOf("day");
  };

  const handleRentNow = () => {
    // Navigate to login if user is not authenticated
    if (!user) {
      navigate("/login", {
        state: { from: "/vehicles/vehiclePayment", car: vehicle, rentalInfo },
      });
      return;
    }

    // Validate rentalInfo fields
    const missingFields = [];
    if (
      !rentalInfo?.pickUpLocation ||
      typeof rentalInfo.pickUpLocation !== "string"
    ) {
      missingFields.push("Pick up location");
    }
    if (
      !rentalInfo?.dropOffLocation ||
      typeof rentalInfo.dropOffLocation !== "string"
    ) {
      missingFields.push("Drop off location");
    }
    if (
      !rentalInfo?.pickUpDate ||
      !(
        rentalInfo.pickUpDate instanceof Date ||
        typeof rentalInfo.pickUpDate === "string"
      )
    ) {
      missingFields.push("Pick up date");
    }
    if (
      !rentalInfo?.dropOffDate ||
      !(
        rentalInfo.dropOffDate instanceof Date ||
        typeof rentalInfo.dropOffDate === "string"
      )
    ) {
      missingFields.push("Drop off date");
    }
    if (!rentalInfo?.pickUpTime || typeof rentalInfo.pickUpTime !== "string") {
      missingFields.push("Pick up time");
    }
    if (
      !rentalInfo?.dropOffTime ||
      typeof rentalInfo.dropOffTime !== "string"
    ) {
      missingFields.push("Drop off time");
    }

    if (missingFields.length > 0) {
      messageApi.info(`Please choose: ${missingFields.join(", ")}.`);
      return;
    }

    // Navigate to payment page if all fields are valid
    navigate("/vehicles/vehiclePayment", {
      state: { car: vehicle, rentalInfo },
    });
  };

  return (
    <div className="p-12 bg-white rounded-lg shadow-md">
      {contextHolder}
      <h1 className="text-4xl font-bold mb-2">
        {vehicle.make} {vehicle.model}
      </h1>
      <p className="text-lg text-gray-500 mb-4">{vehicle.type}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-lg">
          <FireOutlined className="mr-2" />
          <span>{vehicle.fuel}</span>
        </div>
        <div className="flex items-center text-lg">
          <SettingOutlined className="mr-2" />
          <span>{vehicle.transmission}</span>
        </div>
        <div className="flex items-center text-lg">
          <TeamOutlined className="mr-2" />
          <span>{vehicle.capacity} People</span>
        </div>
        <div className="flex items-center text-lg">
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
          size="large"
          suffixIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          }
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
          size="large"
          suffixIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          }
        >
          {locations.map((city) => (
            <Select.Option key={city} value={city}>
              {city}
            </Select.Option>
          ))}
        </Select>
        <DatePicker
          placeholder="Pick-up Date"
          value={
            rentalInfo.pickUpDate
              ? dayjs(rentalInfo.pickUpDate, "YYYY-MM-DD")
              : null
          }
          onChange={(date) =>
            onRentalInfoChange(
              "pickUpDate",
              date ? date.format("YYYY-MM-DD") : null
            )
          }
          className="w-full"
          size="large"
          disabledDate={disabledPickUpDate}
          suffixIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          }
        />
        <TimePicker
          placeholder="Pick-up Time"
          value={
            rentalInfo.pickUpTime ? dayjs(rentalInfo.pickUpTime, "HH:mm") : null
          }
          onChange={(time) =>
            onRentalInfoChange("pickUpTime", time ? time.format("HH:mm") : null)
          }
          className="w-full"
          size="large"
          format="HH:mm"
          suffixIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          }
        />
        <DatePicker
          placeholder="Drop-off Date"
          value={
            rentalInfo.dropOffDate
              ? dayjs(rentalInfo.dropOffDate, "YYYY-MM-DD")
              : null
          }
          onChange={(date) =>
            onRentalInfoChange(
              "dropOffDate",
              date ? date.format("YYYY-MM-DD") : null
            )
          }
          className="w-full"
          size="large"
          disabledDate={disabledDropOffDate}
          suffixIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          }
        />
        <TimePicker
          placeholder="Drop-off Time"
          value={
            rentalInfo.dropOffTime
              ? dayjs(rentalInfo.dropOffTime, "HH:mm")
              : null
          }
          onChange={(time) =>
            onRentalInfoChange(
              "dropOffTime",
              time ? time.format("HH:mm") : null
            )
          }
          className="w-full"
          size="large"
          format="HH:mm"
          suffixIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          }
        />
      </div>
      <Button
        type="primary"
        size="large"
        onClick={handleRentNow}
        className="w-full mt-4"
      >
        Rent Now
      </Button>
    </div>
  );
};

export default VehicleInfoCard;