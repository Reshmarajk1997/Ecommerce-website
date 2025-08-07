// src/hooks/useOrders.js
import { useState, useEffect } from "react";
import { fetchOrders } from "../services/orderHistoryServices";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data.orders);
        setTotalOrders(data.totalOrders);
      } catch (err) {
        setError("Failed to fetch order history");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return { orders, totalOrders, loading, error };
};

export default useOrders;
