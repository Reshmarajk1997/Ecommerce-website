// pages/CartPage.jsx
import CartItem from "../../components/user/CartItem";
import { useCart } from "../../hooks/user/useCart";



const CartPage = () => {
  const {
    // cartItems,
    // removeFromCart,
    // updateQuantity,
    // getCartTotals,

        cartItems,
  loading,
  removeFromCart,
  updateQuantity,
  totals,
  } = useCart();

  // const { subtotal, shipping, tax, total } = getCartTotals();
  const { subTotal, shipping, tax, total } = totals;


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-10">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {cartItems.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            onQtyChange={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </div>

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
        <button className="mt-6 w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
