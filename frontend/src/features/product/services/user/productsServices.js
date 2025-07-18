import axios from "axios";
import { getToken } from "../../../../shared/utils/tokenUtils";



const API = axios.create({
    baseURL:"http://localhost:5000/api/products/",
})


export const fetchProducts = async ({
  page = 1,
  limit = 10,
  sortBy = 'createdAt',
  order = 'asc',
  search = '',
  category = '',
}) => {
  const token = getToken();
  if (!token) throw new Error("Unauthorized: No token found");

  // Normalize order string
  const normalizedOrder = order.toLowerCase() === 'desc' ? 'desc' : 'asc';

  const response = await API.get("/", {
    params: {
      page,
      limit,
      sortBy,
      order: normalizedOrder,
      search,
      category,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Fetching products with:", {
    page,
    limit,
    sortBy,
    order: normalizedOrder,
    search,
    category,
  });

  return response.data;
};

export const fetchProductById = async (productId) => {
  const token = getToken();
  if (!token) throw new Error("Unauthorized: No token found");
  try {
    const response = await API.get(`/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
  } catch (error) {
     console.error("Failed to fetch product by ID:", error.message);
    throw error;
  
  } 
};









