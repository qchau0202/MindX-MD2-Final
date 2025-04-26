import {rentalData} from "../../mock-data/data.js"
const TopCarsRental = () => {
  // const rentalData = [
  //   { type: "Sport Car", count: "17,439", color: "bg-gray-800" },
  //   { type: "SUV", count: "9,478", color: "bg-blue-700" },
  //   { type: "Coupe", count: "18,197", color: "bg-blue-500" },
  //   { type: "Hatchback", count: "12,510", color: "bg-blue-300" },
  //   { type: "MPV", count: "14,406", color: "bg-blue-100" },
  // ];


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
              <p className="text-lg font-semibold">72,030</p>
              <p className="text-xs text-gray-500">Rental Car</p>
            </div>
          </div>
        </div>

        {/* Rental List */}
        <ul className="flex-1 space-y-2">
          {rentalData.map((item, index) => (
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
