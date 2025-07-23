import { useState } from "react";
import { addReview } from "../../services/user/productsServices";


export const useReviewForm = (productId, onReviewAdded) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
   const [reviewSubmitted, setReviewSubmitted] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await addReview(productId, { rating, comment });
       if (typeof onReviewAdded === "function") {
        // onReviewAdded(data.product);
         onReviewAdded({
    averageRating: data.averageRating,
    numReviews: data.numReviews,
    review:data.review
  });
      }
      
      setRating(5);
      setComment("");
      setReviewSubmitted(true);
    } catch (err) {
       if (err.message === "Product already reviewed") {
        setError("You have already reviewed this product.");
        setReviewSubmitted(true); // disable form to prevent resubmit
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    rating,
    comment,
    error,
    loading,
    setRating,
    setComment,
    handleSubmit,
    reviewSubmitted,
  };
};

