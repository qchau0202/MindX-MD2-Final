import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import VehicleImagesCard from "../../components/vehicle/VehicleImagesCard";
import VehicleInfoCard from "../../components/vehicle/VehicleInfoCard";
import VehicleRecentList from "../../components/vehicle/VehicleRecentList";
import VehicleReviewsList from "../../components/vehicle/VehicleReviewsList";
import { searchVehicles } from "../../services/api";
// import { useAuth } from "../../contexts/AuthContext";
import useRentNow from "../../hooks/useRentNow";

const VehicleDetail = () => {
  const { id } = useParams();
  // const { user } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
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

  const handleRentNow = useRentNow(vehicle, rentalInfo);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        setLoading(true);
        const vehicleResponse = await searchVehicles({ vehicleId: id });
        if (vehicleResponse.data.length === 0) {
          throw new Error("Vehicle not found");
        }
        const selectedVehicle = vehicleResponse.data.find((v) => v._id === id);
        if (!selectedVehicle) {
          throw new Error("Vehicle not found");
        }
        setVehicle(selectedVehicle);

        const recentResponse = await searchVehicles({
          limit: 5,
          sortBy: "createdAt",
          sortOrder: "desc",
        });
        setRecentVehicles(recentResponse.data.filter((v) => v._id !== id));
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
        messageApi.error(error.message);
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

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (!vehicle) {
    return <div className="text-center p-6">Vehicle not found!</div>;
  }

  return (
    <div className="p-4 md:p-6">
      {contextHolder}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="md:w-2/3">
          <VehicleImagesCard images={vehicle.images} />
          <VehicleReviewsList vehicleId={vehicle._id} />
        </div>
        <div className="md:w-1/3">
          <VehicleInfoCard
            vehicle={vehicle}
            rentalInfo={rentalInfo}
            onRentalInfoChange={handleRentalInfoChange}
            onRentNow={handleRentNow}
          />
        </div>
      </div>
      <div className="w-full">
        <VehicleRecentList vehicles={recentVehicles} />
      </div>
    </div>
  );
};

export default VehicleDetail;
