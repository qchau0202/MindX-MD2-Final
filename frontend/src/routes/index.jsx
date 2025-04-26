import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import AdminLayout from "../layout/AdminLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/auth/NotFound";
import Home from "../pages/common/Home";
import VehiclesListPage from "../pages/vehicle/VehiclesListPage";
import VehicleDetail from "../pages/vehicle/VehicleDetail";
import VehiclePayment from "../pages/vehicle/VehiclePayment";
import OrderSuccess from "../components/common/OrderSuccess";
import Orders from "../pages/common/Orders";
import Profile from "../pages/common/Profile";
import ProfileOverview from "../components/profile/ProfileOverview";
import Dashboard from "../pages/admin/Dashboard";
import CarRent from "../pages/admin/CarRent";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/vehicles",
        element: <VehiclesListPage />,
      },
      {
        path: "/vehicles/:id",
        element: <VehicleDetail />,
      },
      {
        path: "/vehicles/vehiclePayment",
        element: (
          <ProtectedRoute roles={["customer"]}>
            <VehiclePayment />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orderSuccess",
        element: <OrderSuccess />,
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute roles={["customer", "car_provider", "admin"]}>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute roles={["customer", "car_provider", "admin"]}>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <ProfileOverview />,
          },
          {
            path: "orders",
            element: (
              <ProtectedRoute roles={["customer", "car_provider", "admin"]}>
                <Orders />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/carRent",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <CarRent />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
