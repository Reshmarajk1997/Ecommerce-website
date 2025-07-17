import React from "react";
import ProductCard from "./ProductCard";

const ProductsList = ({
  products,
  totalPages,
  total,
  page,
  setPage,
  sortBy,
  setSortBy,
  order,
  setOrder,
  search,
  setSearch,
  category,
  setCategory,
  loading,
  error,
  onDelete,
}) => {
  return (
    <div className="">
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-center">
        <input
          type="text"
          placeholder="Search by name or brand"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="px-4 py-2 border border-gray-300 rounded-md 
          shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />

        <select
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
          className="px-4 py-2 border border-gray-300 rounded-md 
          shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">All Categories</option>
          <option value="smartphone">Smartphone</option>
          <option value="tablet">Tablet</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm 
          focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="createdAt">Created At</option>
          <option value="name">Name</option>
          <option value="brand">Brand</option>
          <option value="minPriceAfterDiscount">Price</option>
          <option value="maxDiscountPercentage">Max Discount</option>
          <option value="totalStock">Total Stock</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm 
          focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="asc">Asc</option>
          <option value="desc">Des</option>
        </select>
      </div>

      {/* {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && products.length === 0 && <p>No products found.</p>} */}
       {loading && (
        <p className="text-center text-gray-500 font-medium">Loading products...</p>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && products.length === 0 && (
        <p className="text-center text-gray-600">No products found.</p>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </ul>

      <div className="flex  items-center justify-center gap-4 mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages} ({total} products)
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
