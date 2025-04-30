import React, { useState } from "react";
import BillingInfo from "../../components/payment/BillingInfo";
import RentalInfo from "../../components/payment/RentalInfo";
import PaymentMethod from "../../components/payment/PaymentMethod";
import Confirmation from "../../components/payment/Confirmation";
import RentalSummary from "../../components/payment/RentalSummary";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

const VehiclePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { car, rentalInfo } = location.state || {};

  const [updatedRentalInfo, setUpdatedRentalInfo] = useState({
    pickUpLocation: rentalInfo?.pickUpLocation ?? null,
    pickUpDate: rentalInfo?.pickUpDate ?? null,
    pickUpTime: rentalInfo?.pickUpTime ?? null,
    dropOffLocation: rentalInfo?.dropOffLocation ?? null,
    dropOffDate: rentalInfo?.dropOffDate ?? null,
    dropOffTime: rentalInfo?.dropOffTime ?? null,
  });

  // Kiểm tra nếu thiếu car hoặc rentalInfo
  if (!car || !rentalInfo) {
    message.error("Thiếu thông tin xe hoặc thông tin thuê xe.");
    navigate("/vehicles");
    return null;
  }

  const handleRentalInfoChange = (field, value) => {
    setUpdatedRentalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  console.log(rentalInfo);
  console.log("Updated Rental Info:", updatedRentalInfo);
  return (
    <div className="bg-gray-100 min-h-screen px-4 md:px-6 py-10">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="order-first md:order-last md:w-1/3">
          <RentalSummary car={car} rentalInfo={updatedRentalInfo} />
        </div>
        <div className="order-last md:order-first md:w-2/3">
          <BillingInfo />
          <RentalInfo
            rentalInfo={updatedRentalInfo}
            onRentalInfoChange={handleRentalInfoChange}
          />
          <PaymentMethod />
          <Confirmation car={car} rentalInfo={updatedRentalInfo} />
        </div>
      </div>
    </div>
  );
};

export default VehiclePayment;