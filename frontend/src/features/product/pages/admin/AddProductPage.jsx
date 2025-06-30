import React from 'react'
// import useAddProduct from '../../hooks/admin/useAddProduct';
 import useProductForm from '../../hooks/admin/useProductForm';
import AddProductForm from '../../components/admin/AddProductForm';

const AddProductPage = () => {
    // const formProps = useAddProduct()
    const productForm = useProductForm();
  return (
    <div>
        {/* <h2>Add Product</h2> */}
        {/* <AddProductForm {...formProps}/> */}
        <AddProductForm {...productForm} handleSubmit={(e) => productForm.handleSubmit(e)} />
    </div>
  )
}

export default AddProductPage