const STATUS_COLORS = {
  GREEN: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
  },
  YELLOW: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-200",
  },
  RED: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-200",
  },
  BLUE: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200",
  },
  GRAY: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-200",
  },
};

const getStatusColor = (status) => {
  const statusColors = {
    confirmed: STATUS_COLORS.GREEN,
    pending: STATUS_COLORS.YELLOW,
    cancelled: STATUS_COLORS.RED,
    completed: STATUS_COLORS.BLUE,
    customer: STATUS_COLORS.GRAY,
    car_provider: STATUS_COLORS.BLUE,
    admin: STATUS_COLORS.RED,
  };

  return statusColors[status] || STATUS_COLORS.GRAY;
};

export default getStatusColor;
