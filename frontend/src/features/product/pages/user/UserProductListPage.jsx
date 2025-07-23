import React, { useEffect} from 'react';
import useProducts from '../../hooks/user/useProducts';
import {useSearchParams } from "react-router-dom";

import ProductsList from '../../components/user/ProductsList';



const UserProductListPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl   = searchParams.get("category") || "";
  
    const productProps = useProducts({ initialCategory: categoryFromUrl });
    useEffect(() => {
    productProps.setCategory(categoryFromUrl);
    productProps.setPage(1); // reset page on category change
  }, [categoryFromUrl]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold mb-6 text-indigo-700
       tracking-wide drop-shadow-md text-center">
  {categoryFromUrl ? `${categoryFromUrl} Products` : "All Products"}
</h1>

      <ProductsList {...productProps}  hideCategoryFilter={!!categoryFromUrl}/>
    </div>
  )
}

export default UserProductListPage;