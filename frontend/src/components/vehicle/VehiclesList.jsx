import React from "react";
import VehicleCard from "./VehicleCard";

const VehiclesList = ({ cars, onToggleLike, columns, rentalInfo }) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-4`}
    >
      {cars.map((car, index) => (
        <VehicleCard
          key={index}
          car={car}
          index={index}
          onToggleLike={onToggleLike}
          rentalInfo={rentalInfo}
        />
      ))}
    </div>
  );
};

export default VehiclesList;

// import React from "react";
// import VehicleCard from "../vehicle/VehicleCard";

// const VehiclesList = ({ cars, columns, rentalInfo }) => {
//   console.log(rentalInfo);
//   if (!cars || cars.length === 0) {
//     return <div className="text-center p-6">Không tìm thấy xe!</div>;
//   }

//   return (
//     <div
//       className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-4`}
//     >
//       {cars.map((car) => (
//         <VehicleCard key={car._id} car={car} rentalInfo={rentalInfo} />
//       ))}
//     </div>
//   );
// };

// export default VehiclesList;
