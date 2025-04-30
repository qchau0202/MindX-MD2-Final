import { useState, useEffect } from "react";
import { getOrders } from "../../services/api";
import { Link } from "react-router-dom";

const RecentTransaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getOrders();
        const sortedTransactions = response.data.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);
        setTransactions(sortedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Transaction</h2>
        <Link to="/admin/carRent" className="text-blue-500 text-sm">
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <Link
            key={transaction._id}
            to="/admin/carRent"
            state={{ order: transaction }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/50"
                alt="Car"
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold">
                  {transaction.vehicle.make} {transaction.vehicle.model}
                </h3>
                <p className="text-gray-500 text-sm">
                  {transaction.vehicle.type}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">
                {new Date(transaction.createdAt).toLocaleDateString()}
              </p>
              <p className="font-semibold">
                ${transaction.totalPrice.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentTransaction;