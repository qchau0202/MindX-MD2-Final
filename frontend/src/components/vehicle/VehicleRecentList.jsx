import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const VehicleRecentList = ({ vehicles }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recently Viewed</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {vehicles.length === 0 ? (
          <p>No recent vehicles.</p>
        ) : (
          vehicles.map((vehicle) => (
            <Card
              key={vehicle._id}
              className="cursor-pointer hover:shadow-lg transition-shadow h-full"
              onClick={() => navigate(`/vehicles/${vehicle._id}`)}
            >
              <div className="flex flex-col justify-between">
                <img
                  src={vehicle.images[0] || "https://via.placeholder.com/150"}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="object-cover rounded mb-2"
                />
                <div className="flex flex-col">
                  <h1 className="text-xl font-semibold">
                    {vehicle.make} {vehicle.model}
                  </h1>
                  <p className="text-lg text-gray-500 py-2">{vehicle.type}</p>
                  <p className="text-lg font-bold">
                    {vehicle.pricePerDay.toLocaleString("en-US")} VND/day
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default VehicleRecentList;