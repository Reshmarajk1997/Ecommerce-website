
import React from "react";

export function ProductsTable({
  products,
  page,
  setPage,
  totalPages,
  search,
  setSearch,
  category,
  setCategory,
  sortBy,
  setSortBy,
  order,
  setOrder,
  loading,
  error,
  onDelete,
}) {
  const toggleOrder = () => setOrder(order === "asc" ? "desc" : "asc");

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="p-6">
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by name or brand..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            transition duration-200 w-full sm:w-72"
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            transition duration-200 w-full sm:w-48"
        >
          <option value="">All Categories</option>
          <option value="smartphone">Smartphone</option>
          <option value="tablet">Tablet</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            transition duration-200 w-full sm:w-48"
        >
          <option value="createdAt">Created At</option>
          <option value="name">Name</option>
          <option value="minPriceAfterDiscount">Min Price</option>
          <option value="totalStock">Total Stock</option>
          <option value="maxDiscountPercentage">Max Discount</option>
        </select>

        <button
          onClick={toggleOrder}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md
            px-5 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500
            focus:ring-offset-1 transition duration-200"
        >
          Order: {order === "asc" ? "Asc" : "Des"}
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center text-gray-500 mt-12">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-600 mt-12">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600 mt-12">No products found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-indigo-50 text-indigo-700 font-semibold">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Category</th>
              <th className="p-3">Colors</th>
              <th className="p-3">Variations</th>
              <th className="p-3">Total Stock</th>
              <th className="p-3">Min Price</th>
              <th className="p-3">Max Discount</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b last:border-none hover:bg-indigo-100 transition-colors">
                <td className="p-2">
                  <img
                    src={product.imgUrl}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="p-3 font-medium">{product.name}</td>
                <td className="p-3">{product.brand}</td>
                <td className="p-3 capitalize">{product.category}</td>

                {/* Colors */}
                <td className="p-2">
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color, index) => (
                      <div key={index} className="text-center">
                        <img
                          src={color.imgUrl || product.imgUrl}
                          alt={color.colorName}
                          className="w-8 h-8 rounded border object-cover"
                          title={color.colorName}
                        />
                        <div className="text-xs">{color.colorName}</div>
                      </div>
                    ))}
                  </div>
                </td>

                {/* Variations */}
                <td className="p-2">
                  <ul className="space-y-1">
                    {product.variations.map((variation, i) => (
                      <li key={i} className="text-xs">
                        <strong>{variation.storage}</strong>: ${variation.priceAfterDiscount}  
                        (${variation.price},{variation.discountPercentage}% off, stock: {variation.stock})
                      </li>
                    ))}
                  </ul>
                </td>

                <td className="p-3">{product.totalStock}</td>
                <td className="p-3 font-semibold">${product.minPriceAfterDiscount}</td>
                <td className="p-3 text-red-600 font-semibold">{product.maxDiscountPercentage}%</td>
                <td className="p-3 space-x-3">
                  <button
                    onClick={() =>
                      window.location.assign(`/admin/products/${product._id}/edit`)
                    }
                    className="bg-indigo-600 hover:bg-indigo-700 text-white 
                    px-3 py-1 rounded-md text-xs font-semibold transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="bg-red-600 
                    hover:bg-red-700 text-white px-3 
                    py-1 rounded-md text-xs font-semibold transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center items-center gap-6">
        <button
          disabled={page === 1}
          onClick={handlePrevPage}
          className={`px-4 py-2 rounded-md border font-semibold transition
            ${
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-indigo-600 hover:bg-indigo-100"
            }`}
          // className={`px-3 py-1 rounded border ${
          //   page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
          // }`}
        >
          Prev
        </button>
        <span className="text-indigo-700 font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={handleNextPage}
          // className={`px-3 py-1 rounded border ${
          //   page === totalPages
          //     ? "opacity-50 cursor-not-allowed"
          //     : "hover:bg-gray-200"
          // }`}
          className={`px-4 py-2 rounded-md border font-semibold transition
            ${
              page === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-indigo-600 hover:bg-indigo-100"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
