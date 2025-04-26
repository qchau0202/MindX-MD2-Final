import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useAuth } from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const { loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
 
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header className="sticky top-0 z-10 bg-white" />
      <main className="flex-grow">
        {<Outlet/>|| <div className="text-red-500">No content provided</div>}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
