import {
  FaCalendarAlt,
  FaCar,
  FaMapMarkerAlt,
  FaUserTie,
  FaArrowRight,
} from "react-icons/fa";

const OrderContent = ({ order }) => {
  return (
    <div className="p-4 flex-grow">
      {/* Vehicle Details */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <FaCar className="text-blue-600" />
          <p className="text-lg font-semibold text-gray-700">Vehicle Details</p>
        </div>
        <div className="pl-6 grid grid-cols-2 gap-2">
          <p className="text-md text-gray-600">
            <span className="font-medium text-gray-700">Type:</span>{" "}
            {order.vehicle.type}
          </p>
          <p className="text-md text-gray-600">
            <span className="font-medium text-gray-700">Fuel:</span>{" "}
            {order.vehicle.fuel}
          </p>
          <p className="text-md text-gray-600">
            <span className="font-medium text-gray-700">Transmission:</span>{" "}
            {order.vehicle.transmission}
          </p>
          <p className="text-md text-gray-600">
            <span className="font-medium text-gray-700">Capacity:</span>{" "}
            {order.vehicle.capacity} seats
          </p>
        </div>
      </div>

      {/* Rental Period */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <FaCalendarAlt className="text-blue-500" />
          <p className="text-lg font-semibold text-gray-700">Rental Period</p>
        </div>
        <div className="px-4 flex items-center justify-center gap-4">
          <div className="bg-blue-50 p-3 rounded-lg w-1/2">
            <p className="text-md font-semibold text-blue-700 mb-1">Pick-up</p>
            <p className="text-md text-gray-700 flex items-center space-x-1 mb-1">
              <FaMapMarkerAlt className="text-blue-600" />
              <span>{order.pickUpLocation}</span>
            </p>
            <p className="text-md text-gray-700">
              {new Date(order.startDate).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-md text-gray-700">{order.pickUpTime}</p>
          </div>

          {/* Icon Arrow */}
          <FaArrowRight className="text-gray-500 text-2xl" />

          <div className="bg-indigo-50 p-3 rounded-lg w-1/2">
            <p className="text-md font-semibold text-blue-700 mb-1">Drop-off</p>
            <p className="text-md text-gray-700 flex items-center space-x-1 mb-1">
              <FaMapMarkerAlt className="text-blue-600" />
              <span>{order.dropOffLocation}</span>
            </p>
            <p className="text-md text-gray-700">
              {new Date(order.endDate).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-md text-gray-700">{order.dropOffTime}</p>
          </div>
        </div>
      </div>

      {/* Provider */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <FaUserTie className="text-green-600" />
          <p className="text-lg font-semibold text-gray-700">Provider</p>
        </div>
        <p className="pl-6 text-md text-gray-700">{order.provider.name}</p>
      </div>
    </div>
  );
};

export default OrderContent;
