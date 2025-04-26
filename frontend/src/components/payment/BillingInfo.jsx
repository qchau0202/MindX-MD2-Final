import React from "react";
import { Input } from "antd";

const BillingInfo = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Billing Info</h1>
        <span className="text-gray-500 text-sm">Step 1 of 4</span>
      </div>
      <p className="text-gray-500 mb-6 text-lg">
        Please enter your billing info
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2 text-md">Name</label>
          <Input
            placeholder="Your name"
            className="bg-gray-100 border-none rounded-lg text-gray-500 placeholder-gray-500"
            size="large"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 text-md">
            Phone Number
          </label>
          <Input
            placeholder="Phone number"
            className="bg-gray-100 border-none rounded-lg text-gray-500 placeholder-gray-500"
            size="large"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 text-md">Address</label>
          <Input
            placeholder="Address"
            className="bg-gray-100 border-none rounded-lg text-gray-500 placeholder-gray-500"
            size="large"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 text-md">
            Town / City
          </label>
          <Input
            placeholder="Town or city"
            className="bg-gray-100 border-none rounded-lg text-gray-500 placeholder-gray-500"
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default BillingInfo;
