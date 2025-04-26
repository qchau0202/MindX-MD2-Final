import { Radio, Input } from "antd";
import { useState } from "react";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Payment Method</h1>
        <span className="text-gray-500 text-sm">Step 3 of 4</span>
      </div>
      <p className="text-gray-500 mb-6 text-lg">
        Please enter your payment method
      </p>
      <Radio.Group
        className="flex flex-col gap-6"
        onChange={handlePaymentMethodChange}
        value={paymentMethod}
      >
        <div className="mb-6">
          <Radio value="credit" className="text-gray-700">
            Credit Card
            <img
              src="https://placehold.co/60x20"
              alt="Visa/Mastercard"
              className="inline-block ml-2"
            />
          </Radio>
        </div>
        <Radio value="paypal" className="text-gray-700">
          PayPal
          <img
            src="https://placehold.co/60x20"
            alt="PayPal"
            className="inline-block ml-2"
          />
        </Radio>
      </Radio.Group>

      {/* Credit Card Form */}
      {paymentMethod === "credit" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-gray-700 mb-2 text-md">
              Card Number
            </label>
            <Input
              placeholder="Card number"
              className="bg-gray-100 border-none rounded-lg text-gray-500 placeholder-gray-500"
              size="large"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 text-md">
              Expiration Date
            </label>
            <Input
              placeholder="DD/MM/YY"
              className="bg-gray-100 border-none rounded-lg text-gray-500 placeholder-gray-500"
              size="large"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 text-md">
              Card Holder
            </label>
            <Input
              placeholder="Card holder"
              className="bg-gray-100 border-none rounded-lg text-gray-500 placeholder-gray-500"
              size="large"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 text-md">CVC</label>
            <Input
              placeholder="CVC"
              className="bg-gray-100 border-none rounded-lg text-gray-500 placeholder-gray-500"
              size="large"
            />
          </div>
        </div>
      )}

      {/* PayPal Form */}
      {paymentMethod === "paypal" && (
        <div className="grid grid-cols-1 gap-4 mt-6">
          <div>
            <label className="block text-gray-700 mb-2 text-md">
              PayPal Email
            </label>
            <Input
              placeholder="Email address"
              className="bg-gray-100 border-none rounded-lg text-gray-500 placeholder-gray-500"
              size="large"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 text-md">
              PayPal Password
            </label>
            <Input.Password
              placeholder="Password"
              className="bg-gray-100 border-none rounded-lg text-gray-500 placeholder-gray-500"
              size="large"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
