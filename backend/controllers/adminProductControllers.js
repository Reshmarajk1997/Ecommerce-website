import Product from "../models/Product.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import { json } from "express";
import { buildProductQuery } from "../utils/buildProductQuery.js";

//add products admin only

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      operatingSystem,
      screenSize,
      category,
      colors,
      variations,
    } = JSON.parse(req.body.product);

    console.log("req.body in backennd is ", req.body);

    if (
      !name ||
      !description ||
      !brand ||
      !category ||
      !operatingSystem ||
      !screenSize ||
      !colors ||
      !Array.isArray(colors) ||
      !variations ||
      !Array.isArray(variations)
    ) {
      return res.status(400).json({
        message:
          "All fields are required and colors, storageVariants must be arrays.",
      });
    }

    const trimmedName = name.trim().toLowerCase();
    const trimmedBrand = brand.trim().toLowerCase();
    const trimmedDescription = description.trim();
    const trimmedCategory = category.trim().toLowerCase();
    const trimmedOperatingSystem = operatingSystem.trim().toLowerCase();
  

    const existingProduct = await Product.findOne({
      name: { $regex: `^${trimmedName}$`, $options: "i" },
      brand: { $regex: `^${trimmedBrand}$`, $options: "i" },
    });

    if (existingProduct) {
      return res.status(409).json({
        message: "A product with the same name and brand already exists.",
        productId: existingProduct._id,
      });
    }

    if (!["android", "ios", "others"].includes(trimmedOperatingSystem)) {
      return res.status(400).json({
        message: "Operating system must be 'Android', 'iOS' or 'Other'.",
      });
    }

    if (!["smartphone", "tablet"].includes(trimmedCategory)) {
      return res.status(400).json({
        message: "Operating system must be 'smartphone' or 'tablet'.",
      });
    }


    const trimmedScreenSize = Number(screenSize);
if (isNaN(trimmedScreenSize) || trimmedScreenSize <= 0) {
  return res.status(400).json({ message: "Screen size must be a positive number." });
}


    let imgUrl = "";
    if (req.files?.mainImage?.[0]) {
      imgUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "products/main" },
          (err, result) => {
            if (err) throw err;
            resolve(result.secure_url);
          }
        );

        uploadStream.end(req.files.mainImage[0].buffer);
      });
    } else {
      return res
        .status(400)
        .json({ message: "Main product image is required." });
    }


    const seenColorNames = new Set();

colors.forEach((c, index) => {
  const cleanColor = c.colorName?.trim().toLowerCase();

  if (!cleanColor) {
    throw new Error(`Color at index ${index} must have a valid colorName`);
  }

  if (seenColorNames.has(cleanColor)) {
    throw new Error(`Duplicate color "${c.colorName}" found in colors array at index ${index}`);
  }

  seenColorNames.add(cleanColor);
});


// Check for extra color images that don't match any color index
const colorImageKeys = Object.keys(req.files).filter((key) => key.startsWith("colorImage_"));
const maxColorIndex = colors.length - 1;

for (const key of colorImageKeys) {
  const indexStr = key.split("_")[1];
  const index = parseInt(indexStr, 10);

  if (isNaN(index) || index > maxColorIndex) {
    return res.status(400).json({
      message: `Unexpected image file '${key}' found which does not correspond to any color.`,
    });
  }
}

    const updatedColors = await Promise.all(
      colors.map(async (color, index) => {
        if (!color.colorName) {
          throw new Error("Each color must have a valid colorName.");
        }

        const fileKey = `colorImage_${index}`;
        const file = req.files[fileKey]?.[0];

        if (!file) {
          throw new Error(`Missing image for color ${color.colorName}`);
        }

        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "products/colors" }, (err, res) => {
              if (err) reject(err);
              else resolve(res.secure_url);
            })
            .end(file.buffer);
        });

        return {
          ...color,
          imgUrl: result,
        };
      })
    );

    const allowedColorNames  = colors.map((c)=> c.colorName.trim().toLowerCase());
    const variationKeySet = new Set();

    const validatedVariations = variations.map((v,idx) => {



      const colorName = v.colorName?.trim();
       const storage = v.storage?.trim();
      const price = Number(v.price);
      const discount = Number(v.discountPercentage);
      const stock = Number(v.stock);

      if (!colorName ||!storage || isNaN(price) || isNaN(discount) || isNaN(stock)) {
        throw new Error(`Invalid variation at index ${idx}: missing or invalid fields.`);
      }

      if (price <= 0) {
  throw new Error(`Price for variation at index ${idx} must be greater than 0.`);
}


      if (discount < 0 || discount > 100) {
        throw new Error(`Discount for variation at index ${idx} must be between 0 and 100.`)
      }
      if (stock <=0 ) {
        throw new Error(`stock for variation at index ${idx} must be 0 or greater than 0`)
      }

        if (!allowedColorNames.includes(colorName.toLowerCase())) {
    throw new Error(`Variation at index ${idx} uses color "${colorName}" which is not in the main colors list.`);
  }

    const key = `${colorName.toLowerCase()}-${storage.toLowerCase()}`;
  if (variationKeySet.has(key)) {
    throw new Error(`Duplicate variation: ${storage} for color ${colorName} at index ${idx}.`);
  }
  variationKeySet.add(key);

      return {
        colorName,
        storage,
        stock,
        price,
        discountPercentage: discount,
        priceAfterDiscount: +(price - (price * discount) / 100).toFixed(2),
      };
    });

//           const usedColors = new Set(validatedVariations.map(v => v.colorName.trim().toLowerCase()));
// allowedColorNames.forEach((color, index) => {
//   if (!usedColors.has(color)) {
//     throw new Error(`Color "${colors[index].colorName}" in 'colors' array is not used in any variation.`);
//   }
// });

    const minPriceAfterDiscount = Math.min(
      ...validatedVariations.map((v) => v.priceAfterDiscount)
    );

    const maxDiscountPercentage = Math.max(
      ...validatedVariations.map((v) => v.discountPercentage)
    );

    const totalStock = validatedVariations.reduce((sum, v) => sum + v.stock, 0);

    const newProduct = new Product({
      name: trimmedName,
      brand: trimmedBrand,
      description:trimmedDescription,
      category:trimmedCategory,
      imgUrl,
      operatingSystem:trimmedOperatingSystem,
      screenSize:trimmedScreenSize,
      colors: updatedColors,
      variations: validatedVariations,
      minPriceAfterDiscount,
      maxDiscountPercentage,
      totalStock,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

const checkProductExists = async (req, res) => {
  try {
    const name = req.query.name?.trim();
    const brand = req.query.brand?.trim();

    if (!name || !brand) {
      return res.status(400).json({
        message: "Name, brand are required",
      });
    }

    const existingProduct = await Product.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
      brand: { $regex: `^${brand}$`, $options: "i" },
    });

    if (existingProduct) {
      return res.status(200).json({
        exists: true,
        message: "A product with the same name and brand already exists.",
        productId: existingProduct._id,
      });
    }

    res.json({ exists: false });
  } catch (err) {
    console.error("Error checking product:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

//get all product

const getAllProducts = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page)) || 1;
    const limit = Math.max(1, parseInt(req.query.limit)) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order?.toLowerCase() === "desc" ? -1 : 1;

    const search = req.query.search || "";
    const category = req.query.category || "";

    const query = buildProductQuery({ search, category });

    query.variations = { $exists: true, $ne: [] };

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
    .collation({locale:"en",strength:2})
      .sort({ [sortBy]: order })
      .skip((page - 1) * limit)
      .limit(limit);

    console.log("sortBy:", sortBy, "order:", order);

    res.json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getAllUsers = async(req,res)=>{
  try {
    const page = Math.max(1, parseInt(req.query.page)) || 1;
    const limit = Math.max(1, parseInt(req.query.limit)) || 10;

    const total = await User.countDocuments();


    const users = await User.find()
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit);

      res.json({
        success: true,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        users,
      });

    
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    console.log("productid need to be deleted ", productId);

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("product delete found", product);

    await Product.findByIdAndDelete(productId);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    console.log("productid need to be edited ", productId);

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("existing product is", existingProduct);

    const { description, colors, variations } = JSON.parse(req.body.product);

    if (
      !description ||
      !colors ||
      !Array.isArray(colors) ||
      !variations ||
      !Array.isArray(variations)
    ) {
      return res.status(400).json({
        message:
          "Description, colors, and variations are required and must be arrays.",
      });
    }

    let imgUrl = existingProduct.imgUrl;

    if (req.files?.mainImage?.[0]) {
      imgUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "products/main" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result.secure_url);
          }
        );
        uploadStream.end(req.files.mainImage[0].buffer);
      });
    }

    const updatedColors = await Promise.all(
      colors.map(async (color, index) => {
        if (!color.colorName) {
          throw new Error("Each color must have a valid colorName.");
        }

        const isDuplicate = existingProduct.colors.find(
          (c) =>
            c.colorName.toLowerCase() === color.colorName.toLowerCase() &&
            (!color._id || c._id.toString() !== color._id)
        );
        if (isDuplicate) {
          throw new Error(`Color "${color.colorName}" already exists.`);
        }

        const fileKey = `colorImage_${index}`;
        const file = req.files[fileKey]?.[0];

        if (file) {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream({ folder: "products/colors" }, (err, res) => {
                if (err) reject(err);
                else resolve(res.secure_url);
              })
              .end(file.buffer);
          });
          return {
            ...color,
            imgUrl: result,
          };
        } else {
          const existingColor = existingProduct.colors.find(
            (c) => c.colorName === color.colorName
          );

          if (!existingColor) {
  throw new Error(`Image is required for new color "${color.colorName}".`);
}


          return {
            ...color,
            imgUrl:existingColor.imgUrl ,
          };
        }
      })
    );

   



    const existingVariations = existingProduct.variations;

    // 1. Convert frontend variations to map
    const incomingMap = new Map();
    const updatedVariations = [];

    // Cross-validation: ensure every variation.colorName exists in updatedColors
const validColorNamesSet = new Set(
  updatedColors.map((c) => c.colorName.trim().toLowerCase())
);

for (let v of variations) {
  const colorName = v.colorName?.trim().toLowerCase();
  if (!validColorNamesSet.has(colorName)) {
    throw new Error(
      `Variation color "${v.colorName}" is not listed in the main colors array.`
    );
  }
}


    for (let v of variations) {
      const storage = v.storage?.trim().toLowerCase();
       const colorName = v.colorName?.trim().toLowerCase();

      // if (!colorName ||!storage || isNaN(v.price) || isNaN(v.discountPercentage) || isNaN(v.stock)) {
      //   throw new Error("Each variation must have valid colorName, storage, price, discount, and stock.");
      // }

      if (
  !colorName || 
  !storage || 
  typeof v.price !== "number" || 
  typeof v.discountPercentage !== "number" || 
  typeof v.stock !== "number" || 
  v.price <= 0 || 
  v.stock <= 0
) {
  throw new Error("Each variation must have valid colorName, storage, and positive numeric price, discount, and stock.");
}


      if (v.discountPercentage < 0 || v.discountPercentage > 100) {
        throw new Error("Discount percentage must be between 0 and 100.");
      }

      const priceAfterDiscount = +(v.price - (v.price * v.discountPercentage) / 100).toFixed(2);

      incomingMap.set(v._id ?? null, {
        _id: v._id,
        colorName: v.colorName.trim(),
        storage: v.storage.trim(),
        price: v.price,
        stock: v.stock,
        discountPercentage: v.discountPercentage,
        priceAfterDiscount,
      });
    }

    // 2. Build the final variations array:
    for (let v of existingVariations) {
      const match = [...incomingMap.values()].find(
        (iv) => iv._id?.toString() === v._id.toString()
      );

      if (match) {
        // updated variation
        updatedVariations.push({ ...match });
        incomingMap.delete(match._id);
      }
    }

    // 3. Add new variations (with no _id)
    const newVariations = [...incomingMap.values()].filter((v) => !v._id);
    for (let v of newVariations) {
      // avoid duplicate storage in updated list
      if (
        updatedVariations.some((ex) => ex.storage.toLowerCase() === v.storage.toLowerCase()
      &&
      ex.colorName.toLowerCase() === v.colorName.toLowerCase())
      ) {
        throw new Error(`Variation with color "${v.colorName}" and storage "${v.storage}" already exists.`);
      }

      updatedVariations.push(v);
    }

    // 4. Update product details
    const allVariations = updatedVariations;

    const minPriceAfterDiscount = Math.min(...allVariations.map((v) => v.priceAfterDiscount));
    const maxDiscountPercentage = Math.max(...allVariations.map((v) => v.discountPercentage));
    const totalStock = allVariations.reduce((sum, v) => sum + v.stock, 0);


    existingProduct.description = description;
    existingProduct.imgUrl = imgUrl;
    existingProduct.colors = updatedColors;
    existingProduct.variations = allVariations;
    existingProduct.minPriceAfterDiscount = minPriceAfterDiscount;
    existingProduct.maxDiscountPercentage = maxDiscountPercentage;
    existingProduct.totalStock = totalStock;

    await existingProduct.save();

    res.json({
      message: "Product updated successfully",
      product: existingProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};




export {
  addProduct,
  checkProductExists,
  getAllProducts,
  deleteProductById,
  updateProductById,
  getProductById,
  getAllUsers
};
