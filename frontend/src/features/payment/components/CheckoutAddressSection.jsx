// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useCheckoutAddress } from "../hooks/useCheckoutAddress";

// const CheckoutAddressSection = () => {
//   const navigate = useNavigate();
//   const { address, loading, error } = useCheckoutAddress();

//   if (loading)
//     return (
//       <p className="text-center text-gray-500 italic mt-6">Loading address...</p>
//     );
//   if (error)
//     return (
//       <p className="text-center text-red-600 font-semibold mt-6">{error}</p>
//     );


//   const hasAddress = address && Object.values(address).some(Boolean);

//   return (
//     <div className="max-w-xl mx-auto p-4 border rounded shadow mt-4">
//       <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

//       {hasAddress ? (
//         <div className="bg-gray-100 p-4 rounded shadow mb-4">
//           <p><strong>{address.fullName.toUpperCase()}</strong></p>
//           <p>{address.phoneNumber}</p>
//           <p>{address.streetAddress}, {address.area}</p>
//           <p>{address.city}, {address.country} - {address.zipCode}</p>

//           <button
//             className="mt-3 bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
//             onClick={() => navigate("/shipping-address")}
//           >
//             Edit Address
//           </button>
//         </div>
//       ) : (
//         <div className="text-center">
//           <p className="mb-4 text-gray-600">No address found for checkout.</p>
//           <button
//             className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
//             onClick={() => navigate("/shipping-address")}
//           >
//             Add Address
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CheckoutAddressSection;



import React from "react";
import { useNavigate } from "react-router-dom";
import { useCheckoutAddress } from "../hooks/useCheckoutAddress";
import { FiEdit, FiPlus } from "react-icons/fi";

const CheckoutAddressSection = () => {
  const navigate = useNavigate();
  const { address, loading, error } = useCheckoutAddress();

  if (loading)
    return (
      <p className="text-center text-gray-500 italic mt-6">Loading address...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-600 font-semibold mt-6">{error}</p>
    );

  const hasAddress = address && Object.values(address).some(Boolean);

  return (
    <section className="max-w-xl mx-auto mt-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
        Shipping Address
      </h2>

      {hasAddress ? (
        <div className="bg-gray-50 p-5 rounded-lg shadow-inner space-y-3">
          <p className="text-lg font-bold tracking-wide text-gray-900">
            {address.fullName.toUpperCase()}
          </p>
          <p className="text-gray-700">{address.phoneNumber}</p>
          <p className="text-gray-700">
            {address.streetAddress}, {address.area}
          </p>
          <p className="text-gray-700">
            {address.city}, {address.country} - {address.zipCode}
          </p>

          <button
            onClick={() => navigate("/shipping-address")}
            className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-semibold transition"
            aria-label="Edit Shipping Address"
          >
            <FiEdit size={18} />
            Edit Address
          </button>
        </div>
      ) : (
        <div className="text-center py-12 px-4 text-gray-600">
          <p className="mb-6 text-lg font-medium">
            No address found for checkout.
          </p>
          <button
            onClick={() => navigate("/shipping-address")}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold transition"
            aria-label="Add Shipping Address"
          >
            <FiPlus size={20} />
            Add Address
          </button>
        </div>
      )}
    </section>
  );
};

export default CheckoutAddressSection;

