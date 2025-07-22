import React, {useState} from 'react';
import useProducts from '../../hooks/user/useProducts';

import ProductsList from '../../components/user/ProductsList';



const UserProductListPage = () => {
  
    const productProps = useProducts();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold mb-6 text-indigo-700
       tracking-wide drop-shadow-md text-center">
  All Products
</h1>

      <ProductsList {...productProps} />
    </div>
  )
}

export default UserProductListPage;