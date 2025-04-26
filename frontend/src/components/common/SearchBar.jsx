// import React, { useState } from "react";
// import { Select, DatePicker, Radio } from "antd";

// const { Option } = Select;

// const SearchBar = () => {
//   const [activeTab, setActiveTab] = useState("pick-up");
//   const [pickUpCity, setPickUpCity] = useState(null);
//   const [dropOffCity, setDropOffCity] = useState(null);
//   const [pickUpDate, setPickUpDate] = useState(null);
//   const [dropOffDate, setDropOffDate] = useState(null);
//   const [pickUpTime, setPickUpTime] = useState(null);
//   const [dropOffTime, setDropOffTime] = useState(null);

//   const cities = ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hai Phong"];
//   const times = ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM"];

//   const swapLocations = () => {
//     setPickUpCity(dropOffCity);
//     setDropOffCity(pickUpCity);
//     setPickUpDate(dropOffDate);
//     setDropOffDate(pickUpDate);
//     setPickUpTime(dropOffTime);
//     setDropOffTime(pickUpTime);
//   };

//   return (
//     <div className="w-full ">
//       <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-4">
//         {/* Pick-Up Section */}
//         <div className="flex-1 w-full bg-white rounded-lg shadow-sm p-6">
//           <div className="flex items-center gap-x-3 mb-4">
//             <Radio
//               checked={activeTab === "pick-up"}
//               onChange={() => setActiveTab("pick-up")}
//               className="flex items-center gap-x-2"
//             >
//               <h1 className="text-xl font-semibold">Pick-Up</h1>
//             </Radio>
//           </div>
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1">
//               <p className="text-lg text-gray-600 mb-2">Locations</p>
//               <Select
//                 placeholder="Select your city"
//                 className="w-full text-base"
//                 onChange={(value) => setPickUpCity(value)}
//                 value={pickUpCity}
//                 variant={false}
//                 suffixIcon={
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="size-4 text-gray-400"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="m19.5 8.25-7.5 7.5-7.5-7.5"
//                     />
//                   </svg>
//                 }
//               >
//                 {cities.map((city) => (
//                   <Option key={city} value={city}>
//                     {city}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//             <div className="flex-1">
//               <p className="text-lg text-gray-600 mb-2">Date</p>
//               <DatePicker
//                 className="w-full text-base"
//                 placeholder="Select your date"
//                 onChange={(date) => setPickUpDate(date)}
//                 value={pickUpDate}
//                 variant={false}
//                 suffixIcon={
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="size-4 text-gray-400"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="m19.5 8.25-7.5 7.5-7.5-7.5"
//                     />
//                   </svg>
//                 }
//               />
//             </div>
//             <div className="flex-1">
//               <p className="text-lg text-gray-600 mb-2">Time</p>
//               <Select
//                 placeholder="Select your time"
//                 className="w-full text-base"
//                 onChange={(value) => setPickUpTime(value)}
//                 value={pickUpTime}
//                 variant={false}
//                 suffixIcon={
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="size-4 text-gray-400"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="m19.5 8.25-7.5 7.5-7.5-7.5"
//                     />
//                   </svg>
//                 }
//               >
//                 {times.map((time) => (
//                   <Option key={time} value={time}>
//                     {time}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//           </div>
//         </div>

//         {/* Swap Button */}
//         <div className="flex items-center justify-center">
//           <button
//             className="bg-blue-600 p-3 rounded-md hover:scale-105"
//             onClick={swapLocations}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="size-6 text-white"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Drop-Off Section */}
//         <div className="flex-1 w-full bg-white rounded-lg shadow-sm p-6 ">
//           <div className="flex items-center gap-x-3 mb-4">
//             <Radio
//               checked={activeTab === "drop-off"}
//               onChange={() => setActiveTab("drop-off")}
//               className="flex items-center gap-x-2"
//             >
//               <h1 className="text-xl font-semibold">Drop-Off</h1>
//             </Radio>
//           </div>
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1">
//               <p className="text-lg text-gray-600 mb-2">Locations</p>
//               <Select
//                 placeholder="Select your city"
//                 className="w-full text-base"
//                 onChange={(value) => setDropOffCity(value)}
//                 value={dropOffCity}
//                 variant={false}
//                 suffixIcon={
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="size-4 text-gray-400"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="m19.5 8.25-7.5 7.5-7.5-7.5"
//                     />
//                   </svg>
//                 }
//               >
//                 {cities.map((city) => (
//                   <Option key={city} value={city}>
//                     {city}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//             <div className="flex-1">
//               <p className="text-lg text-gray-600 mb-2">Date</p>
//               <DatePicker
//                 className="w-full text-base"
//                 placeholder="Select your date"
//                 onChange={(date) => setDropOffDate(date)}
//                 value={dropOffDate}
//                 variant={false}
//                 suffixIcon={
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="size-4 text-gray-400"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="m19.5 8.25-7.5 7.5-7.5-7.5"
//                     />
//                   </svg>
//                 }
//               />
//             </div>
//             <div className="flex-1">
//               <p className="text-lg text-gray-600 mb-2">Time</p>
//               <Select
//                 placeholder="Select your time"
//                 className="w-full text-base"
//                 onChange={(value) => setDropOffTime(value)}
//                 value={dropOffTime}
//                 variant={false}
//                 suffixIcon={
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="size-4 text-gray-400"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="m19.5 8.25-7.5 7.5-7.5-7.5"
//                     />
//                   </svg>
//                 }
//               >
//                 {times.map((time) => (
//                   <Option key={time} value={time}>
//                     {time}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState } from "react";
import { Select, DatePicker, Radio, TimePicker } from "antd";
import dayjs from "dayjs";
import { locations } from "../../mock-data/data";

const { Option } = Select;

const SearchBar = ({
  pickUpLocation,
  dropOffLocation,
  pickUpDate,
  dropOffDate,
  pickUpTime,
  dropOffTime,
  onPickUpLocationChange = () => {},
  onDropOffLocationChange = () => {},
  onPickUpDateChange = () => {},
  onDropOffDateChange = () => {},
  onPickUpTimeChange = () => {},
  onDropOffTimeChange = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("pick-up");

  const swapLocations = () => {
    onPickUpLocationChange(dropOffLocation);
    onDropOffLocationChange(pickUpLocation);
    onPickUpDateChange(dropOffDate);
    onDropOffDateChange(pickUpDate);
    onPickUpTimeChange(dropOffTime);
    onDropOffTimeChange(pickUpTime);
  };

  const disabledPickUpDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const disabledDropOffDate = (current) => {
    if (pickUpDate) {
      return (
        current && current < dayjs(pickUpDate, "YYYY-MM-DD").startOf("day")
      );
    }
    return current && current < dayjs().startOf("day");
  };

  return (
    <div className="w-full p-6">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-4">
        {/* Pick-Up Section */}
        <div className="flex-1 w-full bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-x-3 mb-4">
            <Radio
              checked={activeTab === "pick-up"}
              onChange={() => setActiveTab("pick-up")}
              className="flex items-center gap-x-2"
            >
              <h1 className="text-xl font-semibold">Pick-Up</h1>
            </Radio>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <p className="text-lg text-gray-600 mb-2">Locations</p>
              <Select
                placeholder="Select your city"
                className="w-full text-base"
                onChange={onPickUpLocationChange}
                value={pickUpLocation}
                variant={false}
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
                {locations.map((location) => (
                  <Option key={location.id} value={location.name}>
                    {location.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="flex-1">
              <p className="text-lg text-gray-600 mb-2">Date</p>
              <DatePicker
                className="w-full text-base"
                placeholder="Select your date"
                onChange={(date) =>
                  onPickUpDateChange(date ? date.format("YYYY-MM-DD") : null)
                }
                value={pickUpDate ? dayjs(pickUpDate, "YYYY-MM-DD") : null}
                variant={false}
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
            </div>
            <div className="flex-1">
              <p className="text-lg text-gray-600 mb-2">Time</p>
              <TimePicker
                className="w-full text-base"
                placeholder="Select your time"
                onChange={(time) =>
                  onPickUpTimeChange(time ? time.format("HH:mm") : null)
                }
                value={pickUpTime ? dayjs(pickUpTime, "HH:mm") : null}
                format="HH:mm"
                variant={false}
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
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-600 p-3 rounded-md hover:scale-105"
            onClick={swapLocations}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
              />
            </svg>
          </button>
        </div>

        {/* Drop-Off Section */}
        <div className="flex-1 w-full bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-x-3 mb-4">
            <Radio
              checked={activeTab === "drop-off"}
              onChange={() => setActiveTab("drop-off")}
              className="flex items-center gap-x-2"
            >
              <h1 className="text-xl font-semibold">Drop-Off</h1>
            </Radio>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <p className="text-lg text-gray-600 mb-2">Locations</p>
              <Select
                placeholder="Select your city"
                className="w-full text-base"
                onChange={onDropOffLocationChange}
                value={dropOffLocation}
                variant={false}
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
                {locations.map((location) => (
                  <Option key={location.id} value={location.name}>
                    {location.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="flex-1">
              <p className="text-lg text-gray-600 mb-2">Date</p>
              <DatePicker
                className="w-full text-base"
                placeholder="Select your date"
                onChange={(date) =>
                  onDropOffDateChange(date ? date.format("YYYY-MM-DD") : null)
                }
                value={dropOffDate ? dayjs(dropOffDate, "YYYY-MM-DD") : null}
                variant={false}
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
            </div>
            <div className="flex-1">
              <p className="text-lg text-gray-600 mb-2">Time</p>
              <TimePicker
                className="w-full text-base"
                placeholder="Select your time"
                onChange={(time) =>
                  onDropOffTimeChange(time ? time.format("HH:mm") : null)
                }
                value={dropOffTime ? dayjs(dropOffTime, "HH:mm") : null}
                format="HH:mm"
                variant={false}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
