import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../services/paymentService";


console.log("Stripe Key:", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey) {
  console.error("Missing Stripe publishable key in env!");
}

const stripePromise = loadStripe(stripeKey);

export const useStripeCheckout = () => {
  const handleCheckout = async () => {
    try {
      const data = await createCheckoutSession();

       console.log("Stripe Checkout Session ID:", data.id);

      const stripe = await stripePromise;

      if (!stripe) {
        console.error("❌ Stripe failed to initialize.");
        alert("Stripe failed to initialize.");
        return;
      }

      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (error) {
        console.error("Stripe redirect error:", error);
        alert("Failed to redirect to checkout.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert(err.message || "Something went wrong during checkout.");
    }
  };

  return { handleCheckout };
};
