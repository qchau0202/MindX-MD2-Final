const useRentalCalculations = (car, rentalInfo) => {
  const validateInputs = () => {
    if (!car || !car._id || typeof car.pricePerDay !== "number") {
      return "Missed or Wrong information.";
    }
    if (!rentalInfo) {
      return "Information is missing.";
    }

    const requiredFields = [
      "pickUpLocation",
      "pickUpDate",
      "pickUpTime",
      "dropOffLocation",
      "dropOffDate",
      "dropOffTime",
    ];

    const invalidField = requiredFields.find((field) => {
      const value = rentalInfo[field];
      // Check if field is missing or not a string when expected
      if (!value || value === null || value === undefined) {
        return true;
      }
      // Only call includes on strings
      if (typeof value === "string" && value.includes("Select your")) {
        return true;
      }
      return false;
    });

    return invalidField
      ? `Vui lòng điền ${invalidField
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()}.`
      : null;
  };

  const calculateRentalDetails = () => {
    const validationError = validateInputs();
    if (validationError) {
      return {
        error: validationError,
        subtotal: 0,
        totalPrice: 0,
        durationInDays: 0,
        tax: 0,
      };
    }

    const start = new Date(`${rentalInfo.pickUpDate}T${rentalInfo.pickUpTime}`);
    const end = new Date(`${rentalInfo.dropOffDate}T${rentalInfo.dropOffTime}`);

    if (isNaN(start) || isNaN(end)) {
      return {
        error: "Invalid date or time.",
        subtotal: 0,
        totalPrice: 0,
        durationInDays: 0,
        tax: 0,
      };
    }

    const durationInMs = end - start;
    const durationInDays = Math.max(
      1,
      Math.ceil(durationInMs / (1000 * 60 * 60 * 24))
    );

    if (durationInDays <= 0) {
      return {
        error: "End date must be after start date.",
        subtotal: 0,
        totalPrice: 0,
        durationInDays: 0,
        tax: 0,
      };
    }

    const dailyPrice = car.discountPrice || car.pricePerDay || 0;
    const subTotal = durationInDays * dailyPrice;
    const tax = subTotal * 0.1;
    const totalPrice = subTotal + tax;

    return { error: null, subTotal, tax, totalPrice, durationInDays };
  };

  return calculateRentalDetails();
};

export default useRentalCalculations;