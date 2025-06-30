import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
// import AddProductPage from '../../product/pages/admin/AddProductPage'

export const AdminPage = () => {
  const { user, isInitialized } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialized) {
      if (!user) {
        // No user - redirect to login or homepage
        navigate("/login", { replace: true });
      } else if (!user.isAdmin) {
        // Logged in but not admin
        navigate("/", { replace: true });
      }
    }
  }, [user, isInitialized, navigate]);

  if (!isInitialized) return null; // or loading spinner

  if (!user || !user.isAdmin) return null;

  const handleAddProductClick = () => {
    navigate("/admin/add-product");
  };

   const handleViewProductsClick = () => {
    navigate('/admin/products');
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Page</h1>
      <div className="flex gap-4">
        <button
          onClick={handleAddProductClick}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Product
        </button>

        <button
          onClick={handleViewProductsClick}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          View Products
        </button>
      </div>
    </div>
  );
};
