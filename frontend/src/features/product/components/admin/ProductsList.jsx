import React from "react";
import ProductCard from './ProductCard';


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
    <div>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or brand"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="p-2 border rounded"
        />

        <select
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="smartphone">Smartphone</option>
          <option value="tablet">Tablet</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="createdAt">Created At</option>
          <option value="name">Name</option>
          <option value="brand">Brand</option>
          <option value="price">Price</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && products.length === 0 && <p>No products found.</p>}

      

           <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product._id} product={product} onDelete={onDelete} />)
        ) : (
          <p>No products found.</p>
        )}
      </ul>


      <div className="flex  items-center justify-center gap-4 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages} ({total} products)
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

        {/* <div className="mt-4 flex gap-2">
        <button
          onClick={handleEdit}
          className="px-3 py-1 bg-yellow-400 text-white text-xs rounded hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div> */}

    </div>
  );
};

export default ProductsList;
