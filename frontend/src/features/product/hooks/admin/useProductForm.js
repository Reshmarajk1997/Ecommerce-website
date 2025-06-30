import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { addProduct, updateProductById, checkProductExists } from "../../services/admin/productServices";

// const debouncedCheck = debounce(async (name, brand, setProductExists,currentId) => {

//  try {
//     const response = await checkProductExists(name, brand,currentId);
//     if (response.exists) {
      
//       if (currentId && response.productId === currentId) {
//         setProductExists(false); 
//       } else {
//         alert("A product with this name and brand already exists.");
//         setProductExists(true);
//       }
//     } else {
//       setProductExists(false);
//     }
//   } catch (err) {
//     console.error("Error checking product existence:", err);
//   }
// }, 1000);


const debouncedCheck = debounce(async (name, brand, setProductExists) => {
  try {
    const res = await checkProductExists(name, brand);
    if (res.exists) {
      setProductExists(true);
    } else {
      setProductExists(false);
    }
  } catch (err) {
    console.error("Error checking product existence:", err);
    setProductExists(false);
  }
}, 1000);

// Inside useEffect, call debouncedCheck with current product id for edit mode:



const useProductForm = (initialData = null) => {
  // Initialize with empty form by default
  const [form, setForm] = useState({
    name: "",
    description: "",
    brand: "",
    operatingSystem: "",
    screenSize: "",
    price: "",
    discountPercentage: "",
    priceAfterDiscount: "",
    imgUrl: "",
    category: "",
    colors: [{ colorName: "", imgUrl: "" }],
    storageVariants: [{ storage: "", stock: "" }],
  });

  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  const [colorImgFiles, setColorImgFiles] = useState([]);
  const [colorImgPreview, setColorImgPreview] = useState([]);

  const [productExists, setProductExists] = useState(false);

  // Update form and previews whenever initialData changes (e.g. after fetch)
  // useEffect(() => {
  //   if (initialData) {
  //     setForm(initialData);
  //     setImgPreview(initialData.imgUrl || null);
  //     setColorImgFiles(initialData.colors ? initialData.colors.map(() => null) : []);
  //     setColorImgPreview(initialData.colors ? initialData.colors.map(c => c.imgUrl) : []);
  //   }
  // }, [initialData]);


  useEffect(() => {
  if (initialData) {
    setForm({
      ...initialData,
      colors: Array.isArray(initialData.colors) && initialData.colors.length > 0
        ? initialData.colors
        : [{ colorName: "", imgUrl: "" }],
      storageVariants: Array.isArray(initialData.storageVariants) && initialData.storageVariants.length > 0
        ? initialData.storageVariants
        : [{ storage: "", stock: "" }],
    });

    setImgPreview(initialData.imgUrl || null);
    setColorImgFiles(
      Array.isArray(initialData.colors)
        ? initialData.colors.map(() => null)
        : [null]
    );
    setColorImgPreview(
      Array.isArray(initialData.colors)
        ? initialData.colors.map((c) => c.imgUrl)
        : [null]
    );
  }
}, [initialData]);



// useEffect(() => {
//   if (form.name.trim() && form.brand.trim()) {
    
//     if (!initialData?._id) {
//       debouncedCheck(form.name.trim(), form.brand.trim(), setProductExists);
//     }
//   }
// }, [form.name, form.brand]);

useEffect(() => {
  const name = form?.name?.trim?.() || "";
  const brand = form?.brand?.trim?.() || "";

  if (name && brand) {
    // only check if it's **add mode**
    if (!initialData?._id) {
      debouncedCheck(name, brand, setProductExists);
    }
  }
}, [form.name, form.brand]);



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleColorChange = (index, e) => {
    const updated = [...form.colors];
    updated[index][e.target.name] = e.target.value;
    setForm({ ...form, colors: updated });
  };

  const handleStorageChange = (index, e) => {
    const updated = [...form.storageVariants];
    updated[index][e.target.name] = e.target.value;
    setForm({ ...form, storageVariants: updated });
  };

  const addColor = () => {
    setForm({
      ...form,
      colors: [...form.colors, { colorName: "", imgUrl: "" }],
    });
    setColorImgFiles([...colorImgFiles, null]);
    setColorImgPreview([...colorImgPreview, null]);
  };

  const addStorage = () => {
    setForm({
      ...form,
      storageVariants: [...form.storageVariants, { storage: "", stock: "" }],
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

  const handleColorFileChange = (index, e) => {
    const file = e.target.files[0];
    const updatedFiles = [...colorImgFiles];
    const updatedPreviews = [...colorImgPreview];

    updatedFiles[index] = file;
    updatedPreviews[index] = URL.createObjectURL(file);

    setColorImgFiles(updatedFiles);
    setColorImgPreview(updatedPreviews);
  };

  const removeColor = (index) => {
    const updatedColors = [...form.colors];
    updatedColors.splice(index, 1);
    setForm({ ...form, colors: updatedColors });

    const updatedColorFiles = [...colorImgFiles];
    updatedColorFiles.splice(index, 1);
    setColorImgFiles(updatedColorFiles);

    const updatedPreviews = [...colorImgPreview];
    updatedPreviews.splice(index, 1);
    setColorImgPreview(updatedPreviews);
  };

  const removeStorage = (index) => {
    const updatedStorage = [...form.storageVariants];
    updatedStorage.splice(index, 1);
    setForm({ ...form, storageVariants: updatedStorage });
  };

  const resetForm = () => {
    if (initialData) {
      setForm(initialData);
      setImgPreview(initialData.imgUrl || null);
      setColorImgFiles(initialData.colors ? initialData.colors.map(() => null) : []);
      setColorImgPreview(initialData.colors ? initialData.colors.map(c => c.imgUrl) : []);
    } else {
      setForm({
        name: "",
        description: "",
        brand: "",
        operatingSystem: "",
        screenSize: "",
        price: "",
        discountPercentage: "",
        priceAfterDiscount: "",
        imgUrl: "",
        category: "",
        colors: [{ colorName: "", imgUrl: "" }],
        storageVariants: [{ storage: "", stock: "" }],
      });
      setImgPreview(null);
      setColorImgFiles([]);
      setColorImgPreview([]);
    }
    setProductExists(false);
    setImgFile(null);
  };

  const handleSubmit = async (e, productId = null) => {
    e.preventDefault();

    if (productExists) {
      alert("Cannot submit. A product with this name and brand already exists.");
      return;
    }

    try {
      const formatted = {
        ...form,
        price: Number(form.price),
        discountPercentage: Number(form.discountPercentage),
        priceAfterDiscount: Number(form.priceAfterDiscount),
        storageVariants: form.storageVariants.map((s) => ({
          storage: s.storage,
          stock: Number(s.stock),
        })),
      };

      const formData = new FormData();
      formData.append("product", JSON.stringify(formatted));

      if (imgFile) {
        formData.append("mainImage", imgFile);
      }

      colorImgFiles.forEach((file, idx) => {
        if (file) {
          formData.append(`colorImage_${idx}`, file);
        }
      });

      if (productId) {
        await updateProductById(productId, formData);
        alert("Product updated successfully!");
      } else {
        await addProduct(formData);
        alert("Product added successfully!");
        resetForm();
      }
    } catch (err) {
      if (err.response?.status === 409) {
        alert(err.response.data.message || "Product already exists.");
      } else {
        alert(err.response?.data?.message || "Failed to submit product");
      }
    }
  };

  return {
    form,
    handleChange,
    handleColorChange,
    handleStorageChange,
    addColor,
    addStorage,
    handleSubmit,
    handleFileChange,
    handleColorFileChange,
    imgPreview,
    colorImgPreview,
    removeColor,
    removeStorage,
    resetForm,
    productExists
  };
};

export default useProductForm;
