import OrderContent from "./OrderContent";
import OrderFooter from "./OrderFooter";
import OrderHeader from "./OrderHeader";

const OrderCard = ({ order, statusStyle }) => {
  return (
    <div
      key={order._id}
      className="rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <OrderHeader order={order} statusStyle={statusStyle} />
      <OrderContent order={order} />
      <OrderFooter order={order} />
    </div>
  );
};

export default OrderCard;
