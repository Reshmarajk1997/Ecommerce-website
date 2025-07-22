// ReviewForm.jsx
import React from "react";
import ReviewFormUI from "./ReviewFormUI";

import {useReviewForm} from '../../hooks/user/useReviewForm';

const ReviewForm = ({ productId, onReviewAdded }) => {
  const {
    rating,
    comment,
    error,
    loading,
    setRating,
    setComment,
    handleSubmit,
     reviewSubmitted,
  } = useReviewForm(productId, onReviewAdded);

  return (
    <ReviewFormUI
      rating={rating}
      comment={comment}
      error={error}
      loading={loading}
      onRatingChange={(value) => setRating(value)}
      onCommentChange={(e) => setComment(e.target.value)}
      onSubmit={handleSubmit}
      disabled={reviewSubmitted}
    />
  );
};

export default ReviewForm;
