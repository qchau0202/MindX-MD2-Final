import React, { useState } from "react";
import { Button, Checkbox, message } from "antd";
import { createOrder } from "../../services/api";
import { useNavigate } from "react-router-dom";
import useRentalCalculations from "../../hooks/useRentalCalculations";

const Confirmation = ({ car, rentalInfo }) => {
  const [agreements, setAgreements] = useState({
    terms: false,
    marketing: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { error, totalPrice } = useRentalCalculations(car, rentalInfo);
  const [messageApi, contextHolder] = message.useMessage();

  const handleAgreementChange = (field) => (e) => {
    setAgreements({ ...agreements, [field]: e.target.checked });
  };

  const handleRentNow = async () => {
    if (!agreements.terms) {
      messageApi.open({
        type: "error",
        content: "You have to agree to the terms and conditions.",
        duration: 5,
      });
      return;
    }

    if (error) {
      messageApi.open({
        type: "error",
        content: error,
        duration: 5,
      });
      return;
    }

    if (totalPrice <= 0) {
      messageApi.open({
        type: "error",
        content: "Total price must be greater than 0.",
        duration: 5,
      });
    }

    setLoading(true);
    try {
      const startDate = new Date(
        `${rentalInfo.pickUpDate}T${rentalInfo.pickUpTime}`
      );
      const endDate = new Date(
        `${rentalInfo.dropOffDate}T${rentalInfo.dropOffTime}`
      );

      const orderData = {
        vehicleId: car._id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        totalPrice,
        pickUpLocation: rentalInfo.pickUpLocation,
        dropOffLocation: rentalInfo.dropOffLocation,
        pickUpTime: rentalInfo.pickUpTime,
        dropOffTime: rentalInfo.dropOffTime,
      };
      const response = await createOrder(orderData);

      if (response.data.success) {
        messageApi.open({
          type: "success",
          content: "Order created successfully!",
          duration: 5,
        });
        navigate("/orderSuccess");
      } else {
        messageApi.open({
          type: "error",
          content: response.data.message || "Cannot create order.",
          duration: 5,
        });
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Error creating order. Please try again.";
      messageApi.open({
        type: "error",
        content: errorMsg,
        duration: 5,
      });

      if (errorMsg.includes("Invalid token")) {
        messageApi.open({
          type: "error",
          content: "Session expired. Please log in again.",
          duration: 3,
        });
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {contextHolder}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Confirm</h1>
        <span className="text-gray-500 text-sm">Step 4/4</span>
      </div>
      <p className="text-gray-500 mb-6 text-lg">
        Please agree to the terms and conditions before proceeding with the rental.
      </p>

      <div className="flex flex-col gap-4 mb-6">
        <div className="bg-gray-100 rounded-lg p-3">
          <Checkbox
            checked={agreements.marketing}
            onChange={handleAgreementChange("marketing")}
            className="text-gray-700"
            style={{ fontSize: "16px" }}
          >
            I agree to receive marketing communications from MORENT.
          </Checkbox>
        </div>
        <div className="bg-gray-100 rounded-lg p-3">
          <Checkbox
            checked={agreements.terms}
            onChange={handleAgreementChange("terms")}
            className="text-gray-700"
            style={{ fontSize: "16px" }}
          >
            I agree to the terms and conditions and privacy policy.
          </Checkbox>
        </div>
      </div>

      <Button
        type="primary"
        onClick={handleRentNow}
        className="bg-blue-500 hover:bg-blue-600 border-none rounded-lg w-full py-2 text-white"
        size="large"
        loading={loading}
        disabled={loading}
      >
        Rent now
      </Button>

      <div className="mt-6">
        <p className="text-gray-700 font-semibold text-sm">
          Your data is secure with us.
        </p>
        <p className="text-gray-500 text-sm">
          We use advanced security technology to provide the best experience.
        </p>
      </div>
    </div>
  );
};

export default Confirmation;