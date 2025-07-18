// features/product/components/ProductOverview.jsx
import React from 'react';

const ProductOverview = ({
  product,
  selectedVariation,
  setSelectedVariation,
  currentImage,
  setCurrentImage,
}) => {
  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
        {/* Image Section */}
        <div className="flex flex-col items-center ">
          <img
            src={currentImage}
            alt={product.name}
            className=" w-full h-[36rem] object-contain rounded-lg border shadow"
          />
          <div className="mt-4 flex gap-3 flex-wrap justify-center">
            <button
              onClick={() => setCurrentImage(product.imgUrl)}
              className={`border px-3 py-1 rounded ${
                currentImage === product.imgUrl ? "bg-indigo-600 text-white" : "hover:bg-indigo-100"
              }`}
            >
              Main
            </button>
            {product.colors?.map(({ colorName, imgUrl }) => (
              <button
                key={colorName}
                onClick={() => setCurrentImage(imgUrl)}
                className={`border px-3 py-1 rounded ${
                  currentImage === imgUrl ? "bg-indigo-600 text-white" : "hover:bg-indigo-100"
                }`}
              >
                {colorName}
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="mt-10 lg:mt-0 space-y-5">
          <h2 className="text-3xl font-bold text-gray-900">
            {product.name} ({selectedVariation.storage})
          </h2>

          <div className="text-gray-600">
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>OS:</strong> {product.operatingSystem}</p>
            <p><strong>Screen:</strong> {product.screenSize}</p>
          </div>

          <div className="text-2xl font-extrabold text-green-700">
            ${selectedVariation.priceAfterDiscount.toFixed(2)}
          </div>
          <div className="text-md text-gray-500 line-through">
            ${selectedVariation.price.toFixed(2)} ({selectedVariation.discountPercentage}% OFF)
          </div>

          {/* Storage Options */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-2">Select Storage:</h4>
            <div className="flex gap-3 flex-wrap">
              {product.variations.map((v) => (
                <button
                  key={v.storage}
                  onClick={() => setSelectedVariation(v)}
                  className={`px-4 py-2 rounded border ${
                    selectedVariation.storage === v.storage
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-100"
                  }`}
                >
                  {v.storage}
                </button>
              ))}
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
