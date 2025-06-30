import React, {useState} from 'react';
import useProducts from '../../hooks/admin/useProducts';
import ProductsList from '../../components/admin/ProductsList';
import {deleteProductById} from '../../services/admin/productServices';

const ProductListPage = () => {
  
    // const productProps = useProducts();


    const [refreshFlag, setRefreshFlag] = useState(false);

  // Pass refreshFlag to hook to trigger refetch
  const productProps = useProducts({ refreshFlag });

  // Delete handler toggles refreshFlag to reload products
  const handleDelete = async (productId) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      const response = await deleteProductById(productId);
      alert(response.message || "Product deleted successfully.");

      // Trigger refresh of products list
      setRefreshFlag((prev) => !prev);

      // Adjust page if last item was deleted and not on first page
      if (productProps.products.length === 1 && productProps.page > 1) {
        productProps.setPage(productProps.page - 1);
      }
    } catch (err) {
      alert(err.message || "Failed to delete product");
    }
  };



  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">All Products</h1>
      <ProductsList {...productProps}  onDelete={handleDelete} />
    </div>
  )
}

export default ProductListPage