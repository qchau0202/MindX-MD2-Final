import DetailsRental from "../../components/admin/DetailsRental";
import RecentTransaction from "../../components/admin/RecentTransaction";
import TopCarsRental from "../../components/admin/TopCarsRental";

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Bên trái: DetailsRental */}
      <div className="flex-1">
        <DetailsRental />
      </div>

      {/* Bên phải: Top5CarRental và RecentTransaction */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex-1">
          <TopCarsRental />
        </div>
        <div className="flex-1">
          <RecentTransaction />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
