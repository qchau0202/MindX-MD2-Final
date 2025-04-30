import { useState, useEffect } from "react";
import { getOrders } from "../../services/api";
import RentalCard from "../../components/admin/RentalCard";
import RentalFilter from "../../components/admin/RentalFilter";
import { Pagination } from "antd";

const CarRent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState("newest");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getOrders();
      let fetchedOrders = response.data.data;

      fetchedOrders = fetchedOrders.sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });

      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [sortOrder]);

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  // Paginate orders
  const paginatedOrders = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Rental List</h1>
        <RentalFilter onSortChange={handleSortChange} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedOrders.map((order) => (
              <RentalCard
                key={order._id}
                order={order}
                onStatusChange={fetchOrders}
              />
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={orders.length}
              showSizeChanger
              pageSizeOptions={["5", "10"]}
              onChange={handlePageChange}
              onShowSizeChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CarRent;
