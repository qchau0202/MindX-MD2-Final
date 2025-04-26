const RecentTransaction = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Transaction</h2>
        <a href="#" className="text-blue-500 text-sm">
          View All
        </a>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Car"
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold">Nissan GT-R</h3>
              <p className="text-gray-500 text-sm">Sport Car</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">20 July</p>
            <p className="font-semibold">$80.00</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Car"
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold">Koenigsegg</h3>
              <p className="text-gray-500 text-sm">Sport Car</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">19 July</p>
            <p className="font-semibold">$99.00</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Car"
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold">Rolls-Royce</h3>
              <p className="text-gray-500 text-sm">Sport Car</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">18 July</p>
            <p className="font-semibold">$96.00</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Car"
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold">CR-V</h3>
              <p className="text-gray-500 text-sm">SUV</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">17 July</p>
            <p className="font-semibold">$80.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTransaction;
