// hooks/useCart.js
import { useEffect, useState } from "react";
import {  getCart } from "../../services/user/cartServices";
export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
 const [loading, setLoading] = useState(true);
const [totals, setTotals] = useState({
  subTotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
});


//  useEffect(()=>{
//   const fetchCart = async()=>{
//     try {
//       const cart = await getCart();
//       setCartItems(cart.items)
//     } catch (error) {
//       console.error("Error loading cart:", err.message);
//     }finally {
//         setLoading(false);
//       }
//   }

//   fetchCart();
//  },[]);




  // const addToCart = (product) => {
  //   setCartItems((prev) => [...prev, product]);
  // };


  useEffect(() => {
  const fetchCart = async () => {
    try {
      const cart = await getCart();
      setCartItems(cart.items);
      setTotals({
        subTotal: cart.subTotal,
        shipping: cart.shipping,
        tax: cart.tax,
        total: cart.total,
      });
    } catch (err) {
      console.error("Error loading cart:", err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchCart();
}, []);



  //  const removeFromCart = (itemId) => {
  //   setCartItems((prev) => prev.filter((item) => item._id !== itemId));
  // };

  // const updateQuantity = (itemId, newQty) => {
  //   setCartItems((prev) =>
  //     prev.map((item) =>
  //       item._id === itemId ? { ...item, quantity: newQty } : item
  //     )
  //   );
  // };


  // const getCartTotals = () => {
  //   const subtotal = cartItems.reduce(
  //     (total, item) => total + item.priceAfterDiscount * item.quantity,
  //     0
  //   );
  //   const shipping = 5;
  //   const tax = +(subtotal * 0.084).toFixed(2);
  //   const total = +(subtotal + shipping + tax).toFixed(2);

  //   return { subtotal, shipping, tax, total };
  // };

  return {
    // cartItems,
    // loading,
    // removeFromCart,
    // updateQuantity,
    // getCartTotals,

  


     cartItems,
  loading,
  totals,
  };
};


