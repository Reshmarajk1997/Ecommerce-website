import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from "../../services/user/productsServices";



export const useProductOverview  = ()=>{
    const {id} = useParams();
    const [product, setProduct] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


   const loadProduct = async()=>{
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
        }finally{
            setLoading(false)
        }
    }

  useEffect(()=>{

    loadProduct()
  },[id])

  return{
    product,
    setProduct,
    selectedVariation,
    setSelectedVariation,
    currentImage,
    setCurrentImage,
    loading,
    error,
    refetchProduct: loadProduct,
  }
}