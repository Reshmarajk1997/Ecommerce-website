import React, { useState, useEffect } from "react";
import { useProductOverview } from "../../hooks/user/useProductOverview";
import { useGetProductReviews } from "../../hooks/user/useGetProductReviews";

import ProductOverview from "../../components/user/ProductOverview";
import ReviewForm from "../../components/user/ReviewForm";
import ReviewList from "../../components/user/ReviewList";

const ProductOverviewPage = () => {
  const productOverviewProps = useProductOverview();
  const { product, setProduct } = productOverviewProps;


  const { reviews,setReviews, loadingReviews, errorReviews, refetchReviews } =
    useGetProductReviews(product?._id);

  return (
    <div className="px-4 py-6">
      <ProductOverview {...productOverviewProps} />

      {product && (
        <>
          <ReviewForm
            productId={product._id}
            onReviewAdded={(updatedProductFromServer) => {
              setProduct((prevProduct) => ({
                ...prevProduct,
                averageRating: updatedProductFromServer.averageRating,
                numReviews: updatedProductFromServer.numReviews,
              }));

               if (updatedProductFromServer.review) {
                setReviews((prevReviews) => [
                  updatedProductFromServer.review,
                  ...prevReviews,
                ]);
              }

            }}
          />

          {loadingReviews ? (
            <p className="text-center text-gray-500 mt-4">Loading reviews...</p>
          ) : errorReviews ? (
            <p className="text-red-600 text-center">{errorReviews}</p>
          ) : (
            <ReviewList reviews={reviews} />
          )}
        </>
      )}
    </div>
  );
};

export default ProductOverviewPage;
