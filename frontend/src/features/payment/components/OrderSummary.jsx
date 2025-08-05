// components/OrderSummary.jsx
import { useCart } from "../../product/hooks/user/useCart";
import { useStripeCheckout } from "../hooks/useStripeCheckout";

const OrderSummary = () => {
    const {handleCheckout} = useStripeCheckout()
  const { totals } = useCart();

  const { subTotal, shipping, tax, total } = totals;

  return (
    <div className="bg-gray-50 p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Order summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping estimate</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax estimate</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex justify-between font-bold text-lg mt-4">
        <span>Order total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button
        onClick={handleCheckout}
        className="mt-6 w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded"
      >
        Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
