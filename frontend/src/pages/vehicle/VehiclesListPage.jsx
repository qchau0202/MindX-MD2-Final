import React, { useState, useEffect } from "react";
import FilterSidebar from "../../components/common/FilterSidebar";
import VehiclesList from "../../components/vehicle/VehiclesList";
import SearchBar from "../../components/common/SearchBar";
import { searchVehicles } from "../../services/api";
import { message } from "antd";

const VehiclesListPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    type: [],
    capacity: [],
    priceRange: [0, 3000000],
  });
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
        const response = await searchVehicles();
        setVehicles(response.data);
        setFilteredCars(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    let filtered = [...vehicles];

    if (filters.type.length > 0) {
      filtered = filtered.filter((car) => filters.type.includes(car.type));
    }

    if (filters.capacity.length > 0) {
      filtered = filtered.filter((car) =>
        filters.capacity.includes(car.capacity.toString())
      );
    }

    filtered = filtered.filter(
      (car) =>
        car.pricePerDay >= filters.priceRange[0] &&
        car.pricePerDay <= filters.priceRange[1]
    );

    setFilteredCars(filtered);
  }, [filters, vehicles]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRentalInfoChange = (field, value) => {
    setRentalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }
 console.log(rentalInfo);
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="md:w-1/4">
        <FilterSidebar
          vehicles={vehicles}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className="md:w-3/4">
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
        <VehiclesList cars={filteredCars} columns={3} rentalInfo={rentalInfo} />
      </div>
    </div>
  );
};

export default VehiclesListPage;


// import React, { useState, useEffect } from "react";
// import FilterSidebar from "../../components/common/FilterSidebar";
// import VehiclesList from "../../components/vehicle/VehiclesList";
// import SearchBar from "../../components/common/SearchBar";
// import { searchVehicles } from "../../services/api";
// import { message } from "antd";

// const VehiclesListPage = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [filteredCars, setFilteredCars] = useState([]);
//   const [filters, setFilters] = useState({
//     type: [],
//     capacity: [],
//     priceRange: [0, 3000000],
//   });
//   const [rentalInfo, setRentalInfo] = useState({
//     pickUpLocation: null,
//     dropOffLocation: null,
//     pickUpDate: null,
//     dropOffDate: null,
//     pickUpTime: null,
//     dropOffTime: null,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVehicles = async () => {
//       try {
//         setLoading(true);
//         const params = {
//           location: rentalInfo.pickUpLocation,
//           startDate: rentalInfo.pickUpDate,
//           endDate: rentalInfo.dropOffDate,
//           type: filters.type.length > 0 ? filters.type.join(",") : null,
//         };
//         const response = await searchVehicles(params);
//         setVehicles(response.data);
//         setFilteredCars(response.data);
//       } catch (error) {
//         console.error("Error fetching vehicles:", error);
//         message.error(error.message || "Không thể tải danh sách xe.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVehicles();
//   }, [
//     rentalInfo.pickUpLocation,
//     rentalInfo.pickUpDate,
//     rentalInfo.dropOffDate,
//     filters.type,
//   ]);

//   useEffect(() => {
//     let filtered = [...vehicles];

//     if (filters.capacity.length > 0) {
//       filtered = filtered.filter((car) =>
//         filters.capacity.includes(car.capacity.toString())
//       );
//     }

//     filtered = filtered.filter(
//       (car) =>
//         car.pricePerDay >= filters.priceRange[0] &&
//         car.pricePerDay <= filters.priceRange[1]
//     );

//     setFilteredCars(filtered);
//   }, [filters.capacity, filters.priceRange, vehicles]);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const handleRentalInfoChange = (field, value) => {
//     setRentalInfo((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   if (loading) {
//     return <div className="text-center p-6">Đang tải...</div>;
//   }

//   console.log(rentalInfo);

//   return (
//     <div className="flex flex-col md:flex-row gap-4 p-4">
//       <div className="md:w-1/4">
//         <FilterSidebar
//           vehicles={vehicles}
//           filters={filters}
//           onFilterChange={handleFilterChange}
//         />
//       </div>
//       <div className="md:w-3/4">
//         <SearchBar
//           pickUpLocation={rentalInfo.pickUpLocation}
//           dropOffLocation={rentalInfo.dropOffLocation}
//           pickUpDate={rentalInfo.pickUpDate}
//           dropOffDate={rentalInfo.dropOffDate}
//           pickUpTime={rentalInfo.pickUpTime}
//           dropOffTime={rentalInfo.dropOffTime}
//           onPickUpLocationChange={(value) =>
//             handleRentalInfoChange("pickUpLocation", value)
//           }
//           onDropOffLocationChange={(value) =>
//             handleRentalInfoChange("dropOffLocation", value)
//           }
//           onPickUpDateChange={(value) =>
//             handleRentalInfoChange("pickUpDate", value)
//           }
//           onDropOffDateChange={(value) =>
//             handleRentalInfoChange("dropOffDate", value)
//           }
//           onPickUpTimeChange={(value) =>
//             handleRentalInfoChange("pickUpTime", value)
//           }
//           onDropOffTimeChange={(value) =>
//             handleRentalInfoChange("dropOffTime", value)
//           }
//         />
//         <VehiclesList cars={filteredCars} columns={3} rentalInfo={rentalInfo} />
//       </div>
//     </div>
//   );
// };

// export default VehiclesListPage;
