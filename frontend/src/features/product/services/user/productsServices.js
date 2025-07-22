import axios from "axios";
import { getToken } from "../../../../shared/utils/tokenUtils";

const API = axios.create({
  baseURL: "http://localhost:5000/api/products/",
});

export const fetchProducts = async ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  order = "asc",
  search = "",
  category = "",
}) => {
  const token = getToken();
  if (!token) throw new Error("Unauthorized: No token found");

  // Normalize order string
  const normalizedOrder = order.toLowerCase() === "desc" ? "desc" : "asc";

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

export const addReview = async (productId, { rating, comment }) => {
  const token = getToken(); // your function to get saved JWT token (e.g., from localStorage)

  if (!token) {
    throw new Error("User not authenticated");
  }

  try {
    const response = await API.post(
      `/${productId}/reviews`,
      { rating, comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to add review");
    } else {
      throw new Error(error.message || "Failed to add review");
    }
  }
};


export const getAllReviews = async (productId) => {
  const token = getToken(); // your function to get saved JWT token (e.g., from localStorage)

  if (!token) {
    throw new Error("User not authenticated");
  }

  try {
    const response = await API.get(
      `/${productId}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to get review");
    } else {
      throw new Error(error.message || "Failed to get review");
    }
  }
};

