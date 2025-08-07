import axios from "axios";
import { getToken } from "../../../shared/utils/tokenUtils";

const API = axios.create({
  baseURL: "http://localhost:5000/api/address/",
});

export const fetchAddress = async () => {
  const token = getToken();
  if (!token) throw new Error("Unauthorized: No token found");

  try {
    const response = await API.get("/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to get address:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateAddress = async (addressData) => {
  const token = getToken();
  if (!token) throw new Error("Unauthorized: No token found");

  try {
    const response = await API.put("/", addressData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to get address:",
      error.response?.data || error.message
    );
    throw error;
  }
};
