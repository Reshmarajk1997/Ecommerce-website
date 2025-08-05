import axios from "axios";
import { getToken } from "../../../shared/utils/tokenUtils";

const API = axios.create({
  baseURL: "http://localhost:5000/api/payment/",
});


export const createCheckoutSession  = async()=>{
    const token = getToken();
      if (!token) throw new Error("Unauthorized: No token found");

      try {
         const { data } = await API.post(
      "create-checkout-session",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;

      } catch (error) {
        console.error("Failed to create checkout session:", error.message || error);
    throw error;
      }
}