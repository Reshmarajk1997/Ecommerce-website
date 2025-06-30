import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // if using react-router
import { fetchProductById } from '../../services/admin/productServices'; // create this function
import useProductForm from '../../hooks/admin/useProductForm';
import AddProductForm from '../../components/admin/AddProductForm';

const EditProductPage = () => {
     console.log("EditProductPage mounted"); 
  const { id } = useParams(); // product ID from route like /edit-product/:id
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    console.log("useEffect called");
    const getProduct = async () => {
         console.log("Fetching product with id:", id);
      const data = await fetchProductById(id);
       console.log("Fetched product data for edit:", data);
      setInitialData(data.product);
    };
    getProduct();
  }, [id]);

  const productForm = useProductForm(initialData); // prefill form with product data

  if (!initialData) return <div>Loading...</div>;

  return (
    <AddProductForm
      {...productForm}
      handleSubmit={(e) => productForm.handleSubmit(e, id)}
      isEdit={true}
    />
  );
};

export default EditProductPage;
