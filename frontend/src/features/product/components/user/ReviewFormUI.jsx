import React,{useState} from "react";

const StarRating = ({ rating, onChange, disabled }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex space-x-1 justify-center sm:justify-start">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => !disabled && onChange(star)}
          onMouseEnter={() => !disabled && setHovered(star)}
          onMouseLeave={() => !disabled && setHovered(0)}
          className="focus:outline-none"
          aria-label={`${star} Star`}
        >
          <svg
            className={`w-8 h-8 sm:w-6 sm:h-6 ${
              (hovered || rating) >= star ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.387 2.46c-.783.57-1.838-.196-1.538-1.118l1.286-3.974a1 1 0 00-.364-1.118L3.61 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.975z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

const ReviewFormUI = ({
  rating,
  comment,
  error,
  loading,
  onRatingChange,
  onCommentChange,
  onSubmit,
  disabled,

}) => {
  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-6 max-w-full px-4 sm:px-6 md:px-0 md:max-w-xl mx-auto">
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}

      <div>
        <label className="block font-semibold mb-2 text-gray-800">Rating:</label>
        <StarRating rating={rating} onChange={onRatingChange} disabled={disabled || loading} />
      </div>

      <div>
        <label className="block font-semibold mb-2 text-gray-800">Comment:</label>
        <textarea
          value={comment}
          onChange={onCommentChange}
          className="w-full min-h-[100px] sm:min-h-[120px] border border-gray-300 
          rounded-md px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          disabled={disabled || loading}
        />
      </div>

        <div className="flex justify-center sm:justify-start">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 
          disabled:opacity-50 disabled:cursor-not-allowed transition"
          disabled={disabled || loading}
        >
          {loading ? "Submitting..." : disabled ? "Already Reviewed" : "Submit Review"}
        </button>
      </div>
      
    </form>
  );
};

export default ReviewFormUI;
