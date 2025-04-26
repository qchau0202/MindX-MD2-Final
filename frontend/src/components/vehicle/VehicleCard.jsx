// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
// import { message } from "antd";

// const VehicleCard = ({ car, index, onToggleLike, rentalInfo }) => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [messageApi, contextHolder] = message.useMessage();
//   const handleRentNow = () => {
//     // Kiểm tra thông tin còn thiếu
//     if (
//       !rentalInfo.pickUpCity ||
//       !rentalInfo.dropOffCity ||
//       !rentalInfo.pickUpDate ||
//       !rentalInfo.dropOffDate ||
//       !rentalInfo.pickUpTime ||
//       !rentalInfo.dropOffTime
//     ) {
//       // Hiển thị thông báo ở cấp độ màn hình
//       messageApi.open({
//         type: "info",
//         content: "Please fill in all rental information fields.",
//         duration: 5,
//       });
//       return;
//     }

//     if (!user) {
//       navigate("/login", {
//         state: { from: "/vehicles/vehiclePayment", car, rentalInfo },
//       });
//     } else {
//       navigate("/vehicles/vehiclePayment", {
//         state: { car, rentalInfo },
//       });
//     }
//   };

//   return (
//     <div className="p-4 hover:scale-[1.02] transition duration-300">
//       {contextHolder}
//       <div className="bg-white p-4 h-[420px] w-[328px] md:w-[380px] rounded-xl flex flex-col justify-between shadow-md">
//         <div className="flex justify-between mb-4">
//           <div>
//             <p className="font-bold text-2xl truncate">{car.name}</p>
//             <p className="text-base font-bold text-gray-400">{car.type}</p>
//           </div>
//           <span className="cursor-pointer" onClick={() => onToggleLike(index)}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill={car.liked ? "red" : "none"}
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke={car.liked ? "red" : "currentColor"}
//               className={car.liked ? "fill-red-500 size-6" : "size-6"}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
//               />
//             </svg>
//           </span>
//         </div>
//         <div className="flex flex-col flex-grow">
//           <div className="w-full h-40 mb-4">
//             <img
//               src={car.image}
//               alt={car.name}
//               className="w-full h-full object-contain"
//             />
//           </div>
//           <div className="flex flex-wrap gap-3 text-sm">
//             <span className="flex gap-1 items-center">
//               <img
//                 src="https://morent.ir/assets/benzin.svg"
//                 alt="fuel"
//                 className="w-4 h-4"
//               />
//               <p className="text-base text-gray-400">{car.fuel}</p>
//             </span>
//             <span className="flex gap-1 items-center">
//               <img
//                 src="https://morent.ir/assets/dande.svg"
//                 alt="transmission"
//                 className="w-4 h-4"
//               />
//               <p className="text-base text-gray-400">{car.transmission}</p>
//             </span>
//             <span className="flex gap-1 items-center">
//               <img
//                 src="https://morent.ir/assets/people.svg"
//                 alt="people"
//                 className="w-4 h-4"
//               />
//               <p className="text-base text-gray-400">{car.people} People</p>
//             </span>
//           </div>
//         </div>
//         <div className="flex justify-between items-center">
//           <div className="flex flex-col">
//             <p className="font-bold text-2xl">
//               ${car.discountPrice || car.price}
//               <span className="font-normal text-sm text-gray-400">/day</span>
//             </p>
//             {car.discountPrice && (
//               <span className="text-sm text-gray-400 line-through">
//                 ${car.price}
//               </span>
//             )}
//           </div>
//           <button
//             onClick={handleRentNow}
//             className="bg-blue-500 hover:scale-[1.05] text-white font-semibold p-4 px-5 rounded-md text-base"
//           >
//             Rent Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { message } from "antd";
import { FireOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons";

const VehicleCard = ({ car, rentalInfo }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const handleRentNow = () => {
    const missingFields = [];
    if (!rentalInfo.pickUpLocation) missingFields.push("địa điểm nhận xe");
    if (!rentalInfo.dropOffLocation) missingFields.push("địa điểm trả xe");
    if (!rentalInfo.pickUpDate) missingFields.push("ngày nhận xe");
    if (!rentalInfo.dropOffDate) missingFields.push("ngày trả xe");
    if (!rentalInfo.pickUpTime) missingFields.push("thời gian nhận xe");
    if (!rentalInfo.dropOffTime) missingFields.push("thời gian trả xe");

    if (missingFields.length > 0) {
      messageApi.open({
        type: "info",
        content: `Vui lòng điền: ${missingFields.join(", ")}.`,
        duration: 5,
      });
      return;
    }

    if (!user) {
      navigate("/login", {
        state: { from: "/vehicles/vehiclePayment", car, rentalInfo },
      });
    } else {
      navigate("/vehicles/vehiclePayment", {
        state: { car, rentalInfo },
      });
    }
  };

  const handleCardClick = () => {
    navigate(`/vehicles/${car._id}`);
  };

  return (
    <div className="p-4 hover:scale-[1.02] transition duration-300">
      {contextHolder}
      <div
        className="bg-white p-4 h-[420px] w-[328px] md:w-[380px] rounded-xl flex flex-col justify-between shadow-md cursor-pointer"
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
          <div className="w-full h-40 mb-4">
            <img
              src={car.images[0] || "https://via.placeholder.com/400x200"}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
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
        <div className="flex justify-between items-center">
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
    </div>
  );
};

export default VehicleCard;