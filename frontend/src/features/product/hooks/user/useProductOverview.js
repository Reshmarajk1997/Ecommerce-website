import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../services/user/productsServices";
import { addToCart } from "../../services/user/cartServices";
import { useNavigate } from "react-router-dom";

export const useProductOverview = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
  setQuantity(1); // Always reset to 1 on variation change
}, [selectedVariation]);


  const loadProduct = async () => {
    try {
      const res = await fetchProductById(id);
      const p = res.product;
      setProduct(p);

      if (p.variations && p.variations.length > 0) {
        setSelectedVariation(p.variations[0]);
        setCurrentImage(p.imgUrl);
      } else {
        setSelectedVariation(null);
        setCurrentImage(p.imgUrl);
      }
    } catch (err) {
      setError("Failed to load product.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);


  const handleAddToCart = async () => {
    if (!product || !selectedVariation) return alert("Please select a variation");

    try {
      await addToCart({
        productId: product._id,
        colorName: selectedVariation.colorName,
        storage: selectedVariation.storage,
        quantity,
      });

      alert("added to cart")

       navigate("/cart"); // Redirect on success
    } catch (error) {
      const message =
      error.response?.data?.message || "Something went wrong. Please try again.";
    console.error("Add to cart failed:", message);
    alert(`Failed to add item to cart: ${message}`);
    }
  };

  return {
    product,
    setProduct,
    selectedVariation,
    setSelectedVariation,
    currentImage,
    setCurrentImage,
    loading,
    error,
    quantity,
    setQuantity,
    refetchProduct: loadProduct,
    handleAddToCart,
  };
};
