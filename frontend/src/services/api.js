import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Token vào header
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// URLs cho các API

// Auth APIs
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);

// Vehicle APIs
export const searchVehicles = () => api.get('/vehicles');
export const getProviderVehicles= (id) => api.get(`/vehicles/${id}`);
export const createVehicle = (data) => api.post('/vehicles', data);
export const updateVehicle = (id, data) => api.put(`/vehicles/${id}`, data);
export const deleteVehicle = (id) => api.delete(`/vehicles/${id}`);

// Order APIs
export const createOrder = (data) => api.post('/orders', data);
export const getOrders = () => api.get('/orders');