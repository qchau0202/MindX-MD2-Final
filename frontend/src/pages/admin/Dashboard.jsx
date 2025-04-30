import DetailsRental from "../../components/admin/DetailsRental";
import RecentTransaction from "../../components/admin/RecentTransaction";
import TopCarsRental from "../../components/admin/TopCarsRental";

const Dashboard = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <DetailsRental />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <TopCarsRental />
          <RecentTransaction />
        </div>
      </div>
    </>
  );
};

export default Dashboard;