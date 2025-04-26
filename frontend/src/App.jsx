// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AppLayout from "./layout/AppLayout";
// import VehiclesListPage from "./pages/vehicles/VehiclesListPage";
// import VehicleDetail from "./pages/vehicles/VehicleDetail";
// import PaymentVehicleRent from "./pages/vehicles/PaymentVehicleRent";
// import Home from "./pages/common/Home";
// import Dashboard from "./pages/admin/Dashboard";
// import CarRent from "./pages/admin/CarRent";
// import AdminLayout from "./layout/AdminLayout";
// // import AuthLayout from "./layout/AuthLayout";
// // import LoginForm from "./components/auth/LoginForm";
// // import RegisterForm from "./components/auth/RegisterForm";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* <Route
//           path="/login"
//           element={
//             <AuthLayout>
//               <LoginForm />
//             </AuthLayout>
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             <AuthLayout>
//               <RegisterForm/>
//             </AuthLayout>
//           }
//         /> */}
//         <Route
//           path="/"
//           element={
//             <AppLayout>
//               <Home />
//             </AppLayout>
//           }
//         />
//         <Route
//           path="/vehicles"
//           element={
//             <AppLayout>
//               <VehiclesListPage />
//             </AppLayout>
//           }
//         />
//         <Route
//           path="/vehicles/vehicleDetails"
//           element={
//             <AppLayout>
//               <VehicleDetail />
//             </AppLayout>
//           }
//         />
//         <Route
//           path="/vehicles/vehiclePayment"
//           element={
//             <AppLayout>
//               <PaymentVehicleRent />
//             </AppLayout>
//           }
//         />
//         <Route
//           path="/admin/dashboard"
//           element={
//             <AdminLayout>
//               <Dashboard />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path="/admin/car-rent"
//           element={
//             <AdminLayout>
//               <CarRent />
//             </AdminLayout>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import router from "./routes";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
