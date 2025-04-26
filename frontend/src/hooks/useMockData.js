import { useState, useEffect } from "react";
import {
  mockData,
  getVehicleById,
  getReviewsByVehicleId,
} from "../mock-data/data";

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVehicles(mockData.vehicles);
      setLoading(false);
    }, 1000);
  }, []);

  return { vehicles, loading };
};

export const useVehicleDetails = (id) => {
  const [vehicle, setVehicle] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVehicle(getVehicleById(id));
      setReviews(getReviewsByVehicleId(id));
      setLoading(false);
    }, 1000);
  }, [id]);

  return { vehicle, reviews, loading };
};
