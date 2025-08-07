import React from "react";
import { useCheckoutAddress } from "../hooks/useCheckoutAddress";

const CheckoutAddressForm = ({ token, onAddressSave }) => {
  const {
    address,
    loading,
    saving,
    error,
    handleChange,
    handleSave,
  } = useCheckoutAddress(token, onAddressSave);

  if (loading) return <div>Loading address...</div>;

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white mt-4 mb-2">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Shipping Address</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Full Name */}
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-gray-700 mb-1 font-medium">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={address.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-gray-700 mb-1 font-medium">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={address.phoneNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Country */}
      <div className="mb-4">
        <label htmlFor="country" className="block text-gray-700 mb-1 font-medium">
          Country
        </label>
        <input
          id="country"
          type="text"
          name="country"
          placeholder="Country"
          value={address.country}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* City */}
      <div className="mb-4">
        <label htmlFor="city" className="block text-gray-700 mb-1 font-medium">
          City
        </label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Area */}
      <div className="mb-4">
        <label htmlFor="area" className="block text-gray-700 mb-1 font-medium">
          Area
        </label>
        <input
          id="area"
          type="text"
          name="area"
          placeholder="Area"
          value={address.area}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Street Address */}
      <div className="mb-4">
        <label htmlFor="streetAddress" className="block text-gray-700 mb-1 font-medium">
          Street Address
        </label>
        <input
          id="streetAddress"
          type="text"
          name="streetAddress"
          placeholder="Street Address"
          value={address.streetAddress}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Zip Code */}
      <div className="mb-6">
        <label htmlFor="zipCode" className="block text-gray-700 mb-1 font-medium">
          Zip Code
        </label>
        <input
          id="zipCode"
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={address.zipCode}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className={`w-full py-3 rounded-md text-white font-semibold ${
          saving ? "bg-violet-400 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700"
        }`}
      >
        {saving ? "Saving..." : "Save Address"}
      </button>
    </div>
  );
};

export default CheckoutAddressForm;
