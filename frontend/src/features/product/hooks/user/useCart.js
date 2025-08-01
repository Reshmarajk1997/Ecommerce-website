import { useEffect, useState } from "react";
import { getCart,updateCartItemQuantity,removeCartItem } from "../../services/user/cartServices";
export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({
    subTotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  });

    const updateCartState = (cart) => {
    setCartItems(cart.items);
    setTotals({
      subTotal: cart.subTotal,
      shipping: cart.shipping,
      tax: cart.tax,
      total: cart.total,
    });
  };



  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart();
        updateCartState(cart);
      } catch (err) {
        console.error("Error loading cart:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

 const updateQuantity  = async ({ productId, colorName, storage, quantity }) => {
  try {
    const updatedCart = await updateCartItemQuantity({
      productId,
      colorName,
      storage,
      quantity,
    });
    updateCartState(updatedCart); 
  } catch (error) {
    console.error("Quantity update failed:", error);
  }
};

  const removeFromCart = async (item) => {
  try {
    const updatedCart = await removeCartItem({
      productId: item.product,
      colorName: item.colorName,
      storage: item.storage,
    });
    updateCartState(updatedCart);
  } catch (err) {
    console.error("Failed to remove item from cart:", err.message);
  }
};



  return {
   cartItems,
    loading,
    updateQuantity ,
    removeFromCart,
    totals,
  };
};
