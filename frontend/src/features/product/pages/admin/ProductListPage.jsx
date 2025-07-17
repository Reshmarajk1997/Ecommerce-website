



import React, { useState } from "react";
import {useProducts} from "../../hooks/admin/useProducts";
import {ProductsTable} from "../../components/admin/ProductsTable";
import { deleteProductById } from "../../services/admin/productServices";

const ProductListPage = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);
  // const productProps = useProducts({ refreshFlag,initialLimit: 10  });
    const productProps = useProducts(refreshFlag, 10);

  const handleDelete = async (productId) => {
    console.log("Delete requested for:", productId);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const response = await deleteProductById(productId);
      console.log("Deleted:", response);
      alert(response.message || "Product deleted successfully.");
      setRefreshFlag((prev) => !prev);

      // Adjust page if last item deleted on current page
      if (productProps.products.length === 1 && productProps.page > 1) {
        productProps.setPage(productProps.page - 1);
      }
    } catch (error) {
      alert(error.message || "Failed to delete product");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <ProductsTable {...productProps} onDelete={handleDelete} />
    </div>
  );
};

export default ProductListPage;

