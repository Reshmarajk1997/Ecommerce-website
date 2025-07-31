import axios from "axios";
import { getToken } from "../../../../shared/utils/tokenUtils";

const API = axios.create({
  baseURL: "http://localhost:5000/api/cart/",
});

export const addToCart = async ({
  productId,
  colorName,
  storage,
  quantity,
}) => {
  const token = getToken();
  if (!token) throw new Error("Unauthorized: No token found");

  try {
    const response = await API.post(
      "/",
      { productId, colorName, storage, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Failed to add product to cart:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const getCart = async()=>{
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
      "Failed to fetch cart items:",
      error.response?.data || error.message
    );
    throw error;
  }
}