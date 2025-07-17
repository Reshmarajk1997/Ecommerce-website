



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
      <h2 className="text-2xl font-bold mb-4">Admin Products</h2>

      {/* Filters */}
      <div className="flex   gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or brand..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-1 rounded"
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-1 rounded"
        >
          <option value="">All Categories</option>
          <option value="smartphone">Smartphone</option>
          <option value="tablet">Tablet</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="createdAt">Created At</option>
          <option value="name">Name</option>
          <option value="minPriceAfterDiscount">Min Price</option>
          <option value="totalStock">Total Stock</option>
          <option value="maxDiscountPercentage">Max Discount</option>
        </select>

        <button
          onClick={toggleOrder}
          className="bg-blue-500 text-white px-3 rounded"
        >
          Order: {order === "asc" ? "Asc" : "Des"}
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Brand</th>
              <th className="p-2">Category</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Min Price</th>
              <th className="p-2">Max Discount</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="p-2">
                  <img
                    src={product.imgUrl}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.brand}</td>
                <td className="p-2 capitalize">{product.category}</td>
                <td className="p-2">{product.totalStock}</td>
                <td className="p-2">${product.minPriceAfterDiscount}</td>
                <td className="p-2">{product.maxDiscountPercentage}%</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() =>
                      window.location.assign(`/admin/products/${product._id}/edit`)
                    }
                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          disabled={page === 1}
          onClick={handlePrevPage}
          className={`px-3 py-1 rounded border ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
          }`}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={handleNextPage}
          className={`px-3 py-1 rounded border ${
            page === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

