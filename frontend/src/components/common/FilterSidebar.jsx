import React, { useState, useEffect } from "react";
import { Button, Checkbox, Slider } from "antd";
import { searchVehicles } from "../../services/api";
import { message } from "antd";

const FilterSidebar = ({ vehicles, filters, onFilterChange }) => {
  const [types, setTypes] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        const response = await searchVehicles();
        const allVehicles = response.data;

        const uniqueTypes = [
          ...new Set(allVehicles.map((car) => car.type)),
        ].map((type) => ({
          value: type,
          count: allVehicles.filter((car) => car.type === type).length,
        }));

        const uniqueCapacities = [
          ...new Set(allVehicles.map((car) => car.capacity.toString())),
        ].map((capacity) => ({
          value: capacity,
          count: allVehicles.filter(
            (car) => car.capacity.toString() === capacity
          ).length,
        }));

        setTypes(uniqueTypes);
        setCapacities(uniqueCapacities);
      } catch (error) {
        console.error("Error fetching filter options:", error);
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFilterOptions();
  }, []);

  const handleTypeChange = (checkedValues) => {
    onFilterChange("type", checkedValues);
  };

  const handleCapacityChange = (checkedValues) => {
    onFilterChange("capacity", checkedValues);
  };

  const handlePriceChange = (value) => {
    onFilterChange("priceRange", value);
  };

  const resetFilters = () => {
    onFilterChange("type", []);
    onFilterChange("capacity", []);
    onFilterChange("priceRange", [0, 3000000]);
  };

  if (loading) {
    return <div className="p-4">Loading filters...</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filter Vehicles</h2>

      <div className="mb-6">
        <h3 className="text-base font-medium mb-2">Vehicle Type</h3>
        <Checkbox.Group
          value={filters.type}
          onChange={handleTypeChange}
          className="flex flex-col gap-2"
        >
          {types.map((type) => (
            <Checkbox key={type.value} value={type.value}>
              {type.value} ({type.count})
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-medium mb-2">Capacity</h3>
        <Checkbox.Group
          value={filters.capacity}
          onChange={handleCapacityChange}
          className="flex flex-col gap-2"
        >
          {capacities.map((capacity) => (
            <Checkbox key={capacity.value} value={capacity.value}>
              {capacity.value} People ({capacity.count})
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-medium mb-2">Price Range (VND)</h3>
        <Slider
          range
          min={0}
          max={3000000}
          step={100000}
          value={filters.priceRange}
          onChange={handlePriceChange}
          tipFormatter={(value) => `${value.toLocaleString("en-US")} VND`}
        />
      </div>

      <Button type="default" onClick={resetFilters} className="w-full">
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;