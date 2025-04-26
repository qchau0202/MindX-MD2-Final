import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-grow overflow-y-auto p-6">
          <Outlet/>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminLayout;
