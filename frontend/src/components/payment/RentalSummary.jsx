import React from "react";
import { Input, Button, Rate } from "antd";
import useRentalCalculations from "../../hooks/useRentalCalculations";

const RentalSummary = ({ car, rentalInfo }) => {
  const { error, subTotal, tax, totalPrice } = useRentalCalculations(
    car,
    rentalInfo
  );

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold mb-4">Rental Summary</h1>
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  console.log(subTotal, tax, totalPrice);
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-semibold mb-4">Rental Summary</h1>
      <p className="text-lg text-gray-500 mb-4">
        Prices may change depending on the length of the rental and the price of
        your rental car.
      </p>
      {car ? (
        <div className="flex flex-col gap-5 mb-4">
          <img
            src={car.images?.[0] || "https://via.placeholder.com/400x200"}
            alt={`${car.make} ${car.model}`}
            className="w-full rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="text-2xl font-semibold">{car.make}</span>
              <span className="text-2xl font-semibold">{car.model}</span>
            </div>
            <div className="flex flex-col">
              <Rate disabled value={4} className="text-base sm:text-lg" />
              <span className="text-gray-500 text-sm mt-1">440+ Reviewer</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mb-4">No vehicle selected.</p>
      )}
      <div className="border-t pt-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-semibold">
            {subTotal.toLocaleString("vi-VN")} VND
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Tax</span>
          <span className="font-semibold">
            {tax.toLocaleString("vi-VN")} VND
          </span>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <Input placeholder="Apply promo code" className="mr-2" size="large" />
        <Button
          type="primary"
          className="bg-blue-500 hover:bg-blue-600"
          size="large"
        >
          Apply now
        </Button>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Total Rental Price</span>
        <span className="text-xl font-bold">
          {totalPrice.toLocaleString("vi-VN")} VND
        </span>
      </div>
      <p className="text-gray-500 text-sm">
        Overall price and includes rental discount
      </p>
    </div>
  );
};

export default RentalSummary;
