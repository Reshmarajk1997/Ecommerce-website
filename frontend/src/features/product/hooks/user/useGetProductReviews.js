import {useEffect, useState} from 'react';
import { getAllReviews } from "../../services/user/productsServices";

export const useGetProductReviews = (productId) =>{
    const [reviews,setReviews] = useState([]);
    const [loadingReviews,setLoadingReviews] = useState(false);
    const [errorReviews, setErrorReviews] = useState(null);

    const fetchReviews  = async()=>{
       try {
         setLoadingReviews(true);
      setErrorReviews(null);

      const data = await getAllReviews(productId);
      setReviews(data);
       } catch (error) {
        setErrorReviews(error.message);
       }finally {
      setLoadingReviews(false);
    }
    }

    useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

   return {
    reviews,
    loadingReviews,
    errorReviews,
    refetchReviews: fetchReviews, // useful after submitting a new review
  };
}



