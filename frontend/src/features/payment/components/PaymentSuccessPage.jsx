
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import usePaymentSession from "../hooks/usePaymentSession";

 const PaymentSuccessPage =()=>
   {
    const { loading, session, sessionId } = usePaymentSession();

  if (loading) {
    return <p className="text-center mt-10">Loading payment details...</p>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <CheckCircleIcon className="w-20 h-20 text-green-500 mb-6" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Thank you for your purchase. Your order has been placed successfully. You can view your order history anytime from your account.
      </p>
       <p className="mt-4">Stripe Session ID: {sessionId}</p>
      <p>Email: {session?.customer_email}</p>
      <div className="flex gap-4">
        <Link
          to="/orders"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
        >
          View Orders
        </Link>
        <Link
          to="/"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default
  PaymentSuccessPage
