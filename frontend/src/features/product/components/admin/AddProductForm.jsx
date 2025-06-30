


import React from "react";

const AddProductForm = ({
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
  isEdit = false,
  productExists,
  
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-2xl mx-auto p-6 bg-neutral-300 rounded-lg shadow-lg space-y-4 mt-4"
    >
      <h2 className="text-2xl font-semibold text-center text-violet-900">
        {isEdit ? "Edit Product" : "Add New Product"}
      </h2>

       {productExists && (
    <p className="text-red-600 font-semibold mt-2 text-center">
      ⚠️ A product with this name and brand already exists.
    </p>
  )}

      {/* Basic Fields */}
      {[
        { name: "name", placeholder: "Product Name" },
        { name: "description", placeholder: "Description" },
        { name: "brand", placeholder: "Brand" },
        { name: "operatingSystem", placeholder: "Operating System" },
        { name: "category", placeholder: "Category" },
        { name: "screenSize", placeholder: "Screen Size" },
        { name: "price", placeholder: "Price", type: "number" },
        {
          name: "discountPercentage",
          placeholder: "Discount %",
          type: "number",
        },
        {
          name: "priceAfterDiscount",
          placeholder: "Final Price",
          type: "number",
        },
      ].map((input) => (
        <input
          key={input.name}
          name={input.name}
          type={input.type || "text"}
          value={form[input.name]}
          onChange={handleChange}
          placeholder={input.placeholder}
          required={[
            "name",
            "description",
            "brand",
            "operatingSystem",
            "screenSize",
            "price",
            "imgUrl",
          ].includes(input.name)}
          disabled={
            isEdit &&
            ["name", "brand", "category", "operatingSystem"].includes(input.name)
          }
          className={`w-full p-3 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isEdit &&
            ["name", "brand", "category", "operatingSystem"].includes(input.name)
              ? "bg-gray-200 cursor-not-allowed"
              : ""
          }`}
        />
      ))}

      {/* {productExists && (
  <p className="text-red-600 font-semibold mt-1">
    ⚠️ A product with this name and brand already exists.
  </p>)} */}

      {/* Main Image */}
      <div>
        <label className="block font-medium text-violet-900 mb-1">
          Main Product Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        {imgPreview && (
          <div className="mt-2">
            <img
              src={imgPreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md border"
            />
          </div>
        )}
      </div>

      {/* Colors */}
      <div>
        <h4 className="text-lg font-semibold text-violet-900 border-b pb-1 mb-2">
          Colors
        </h4>
        {Array.isArray(form.colors) &&
          form.colors.map((c, idx) => (
            <div
              key={idx}
              className="grid md:grid-cols-2 gap-3 mb-2 items-center"
            >
              <input
                name="colorName"
                value={c.colorName}
                onChange={(e) => handleColorChange(idx, e)}
                placeholder="Color Name"
                className="p-2 border rounded-md"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleColorFileChange(idx, e)}
                className="p-2 border rounded-md"
              />
              <div className="flex flex-col items-center">
                {colorImgPreview?.[idx] && (
                  <img
                    src={colorImgPreview[idx]}
                    alt="Color Preview"
                    className="mt-2 w-20 h-20 object-cover rounded-md border"
                  />
                )}
                <button
                  type="button"
                  onClick={() => removeColor(idx)}
                  className="text-white text-sm rounded-md bg-red-500 hover:underline px-2 py-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addColor}
          className="mt-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          + Add Color
        </button>
      </div>

      {/* Storage Variants */}
      <div>
        <h4 className="text-lg font-semibold text-violet-900 border-b pb-1 mb-2 mt-4">
          Storage Variants
        </h4>
        {Array.isArray(form.storageVariants) &&
          form.storageVariants.map((s, idx) => (
            <div
              key={idx}
              className="grid md:grid-cols-2 gap-3 mb-2 items-center"
            >
              <input
                name="storage"
                value={s.storage}
                onChange={(e) => handleStorageChange(idx, e)}
                placeholder="Storage"
                className="p-2 border rounded-md"
              />
              <input
                name="stock"
                value={s.stock}
                onChange={(e) => handleStorageChange(idx, e)}
                placeholder="Stock"
                type="number"
                className="p-2 border rounded-md"
              />
              <button
                type="button"
                onClick={() => removeStorage(idx)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        <button
          type="button"
          onClick={addStorage}
          className="mt-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          + Add Storage
        </button>
      </div>

      {/* Buttons */}
      <button
        type="button"
        onClick={resetForm}
        className="w-full  bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md"
      >
        Reset Form
      </button>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md"
      >
        Submit Product
      </button>
    </form>
  );
};

export default AddProductForm;
