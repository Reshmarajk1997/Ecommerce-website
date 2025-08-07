// hooks/usePaymentSession.js
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchStripeSession } from "../services/paymentService";

const usePaymentSession = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const loadSession = async () => {
      try {
        if (!sessionId) return;
        const data = await fetchStripeSession(sessionId);
        setSession(data);
      } catch (err) {
        console.error("Failed to load Stripe session", err);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, [sessionId]);

  return { loading, session, sessionId };
};

export default usePaymentSession;
