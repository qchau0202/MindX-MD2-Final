import { useState, useEffect } from "react";
import { getOrders } from "../../services/api";

const TopCarsRental = () => {
  const [topCars, setTopCars] = useState([]);
  const [totalRentals, setTotalRentals] = useState(0);

  useEffect(() => {
    const fetchTopCars = async () => {
      try {
        const response = await getOrders();
        const orders = response.data.data;

        // Count vehicle types
        const typeCounts = orders.reduce((acc, order) => {
          const type = order.vehicle.type;
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {});

        // Convert to array and sort
        const sortedTypes = Object.entries(typeCounts)
          .map(([type, count]) => ({
            type,
            count,
            color: getColorForType(type),
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setTopCars(sortedTypes);
        setTotalRentals(orders.length);
      } catch (error) {
        console.error("Error fetching top cars:", error);
      }
    };

    fetchTopCars();
  }, []);

  const getColorForType = (type) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-purple-500",
    ];
    return colors[type.charCodeAt(0) % colors.length] || "bg-gray-500";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Top 5 Car Rental</h2>
      </div>
      <div className="flex items-center space-x-4">
        {/* Chart Placeholder */}
        <div className="relative w-32 h-32">
          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-semibold">{totalRentals}</p>
              <p className="text-xs text-gray-500">Rental Car</p>
            </div>
          </div>
        </div>

        {/* Rental List */}
        <ul className="flex-1 space-y-2">
          {topCars.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                <span>{item.type}</span>
              </div>
              <span className="font-semibold">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopCarsRental;