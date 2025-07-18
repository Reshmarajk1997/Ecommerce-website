import React from 'react';
import {useProductOverview} from '../../hooks/user/useProductOverview';
import ProductOverview from '../../components/user/ProductOverview';

const ProductOverviewPage = () => {
  const {
    product,
    selectedVariation,
    setSelectedVariation,
    currentImage,
    setCurrentImage,
    loading,
    error,
  } = useProductOverview();

  if (loading) return <div className="p-10 text-gray-600">Loading product...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;
  if (!product) return <div className="p-10">Product not found</div>;

  return (
    <ProductOverview
      product={product}
      selectedVariation={selectedVariation}
      setSelectedVariation={setSelectedVariation}
      currentImage={currentImage}
      setCurrentImage={setCurrentImage}
    />
  );
};

export default ProductOverviewPage;
