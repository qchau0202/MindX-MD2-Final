import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "An error occurred, please try again.";
    console.error("API error:", errorMsg);
    return Promise.reject(new Error(errorMsg));
  }
);

// Auth APIs
export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);
export const getCurrentUser = () => api.get("/auth/current");

// User APIs
export const getUserProfile = () => api.get("/users/me");
export const updateUserProfile = (data) => {
  console.log("Sending update user profile request:", data);
  return api.put("/users/me", data);
};
export const changePassword = (data) => api.put("/users/me/password", data);
export const deleteAccount = () => api.delete("/users/me");
export const getAllUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUserById = (id, data) => {
  console.log("Sending update user by ID request:", { id, data });
  return api.put(`/users/${id}`, data);
};
export const deleteUserById = (id) => api.delete(`/users/${id}`);
export const searchUsers = (name) =>
  api.get("/users/search", { params: { name } });

// Vehicle APIs
export const searchVehicles = (params = {}) => api.get("/vehicles", { params });
export const getProviderVehicles = () => api.get("/vehicles/provider");
export const createVehicle = (data) => api.post("/vehicles", data);
export const updateVehicle = (id, data) => api.put(`/vehicles/${id}`, data);
export const deleteVehicle = (id) => api.delete(`/vehicles/${id}`);

// Order APIs
export const createOrder = (data) =>
  api.post("/orders", {
    vehicleId: data.vehicleId,
    startDate: data.startDate,
    endDate: data.endDate,
    totalPrice: data.totalPrice,
    pickUpLocation: data.pickUpLocation,
    dropOffLocation: data.dropOffLocation,
    pickUpTime: data.pickUpTime,
    dropOffTime: data.dropOffTime,
  });
export const getOrders = () => api.get("/orders/details");
