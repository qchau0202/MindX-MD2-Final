// import React, { useState } from "react";
// import { Button, Card, Rate, Space, Avatar } from "antd";
// import {
//   HeartOutlined,
//   HeartFilled,
//   FireOutlined,
//   SettingOutlined,
//   TeamOutlined,
// } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import FilterSidebar from "../../components/common/FilterSidebar";
// import { recentCars, reviews, vehicleDetail } from "../../mock-data/data";

// const VehicleDetail = () => {
//   const [car, setCar] = useState(vehicleDetail);
//   const [filters, setFilters] = useState({
//     types: [],
//     capacities: [],
//     priceRange: [0, 100],
//   });

//   const toggleLike = () => {
//     setCar((prev) => ({ ...prev, liked: !prev.liked }));
//   };

//   const handleFilterChange = (filterType, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [filterType]: value,
//     }));
//   };

//   return (
//     <div className="bg-gray-100">
//       <div className="flex min-h-screen">
//         {/* FilterSidebar only on desktop */}
//         <div className="hidden md:block w-1/6 sticky top-0 h-screen bg-white">
//           <FilterSidebar
//             filters={filters}
//             onFilterChange={handleFilterChange}
//           />
//         </div>

//         <div className="w-full md:w-5/6 p-4 md:p-6">
//           {/* Vehicle detail */}
//           <div className="mb-6 flex flex-col md:flex-row gap-4 md:gap-6">
//             {/* Left Section */}
//             <div className="md:w-1/2">
//               <div className="rounded-lg bg-blue-600 p-4 md:p-6 text-white">
//                 <h1 className="text-xl md:text-3xl font-bold mb-4 leading-tight">
//                   Sports car with the best design and acceleration
//                 </h1>
//                 <p className="text-sm md:text-lg mb-6">
//                   Safety and comfort while driving a futuristic and elegant
//                   sports car
//                 </p>
//                 <img
//                   src={car.bannerImage}
//                   alt={car.name}
//                   className="w-full h-48 md:h-64 object-cover rounded-lg mb-4"
//                 />
//               </div>
//               <div className="grid grid-cols-3 gap-2 mt-4">
//                 {car.subImages.map((img, index) => (
//                   <img
//                     key={index}
//                     src={img}
//                     alt={`Sub ${index}`}
//                     className="w-full h-16 md:h-24 object-cover rounded-lg border-2 border-blue-600"
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Right Section */}
//             <div className="md:w-1/2 shadow-lg rounded-lg p-4 md:p-6 bg-white">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-3xl md:text-5xl font-bold">{car.name}</h2>
//                 {car.liked ? (
//                   <HeartFilled
//                     className="text-red-500 cursor-pointer text-lg md:text-xl"
//                     onClick={toggleLike}
//                   />
//                 ) : (
//                   <HeartOutlined
//                     className="text-gray-400 cursor-pointer text-lg md:text-xl"
//                     onClick={toggleLike}
//                   />
//                 )}
//               </div>
//               <div className="flex items-center mb-4">
//                 <Rate
//                   disabled
//                   value={car.rating}
//                   className="text-yellow-400 text-sm md:text-base"
//                 />
//                 <span className="ml-2 text-gray-500 text-sm md:text-base">
//                   {car.reviews} Reviewer
//                 </span>
//               </div>
//               <p className="text-gray-600 mb-6 text-sm md:text-xl">
//                 {car.description}
//               </p>
//               <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-500 text-sm md:text-lg">
//                     Type Car
//                   </span>
//                   <p className="font-semibold text-sm md:text-base">
//                     {car.type}
//                   </p>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-500 text-sm md:text-lg">
//                     Capacity
//                   </span>
//                   <p className="font-semibold text-sm md:text-base">
//                     {car.capacity} Person
//                   </p>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-500 text-sm md:text-lg">
//                     Steering
//                   </span>
//                   <p className="font-semibold text-sm md:text-base">
//                     {car.steering}
//                   </p>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-500 text-sm md:text-lg">
//                     Gasoline
//                   </span>
//                   <p className="font-semibold text-sm md:text-base">
//                     {car.gasoline}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center mb-4">
//                 <div className="flex flex-col">
//                   <span className="text-xl md:text-3xl font-bold text-gray-800">
//                     ${car.discountPrice || car.price}/days
//                   </span>
//                   {car.discountPrice && (
//                     <span className="text-gray-400 line-through text-sm md:text-md">
//                       ${car.price}
//                     </span>
//                   )}
//                 </div>
//                 <Button
//                   type="primary"
//                   size="large"
//                   className="bg-blue-500 hover:bg-blue-600 border-none rounded-lg px-4 md:px-6 py-1 md:py-2 text-white text-sm md:text-base"
//                 >
//                   Rent Now
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Reviews */}
//           <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
//             <h3 className="text-base md:text-lg font-semibold mb-4">
//               Reviews ({reviews.length})
//             </h3>
//             {reviews.map((review, index) => (
//               <div key={index} className="flex gap-4 mb-4">
//                 <Avatar size={32} className="bg-gray-200 md:size-48" />
//                 <div>
//                   <div className="flex justify-between">
//                     <div>
//                       <p className="font-semibold text-sm md:text-base">
//                         {review.name}
//                       </p>
//                       <p className="text-gray-500 text-xs md:text-sm">
//                         {review.role}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-gray-500 text-xs md:text-sm">
//                         {review.date}
//                       </p>
//                       <Rate
//                         disabled
//                         value={review.rating}
//                         className="text-yellow-400 text-xs md:text-sm"
//                       />
//                     </div>
//                   </div>
//                   <p className="text-gray-600 mt-2 text-sm md:text-base">
//                     {review.content}
//                   </p>
//                 </div>
//               </div>
//             ))}
//             <a
//               href="#"
//               className="text-blue-500 hover:text-blue-600 text-sm md:text-base"
//             >
//               Show All
//             </a>
//           </div>

//           {/* Recent Car */}
//           <div className="mb-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-base md:text-lg font-semibold text-gray-500">
//                 Recent Car
//               </h3>
//               <Link
//                 to="/vehicles"
//                 className="text-blue-500 hover:text-blue-600 text-sm md:text-base"
//               >
//                 View All
//               </Link>
//             </div>
//             <div className="flex md:grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-x-hidden scrollbar-hide">
//               {recentCars.map((car, index) => (
//                 <Card
//                   key={index}
//                   className="shadow-md rounded-lg overflow-hidden w-64 flex-shrink-0 md:w-auto"
//                   cover={
//                     <img
//                       src={car.image}
//                       alt={car.name}
//                       className="w-full h-32 md:h-40 object-cover"
//                     />
//                   }
//                 >
//                   <div className="p-4">
//                     <div className="flex justify-between items-center mb-2">
//                       <div>
//                         <h3 className="text-base md:text-lg font-semibold">
//                           {car.name}
//                         </h3>
//                         <p className="text-gray-500 text-sm md:text-base">
//                           {car.type}
//                         </p>
//                       </div>
//                       {car.liked ? (
//                         <HeartFilled className="text-red-500 cursor-pointer text-lg md:text-xl" />
//                       ) : (
//                         <HeartOutlined className="text-gray-400 cursor-pointer text-lg md:text-xl" />
//                       )}
//                     </div>
//                     <Space className="mb-4 text-gray-500 text-sm md:text-base">
//                       <span>
//                         <FireOutlined className="mr-1" /> {car.fuel}
//                       </span>
//                       <span>
//                         <SettingOutlined className="mr-1" /> {car.transmission}
//                       </span>
//                       <span>
//                         <TeamOutlined className="mr-1" /> {car.people} People
//                       </span>
//                     </Space>
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <span className="text-base md:text-lg font-bold text-gray-800">
//                           ${car.discountPrice || car.price}/day
//                         </span>
//                         {car.discountPrice && (
//                           <span className="ml-2 text-gray-400 line-through text-sm md:text-base">
//                             ${car.price}
//                           </span>
//                         )}
//                       </div>
//                       <Button
//                         type="primary"
//                         className="bg-blue-500 hover:bg-blue-600 border-none rounded-lg px-3 py-1 text-white text-sm md:text-base"
//                       >
//                         Rent Now
//                       </Button>
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleDetail;


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import VehicleImagesCard from "../../components/vehicle/VehicleImagesCard"
import VehicleInfoCard from "../../components/vehicle/VehicleInfoCard"
import VehicleRecentList from "../../components/vehicle/VehicleRecentList"
import VehicleReviewsList from "../../components/vehicle/VehicleReviewsList"
import { searchVehicles } from "../../services/api";

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [recentVehicles, setRecentVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rentalInfo, setRentalInfo] = useState({
    pickUpLocation: null,
    dropOffLocation: null,
    pickUpDate: null,
    dropOffDate: null,
    pickUpTime: null,
    dropOffTime: null,
  });

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        setLoading(true);
        const vehicleResponse = await searchVehicles({ vehicleId: id });
        if (vehicleResponse.data.length === 0) {
          throw new Error("Vehicle not found");
        }
        setVehicle(vehicleResponse.data[0]);

        const recentResponse = await searchVehicles({ limit: 3 });
        setRecentVehicles(recentResponse.data.filter((v) => v._id !== id));
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicleDetails();
  }, [id]);

  const handleRentalInfoChange = (field, value) => {
    setRentalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRentNow = () => {
    if (
      !rentalInfo.pickUpLocation ||
      !rentalInfo.dropOffLocation ||
      !rentalInfo.pickUpDate ||
      !rentalInfo.dropOffDate ||
      !rentalInfo.pickUpTime ||
      !rentalInfo.dropOffTime
    ) {
      message.error("Please fill in all rental information fields.");
      return;
    }
    navigate("/vehicles/vehiclePayment", {
      state: { car: vehicle, rentalInfo },
    });
  };

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (!vehicle) {
    return <div className="text-center p-6">Vehicle not found!</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <VehicleImagesCard images={vehicle.images} />
          <VehicleInfoCard
            vehicle={vehicle}
            rentalInfo={rentalInfo}
            onRentalInfoChange={handleRentalInfoChange}
            onRentNow={handleRentNow}
          />
          <VehicleReviewsList vehicleId={vehicle._id} />
        </div>
        <div className="md:w-1/3">
          <VehicleRecentList vehicles={recentVehicles} />
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;