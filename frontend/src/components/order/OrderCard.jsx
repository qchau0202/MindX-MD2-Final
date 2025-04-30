import OrderContent from "./OrderContent";
import OrderFooter from "./OrderFooter";
import OrderHeader from "./OrderHeader";

const OrderCard = ({ order, statusStyle, onUpdateOrder }) => {
  return (
    <div
      key={order._id}
      className="rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <OrderHeader
        order={order}
        statusStyle={statusStyle}
        onUpdateOrder={onUpdateOrder}
      />
      <OrderContent order={order} />
      <OrderFooter order={order} />
    </div>
  );
};

export default OrderCard;
