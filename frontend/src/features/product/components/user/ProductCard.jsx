


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StarDisplay = ({ rating }) => {
  const rounded = Math.round(rating);
  return (
    <div className="flex justify-center items-center gap-1 text-yellow-400">
      {[1,2,3,4,5].map((star) => (
        <span key={star} className="text-xl select-none">
          {star <= rounded ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

const ProductCard = React.memo(({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.imgUrl);
  const navigate = useNavigate();

  return (
    <li 
    onClick={()=>navigate(`/product/${product._id}`)}
    className="border border-gray-300 rounded-lg shadow-lg p-5 flex flex-col items-center 
  bg-white hover:shadow-xl transition-shadow duration-300 w-full">

      <img
        src={currentImage}
        alt={product.name}
        className="w-full h-64 object-contain mb-4 rounded-md 
        transition-transform duration-300 hover:scale-105 cursor-pointer"
      />
      <h3 className="text-xl font-bold uppercase text-gray-900 mb-2 text-center">
        {`${product.name} (${product.defaultVariation.storage})`}
      </h3>

       <div className="flex flex-col items-center mb-3">
        <StarDisplay rating={product.averageRating} />
        <p className="text-gray-600 text-sm">
          {product.numReviews} review{product.numReviews !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <p className="text-gray-400 line-through font-semibold text-lg">
          ${product.defaultVariation.price.toFixed(2)}
        </p>
        <p className="text-red-600 font-semibold text-md">
          {product.defaultVariation.discountPercentage}% OFF
        </p>
      </div>

      <p className="text-green-700 font-extrabold text-2xl mb-4">
        ${product.defaultVariation.priceAfterDiscount.toFixed(2)}
      </p>

      {/* <div className="w-full text-sm text-gray-600 space-y-1 mb-4 text-center">
        <p><span className="font-semibold text-gray-800">Brand:</span> {product.brand}</p>
        <p><span className="font-semibold text-gray-800">Operating System:</span> {product.operatingSystem}</p>
        <p><span className="font-semibold text-gray-800">Screen Size:</span> {product.screenSize}</p>
      </div>

      <p className="text-gray-700 text-center mb-4 line-clamp-3">{product.description}</p> */}

      

      <div className="mt-auto flex flex-wrap justify-center gap-3 w-full">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentImage(product.imgUrl);
          }}
          className={`px-4 py-1 rounded border transition-colors duration-300 font-medium ${
            currentImage === product.imgUrl
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
          }`}
          aria-label="Select main image"
        >
          Main Image
        </button>

        {product.colorOptions?.map(({ colorName, imgUrl }) => (
          <button
            key={colorName}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImage(imgUrl);
            }}
            className={`px-4 py-1 rounded border transition-colors duration-300 font-medium ${
              currentImage === imgUrl
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
            }`}
            aria-label={`Select color ${colorName}`}
          >
            {colorName}
          </button>
        ))}
      </div>

      
    </li>
  );
});

export default ProductCard;
