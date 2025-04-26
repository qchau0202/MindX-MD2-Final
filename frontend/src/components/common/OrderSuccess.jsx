import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Order Placed Successfully!
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Thank you for your rental. You can view your order details in the orders
        section or go back to the home page.
      </p>
      <div className="flex space-x-4">
        <Button
          type="default"
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Home
        </Button>
        <Button
          type="primary"
          onClick={() => navigate("/orders")}
          className="bg-blue-500 hover:bg-blue-600"
        >
          View Orders
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccess;
