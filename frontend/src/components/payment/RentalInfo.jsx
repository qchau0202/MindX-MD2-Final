import React from "react";
import { Select, DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import { locations } from "../../mock-data/data"; // Import locations

const { Option } = Select;

const RentalInfo = ({ rentalInfo, onRentalInfoChange }) => {
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Rental information
        </h1>
        <span className="text-gray-500 text-sm">Step 2 of 4</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Pick-Up Section */}
        <div className="flex-1 ">
          <h1 className="text-lg font-semibold mb-2">Pick-Up</h1>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-gray-600 mb-2">Location</p>
              <Select
                placeholder="Select your city"
                className="w-full"
                size="large"
                onChange={(value) => onRentalInfoChange("pickUpCity", value)}
                value={rentalInfo.pickUpLocation || undefined}
              >
                {locations.map((location) => (
                  <Option key={location.id} value={location.name}>
                    {location.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Date</p>
              <DatePicker
                className="w-full"
                size="large"
                placeholder="Select your date"
                onChange={(date) =>
                  onRentalInfoChange(
                    "pickUpDate",
                    date ? date.format("YYYY-MM-DD") : null
                  )
                }
                value={
                  rentalInfo.pickUpDate
                    ? dayjs(rentalInfo.pickUpDate, "YYYY-MM-DD")
                    : null
                }
                disabledDate={disabledPickUpDate}
              />
            </div>
            <div>
              <p className="text-gray-600 mb-2">Time</p>
              <TimePicker
                className="w-full"
                size="large"
                placeholder="Select your time"
                onChange={(time) =>
                  onRentalInfoChange(
                    "pickUpTime",
                    time ? time.format("HH:mm") : null
                  )
                }
                value={
                  rentalInfo.pickUpTime
                    ? dayjs(rentalInfo.pickUpTime, "HH:mm")
                    : null
                }
                format="HH:mm"
              />
            </div>
          </div>
        </div>

        {/* Drop-Off Section */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Drop-Off</h3>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-gray-600 mb-2">Location</p>
              <Select
                placeholder="Select your city"
                className="w-full"
                size="large"
                onChange={(value) => onRentalInfoChange("dropOffCity", value)}
                value={rentalInfo.dropOffLocation || undefined}
              >
                {locations.map((location) => (
                  <Option key={location.id} value={location.name}>
                    {location.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Date</p>
              <DatePicker
                className="w-full"
                size="large"
                placeholder="Select your date"
                onChange={(date) =>
                  onRentalInfoChange(
                    "dropOffDate",
                    date ? date.format("YYYY-MM-DD") : null
                  )
                }
                value={
                  rentalInfo.dropOffDate
                    ? dayjs(rentalInfo.dropOffDate, "YYYY-MM-DD")
                    : null
                }
                disabledDate={disabledDropOffDate}
              />
            </div>
            <div>
              <p className="text-gray-600 mb-2">Time</p>
              <TimePicker
                className="w-full"
                size="large"
                placeholder="Select your time"
                onChange={(time) =>
                  onRentalInfoChange(
                    "dropOffTime",
                    time ? time.format("HH:mm") : null
                  )
                }
                value={
                  rentalInfo.dropOffTime
                    ? dayjs(rentalInfo.dropOffTime, "HH:mm")
                    : null
                }
                format="HH:mm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalInfo;
