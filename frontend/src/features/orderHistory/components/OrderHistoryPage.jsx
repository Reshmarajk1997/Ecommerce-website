import React from "react";
import useOrders from "../hooks/useOrders";

const OrderHistoryPage = () => {
  const { orders, totalOrders, loading, error } = useOrders();

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">My Orders ({totalOrders})</h2>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 rounded-xl mb-6 shadow-sm">
          <p className="text-sm text-gray-600">Order ID: {order._id}</p>
          <p className="text-sm text-gray-600 mb-2">
            Date: {new Date(order.createdAt).toLocaleString()}
          </p>

          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={item._id || index}
                className="flex gap-4 items-center border-b pb-2"
              >
                <img
                  src={item.productImage}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Storage: {item.storage} | Color: {item.colorName}
                  </p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                  <p className="text-sm font-semibold">
                    Price: AED {item.priceAfterDiscount}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right mt-4">
            <p className="font-bold text-lg">
              Total: AED {order.totalAmount}
            </p>
            <p className="text-sm text-gray-500">
              Payment: {order.paymentStatus}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryPage;
