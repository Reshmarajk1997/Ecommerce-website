import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = React.memo(({ product,onDelete }) => {
  const [currentImage, setCurrentImage] = useState(product.imgUrl);
  const navigate = useNavigate();

  return (
    <li className='border m-2 p-3 mb-2 rounded shadow flex flex-col  items-center'>
      <img
        src={currentImage}
        alt={product.name}
        className="w-full h-60 object-contain mb-2"
      />
      <h3 className='text-lg font-semibold'>{product.name}</h3>
      <p className="text-green-600 font-bold mb-1">${product.price}</p>
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
      <p>Operating System: {product.operatingSystem}</p>
      <p>Screen Size: {product.screenSize}</p>
      <p>Discount: {product.discountPercentage}%</p>
      <p>Price After Discount: ${product.priceAfterDiscount}</p>
      <p>Description: {product.description}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => setCurrentImage(product.imgUrl)}
          className={`px-3 py-1 rounded border ${
            currentImage === product.imgUrl
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Main Image
        </button>

        {product.colors.map(({ colorName, imgUrl }) => (
          <button
            key={colorName}
            onClick={() => setCurrentImage(imgUrl)}
            className={`px-3 py-1 rounded border ${
              currentImage === imgUrl
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {colorName}
          </button>
        ))}
      </div>


        <div className="mt-4 flex gap-2">
        <button
          onClick={() => navigate(`/admin/products/edit/${product._id}`)} //  navigate to edit page
          className="px-3 py-1 bg-yellow-400 text-white text-xs rounded hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>

    </li>
  );
});

export default ProductCard;
