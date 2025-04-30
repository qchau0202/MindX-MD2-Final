import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { message } from "antd";

const useRentNow = (car, rentalInfo) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const handleRentNow = () => {
    if (!user) {
      navigate("/login", {
        state: { from: "/vehicles/vehiclePayment", car, rentalInfo },
      });
      return;
    }

    // Validate rentalInfo fields
    const missingFields = [];
    if (
      !rentalInfo?.pickUpLocation ||
      typeof rentalInfo.pickUpLocation !== "string"
    ) {
      missingFields.push("Pick up location");
    }
    if (
      !rentalInfo?.dropOffLocation ||
      typeof rentalInfo.dropOffLocation !== "string"
    ) {
      missingFields.push("Drop off location");
    }
    if (
      !rentalInfo?.pickUpDate ||
      !(
        rentalInfo.pickUpDate instanceof Date ||
        typeof rentalInfo.pickUpDate === "string"
      )
    ) {
      missingFields.push("Pick up date");
    }
    if (
      !rentalInfo?.dropOffDate ||
      !(
        rentalInfo.dropOffDate instanceof Date ||
        typeof rentalInfo.dropOffDate === "string"
      )
    ) {
      missingFields.push("Drop off date");
    }
    if (!rentalInfo?.pickUpTime || typeof rentalInfo.pickUpTime !== "string") {
      missingFields.push("Pick up time");
    }
    if (
      !rentalInfo?.dropOffTime ||
      typeof rentalInfo.dropOffTime !== "string"
    ) {
      missingFields.push("Drop off time");
    }

    if (missingFields.length > 0) {
      messageApi.info(`Please choose: ${missingFields.join(", ")}.`);
      return;
    }

    navigate("/vehicles/vehiclePayment", {
      state: { car, rentalInfo },
    });
  };

  return handleRentNow;
};

export default useRentNow;