import React from "react";

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500 mt-4 text-center">No reviews yet.</p>;
  }

  return (
    <div className="mt-8 max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold border-b pb-2">Customer Reviews</h2>

      {reviews.map((review) => (
        <div key={review._id} className="border rounded p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="font-semibold">{review?.name || "Anonymous"}</div>
            <StarDisplay rating={review.rating} />
          </div>
          <p className="text-gray-700">{review.comment}</p>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

const StarDisplay = ({ rating }) => (
  <div className="flex">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-5 h-5 ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.387 2.46c-.783.57-1.838-.196-1.538-1.118l1.286-3.974a1 1 0 00-.364-1.118L3.61 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.975z" />
      </svg>
    ))}
  </div>
);

export default ReviewList;
