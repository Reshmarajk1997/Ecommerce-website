import { useState, useEffect } from "react";
import { fetchAddress, updateAddress } from "../services/addressService";
import { useNavigate } from "react-router-dom";

export const useCheckoutAddress = (onSaveCallback) => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch address once component mounts
  useEffect(() => {
    const loadAddress = async () => {
      try {
        const data = await fetchAddress();
        setAddress(data || null);
      } catch (err) {
        console.error("Failed to fetch address", err);
        setAddress(null); // if error, treat as no address
      } finally {
        setLoading(false);
      }
    };

    loadAddress();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await updateAddress(address); // token handled internally
      if (onSaveCallback) onSaveCallback(address);
      alert("Address saved successfully!");
      navigate('/cart')
    } catch (err) {
      console.error(err);
      setError("Failed to save address. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return {
    address,
    loading,
    saving,
    error,
    handleChange,
    handleSave,
    setAddress, // expose this for manually resetting if needed
  };
};
