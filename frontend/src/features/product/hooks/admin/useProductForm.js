import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import {
  addProduct,
  updateProductById,
  checkProductExists,
} from "../../services/admin/productServices";



const useProductForm = (initialData = null) => {
  const navigate = useNavigate()
  
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
    variations: [{ storage: "", stock: "", price: "", discountPercentage: "" ,colorName: ""}],
  });

  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  const [colorImgFiles, setColorImgFiles] = useState([]);
  const [colorImgPreview, setColorImgPreview] = useState([]);

  const [productExists, setProductExists] = useState(false);



  const debouncedCheck = useCallback(
    debounce(async (name, brand) => {
      try {
        const res = await checkProductExists(name, brand);
        setProductExists(res.exists);
      } catch (err) {
        console.error("Error checking product existence:", err);
        setProductExists(false);
      }
    }, 600), // 600ms delay
    []
  );

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        colors:
          Array.isArray(initialData.colors) && initialData.colors.length > 0
            ? initialData.colors
            : [{ colorName: "", imgUrl: "" }],
      

        variations:
          Array.isArray(initialData.variations) &&
          initialData.variations.length > 0
            ? initialData.variations.map(v => ({
            _id: v._id,      // Keep _id for existing variations
            storage: v.storage,
            stock: v.stock,
            price: v.price,
            discountPercentage: v.discountPercentage,
            colorName: v.colorName || "",
          }))
            : [{ storage: "", stock: "", price: "", discountPercentage: "",colorName: "", }],
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

  useEffect(() => {
    const name = form?.name?.trim?.() || "";
    const brand = form?.brand?.trim?.() || "";

    if (name && brand) {
      if (!initialData?._id) {
        debouncedCheck(name, brand);
      }
    }
  }, [form.name, form.brand, initialData?._id, debouncedCheck]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleColorChange = (index, e) => {
    const updated = [...form.colors];
    updated[index][e.target.name] = e.target.value;
    setForm({ ...form, colors: updated });
  };

  const handleVariationChange = (index, e) => {
    const updated = [...form.variations];
    updated[index][e.target.name] = e.target.value;
    setForm({ ...form, variations: updated });
  };

  const addColor = () => {
    setForm({
      ...form,
      colors: [...form.colors, { colorName: "", imgUrl: "" }],
    });
    setColorImgFiles([...colorImgFiles, null]);
    setColorImgPreview([...colorImgPreview, null]);
  };

  const addVariation = () => {
    setForm({
      ...form,
      variations: [
        ...form.variations,
        { storage: "", stock: "", price: "", discountPercentage: "",colorName: "" },
      ],
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

  const removeVariation = (index) => {
    const updated = [...form.variations];
    updated.splice(index, 1);
    setForm({ ...form, variations: updated });
  };

  const resetForm = () => {
    if (initialData) {
      setForm(initialData);
      setImgPreview(initialData.imgUrl || null);
      setColorImgFiles(
        initialData.colors ? initialData.colors.map(() => null) : []
      );
      setColorImgPreview(
        initialData.colors ? initialData.colors.map((c) => c.imgUrl) : []
      );
    } else {
      setForm({
        name: "",
        description: "",
        brand: "",
        operatingSystem: "",
        screenSize: "",

        imgUrl: "",
        category: "",
        colors: [{ colorName: "", imgUrl: "" }],

        variations: [
          { storage: "", stock: "", price: "", discountPercentage: "",colorName: "", },
        ],
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
      alert(
        "Cannot submit. A product with this name and brand already exists."
      );
      return;
    }

    try {
      const formatted = {
        ...form,
        price: Number(form.price),
        discountPercentage: Number(form.discountPercentage),
        priceAfterDiscount: Number(form.priceAfterDiscount),

        variations: form.variations.map((v) => {
          const price = Number(v.price);
          const discount = Number(v.discountPercentage);
          const stock = Number(v.stock);
          return {
            _id: v._id,
            colorName: v.colorName.trim().toLowerCase(), 
            storage: v.storage.trim(),
            stock,
            price,
            discountPercentage: discount,
            priceAfterDiscount: +(price - (price * discount) / 100).toFixed(2),
          };
        }),
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
        navigate('/admin/products')
      } else {
        await addProduct(formData);
        alert("Product added successfully!");
        resetForm();
      }
    } catch (err) {

      console.error("Submit error:", err);

  let message = "Failed to submit product";

  if (err.response) {
    // ✅ Log to debug
    console.error("Response data:", err.response.data);

    if (err.response.data?.message) {
      message = err.response.data.message;
    } else if (err.response.status === 409) {
      message = "Product already exists.";
    }
  }

  alert(`Error: ${message}`);
    }
  };

  return {
    form,
    handleChange,
    handleColorChange,

    addColor,

    handleSubmit,
    handleFileChange,
    handleColorFileChange,
    imgPreview,
    colorImgPreview,
    removeColor,

    resetForm,
    productExists,
    handleVariationChange,
    addVariation,
    removeVariation,
  };
};

export default useProductForm;
