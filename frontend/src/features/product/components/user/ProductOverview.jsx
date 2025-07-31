import React from "react";

const ProductOverview = ({
  product,
  selectedVariation,
  setSelectedVariation,
  currentImage,
  setCurrentImage,
  loading,
  error,
  quantity,
  setQuantity,
  handleAddToCart
  
}) => {
  if (loading)
    return <div className="p-10 text-gray-600">Loading product...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;
  if (!product) return <div className="p-10">Product not found</div>;

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
                currentImage === product.imgUrl
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-indigo-100"
              }`}
            >
              Main
            </button>
            {product.colors?.map(({ colorName, imgUrl }) => (
              <button
                key={colorName}
                onClick={() => setCurrentImage(imgUrl)}
                className={`border px-3 py-1 rounded ${
                  currentImage === imgUrl
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-indigo-100"
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

          {/* Rating and Reviews */}
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1 text-yellow-500 text-lg">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>
                  {i < Math.round(product.averageRating) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.averageRating.toFixed(1)} ({product.numReviews} reviews)
            </span>
          </div>

          <div className="text-gray-600">
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>OS:</strong> {product.operatingSystem}
            </p>
            <p>
              <strong>Screen:</strong> {product.screenSize}
            </p>
       
          </div>

          {product && selectedVariation && (
            <div className="mt-4">
              <p className="font-semibold mb-1">Available Colors:</p>
              <div className="flex flex-wrap gap-2">
                {product.variations
                  .filter((v) => v.storage === selectedVariation.storage)
                  .map((v) => {
                    const color = product.colors.find(
                      (c) =>
                        c.colorName.toLowerCase() === v.colorName.toLowerCase()
                    );
                    const imgUrl = color?.imgUrl || product.imgUrl; // fallback if not found

                    return (
                      <button
                        key={`${v.storage}-${v.colorName}`}
                        onClick={() => {
                          setSelectedVariation(v);
                          setCurrentImage(imgUrl); // ✅ Use image from colors[]
                        }}
                        className={`px-3 py-1 rounded border ${
                          selectedVariation.colorName === v.colorName &&
                          selectedVariation.storage === v.storage
                            ? "bg-purple-600 text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        {v.colorName}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          <div className="text-2xl font-extrabold text-green-700">
            ${selectedVariation.priceAfterDiscount.toFixed(2)}
          </div>
          <div className="text-md text-gray-500 line-through">
            ${selectedVariation.price.toFixed(2)} (
            {selectedVariation.discountPercentage}% OFF)
          </div>

          {/* Storage Options */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-2">
              Select Storage:
            </h4>
            <div className="flex gap-3 flex-wrap">
              {[...new Set(product.variations.map((v) => v.storage))].map(
                (storage) => (
                  <button
                    key={storage}
                    onClick={() => {
                      const variations = product.variations.filter(
                        (v) => v.storage === storage
                      );
                      const defaultVariation =
                        variations.find(
                          (v) => v.colorName === selectedVariation?.colorName
                        ) || variations[0];
                      setSelectedVariation(defaultVariation);
                      // setCurrentImage(defaultVariation.imgUrl);

                      const matchedColor = product.colors.find(
                        (c) =>
                          c.colorName.toLowerCase() ===
                          defaultVariation.colorName.toLowerCase()
                      );
                      setCurrentImage(matchedColor?.imgUrl || product.imgUrl);
                    }}
                    className={`px-4 py-2 rounded border ${
                      selectedVariation?.storage === storage
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-100"
                    }`}
                  >
                    {storage}
                  </button>
                )
              )}
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

 <div className="mt-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Quantity:
  </label>
  <input
    type="number"
    min={1}
    max={selectedVariation?.stock || 1}
    value={quantity}
    onChange={(e) =>
      setQuantity(
        Math.max(1, Math.min(selectedVariation?.stock || 1, Number(e.target.value)))
      )
    }
    className="border rounded px-3 py-1 w-24"
  />

  {/* Stock Status Message */}
  <p
    className={`mt-2 text-sm font-semibold ${
      selectedVariation?.stock > 0 ? "text-green-600" : "text-red-600"
    }`}
  >
    {selectedVariation?.stock > 0
      ? `In Stock (${selectedVariation.stock} available)`
      : "Out of Stock"}
  </p>
</div>



          <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
