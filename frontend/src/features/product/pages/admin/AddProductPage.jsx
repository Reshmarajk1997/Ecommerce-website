import React from "react";

import useProductForm from "../../hooks/admin/useProductForm";
import AddProductForm from "../../components/admin/AddProductForm";

const AddProductPage = () => {
  const productForm = useProductForm();
  return (
    <div>
      <AddProductForm
        // {...productForm}
        // handleSubmit={(e) => productForm.handleSubmit(e)}

        {...productForm} 
      />
    </div>
  );
};

export default AddProductPage;
