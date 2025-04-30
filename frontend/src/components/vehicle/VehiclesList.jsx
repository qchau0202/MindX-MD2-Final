import React from "react";
import VehicleCard from "./VehicleCard";

const VehiclesList = ({ cars, onToggleLike, columns, rentalInfo }) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} p-6 gap-12`}
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