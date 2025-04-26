import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const VehicleRecentList = ({ vehicles }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Recently Viewed</h2>
      {vehicles.length === 0 ? (
        <p>No recent vehicles.</p>
      ) : (
        vehicles.map((vehicle) => (
          <Card
            key={vehicle._id}
            className="mb-4 cursor-pointer"
            onClick={() => navigate(`/vehicles/${vehicle._id}`)}
          >
            <div className="flex gap-4">
              <img
                src={vehicle.images[0] || "https://via.placeholder.com/150"}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h3 className="text-base font-semibold">
                  {vehicle.make} {vehicle.model}
                </h3>
                <p className="text-sm text-gray-500">{vehicle.type}</p>
                <p className="text-sm font-bold">
                  {vehicle.pricePerDay.toLocaleString("en-US")} Vand/day
                </p>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default VehicleRecentList;
