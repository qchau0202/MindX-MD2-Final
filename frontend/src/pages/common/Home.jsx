import React, { useState, useEffect } from "react";
import VehiclesList from "../../components/vehicle/VehiclesList";
import HeroSection from "../../components/common/HeroSection";
import SearchBar from "../../components/common/SearchBar";
import { searchVehicles } from "../../services/api";
import { message } from "antd";

const Home = () => {
  const [carList, setCarList] = useState([]);
  const [rentalInfo, setRentalInfo] = useState({
    pickUpLocation: null,
    dropOffLocation: null,
    pickUpDate: null,
    dropOffDate: null,
    pickUpTime: null,
    dropOffTime: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await searchVehicles({ limit: 8 });
        setCarList(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const handleRentalInfoChange = (field, value) => {
    setRentalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div>
      <HeroSection />
      <SearchBar
        pickUpLocation={rentalInfo.pickUpLocation}
        dropOffLocation={rentalInfo.dropOffLocation}
        pickUpDate={rentalInfo.pickUpDate}
        dropOffDate={rentalInfo.dropOffDate}
        pickUpTime={rentalInfo.pickUpTime}
        dropOffTime={rentalInfo.dropOffTime}
        onPickUpLocationChange={(value) =>
          handleRentalInfoChange("pickUpLocation", value)
        }
        onDropOffLocationChange={(value) =>
          handleRentalInfoChange("dropOffLocation", value)
        }
        onPickUpDateChange={(value) =>
          handleRentalInfoChange("pickUpDate", value)
        }
        onDropOffDateChange={(value) =>
          handleRentalInfoChange("dropOffDate", value)
        }
        onPickUpTimeChange={(value) =>
          handleRentalInfoChange("pickUpTime", value)
        }
        onDropOffTimeChange={(value) =>
          handleRentalInfoChange("dropOffTime", value)
        }
      />
      <VehiclesList cars={carList} columns={4} rentalInfo={rentalInfo} />
    </div>
  );
};

export default Home;
