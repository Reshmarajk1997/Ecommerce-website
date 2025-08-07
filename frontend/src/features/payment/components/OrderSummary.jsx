
import { useCart } from "../../product/hooks/user/useCart";
import { useStripeCheckout } from "../hooks/useStripeCheckout";

const OrderSummary = () => {
    const {handleCheckout} = useStripeCheckout()
  const { totals } = useCart();

  const { subTotal, shipping, tax, total } = totals;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 w-full max-w-md mx-auto mt-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">Order Summary</h3>
        <div className="space-y-4 text-sm text-gray-700">
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
     
        <div className="flex justify-between items-center font-semibold text-lg text-gray-900 mt-6 border-t pt-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button
        onClick={handleCheckout}

        className="mt-6 w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl text-sm font-medium transition duration-200 shadow-md"
      
      >
        Checkout
      </button>
    </div>
  );
};

export default OrderSummary;




