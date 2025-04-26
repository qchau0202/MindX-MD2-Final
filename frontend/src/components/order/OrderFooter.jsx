const OrderFooter = ({ order }) => {
    return (
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">
              Order Date:{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-sm font-medium text-gray-600 mr-2">Total:</p>
            <p className="text-xl font-bold text-blue-700">
              {order.totalPrice.toLocaleString()} VND
            </p>
          </div>
        </div>
      </div>
    );
};
export default OrderFooter;
