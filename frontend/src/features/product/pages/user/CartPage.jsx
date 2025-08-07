// pages/CartPage.jsx
import CartItem from "../../components/user/CartItem";
import CheckoutAddressSection from "../../../payment/components/CheckoutAddressSection";
import { useCheckoutAddress } from "../../../payment/hooks/useCheckoutAddress"; 

import { useCart } from "../../hooks/user/useCart";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const handlePlaceOrder = () => {
    if (!hasAddress) {
    alert("Please add a shipping address before placing the order.");
    return;
  }

  if (hasOutOfStockItems) {
    alert("Some items are out of stock or exceed available quantity. Please update your cart.");
    return;
  }
  
    navigate("/order-summary");
  };

  const { cartItems, loading, removeFromCart, updateQuantity, totals } =
    useCart();

  const { subTotal, shipping, tax, total } = totals;

  const { address, loading: addressLoading } = useCheckoutAddress();

  const hasAddress = address && Object.values(address).some(val => val && val.toString().trim() !== "");
  const hasOutOfStockItems = cartItems?.some(item => item.quantity > item.stock);




  return (
    <main className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-4 text-center pb-2">Shopping Cart</h2>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 items-center"> */}
          
          {(!cartItems || cartItems.length === 0 )? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                />
                <circle cx="7" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
              </svg>

              <p className="text-gray-600 text-lg font-semibold">
                Your cart is empty.
              </p>

              <a
                href="/"
                className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded transition"
              >
                Start Shopping
              </a>
            </div>
          ) : (

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
            
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onQtyChange={updateQuantity}
                onRemove={removeFromCart}
              />
            ))
          }
          
        </div>
        {cartItems && cartItems.length > 0 && (
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
              className={`mt-6 w-full py-2 rounded text-white font-semibold transition duration-300 ${
    !hasAddress || hasOutOfStockItems
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-violet-600 hover:bg-violet-700"
  }`}
  onClick={handlePlaceOrder}
  disabled={!hasAddress}
            >
              Place Order
            </button>
   {!hasAddress && (
  <p className="text-red-600 mt-2 text-center">
    Please add a shipping address to place your order.
  </p>
)}
{hasOutOfStockItems && (
  <p className="text-red-600 mt-2 text-center">
    Some items are out of stock or unavailable in the quantity selected.
  </p>
)}

            <CheckoutAddressSection/>
          </div>
        )}
      </div>
  )}
      
    </main>
  );
};

export default CartPage;
