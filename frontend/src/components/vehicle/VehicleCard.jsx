import React from "react";
import { useNavigate } from "react-router-dom";
import { FireOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useAuth } from "../../contexts/AuthContext";

const VehicleCard = ({ car, rentalInfo }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const handleRentNow = () => {
    // Navigate to login if user is not authenticated
    if (!user) {
      navigate("/login", {
        state: { from: "/vehicles/vehiclePayment", car, rentalInfo },
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
      state: { car, rentalInfo },
    });
  };

  const handleCardClick = () => {
    console.log("Navigating to vehicle ID:", car._id);
    navigate(`/vehicles/${car._id}`);
  };

  return (
    <>
      {contextHolder}
      <div
        className="bg-white p-4 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={handleCardClick}
      >
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-bold text-2xl truncate">
              {car.make} {car.model}
            </p>
            <p className="text-base font-bold text-gray-400">{car.type}</p>
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="w-full h-40 my-4">
            <img
              src={car.images[0] || "https://via.placeholder.com/400x200"}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-wrap gap-3 text-sm my-6">
            <span className="flex gap-1 items-center">
              <FireOutlined className="text-gray-400 w-4 h-4" />
              <p className="text-base text-gray-400">{car.fuel}</p>
            </span>
            <span className="flex gap-1 items-center">
              <SettingOutlined className="text-gray-400 w-4 h-4" />
              <p className="text-base text-gray-400">{car.transmission}</p>
            </span>
            <span className="flex gap-1 items-center">
              <TeamOutlined className="text-gray-400 w-4 h-4" />
              <p className="text-base text-gray-400">{car.capacity} Người</p>
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center my-6">
          <div className="flex flex-col">
            <p className="font-bold text-2xl">
              {car.pricePerDay.toLocaleString("vi-VN")} VND
              <span className="font-normal text-sm text-gray-400">/day</span>
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRentNow();
            }}
            className="bg-blue-500 hover:scale-[1.05] text-white font-semibold p-4 px-5 rounded-md text-base"
          >
            Rent now
          </button>
        </div>
      </div>
    </>
  );
};

export default VehicleCard;