import Product from "../models/Product.js";
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
      price,
      discountPercentage,
      priceAfterDiscount,
      category,
      colors,
      storageVariants,
    } = JSON.parse(req.body.product);

    console.log("req.body in backennd is ", req.body);

    const existingProduct = await Product.findOne({
      name: { $regex: `^${name.trim()}$`, $options: "i" },
      brand: { $regex: `^${brand.trim()}$`, $options: "i" },
    });

    if (existingProduct) {
      return res.status(409).json({
        message: "A product with this name and brand already exists.",
        productId: existingProduct._id,
      });
    }

    if (
      !name ||
      !description ||
      !brand ||
      !category ||
      !operatingSystem ||
      !screenSize ||
      !price == null ||
      !discountPercentage == null ||
      !priceAfterDiscount == null ||
      !colors ||
      !Array.isArray(colors) ||
      !storageVariants ||
      !Array.isArray(storageVariants)
    ) {
      return res.status(400).json({
        message:
          "All fields are required and colors, storageVariants must be arrays.",
      });
    }

    if (!["Android", "iOS", "Others"].includes(operatingSystem)) {
      return res.status(400).json({
        message: "Operating system must be 'Android', 'iOS' or 'Other'.",
      });
    }

    if (!["smartphone", "tablet"].includes(category)) {
      return res.status(400).json({
        message: "Operating system must be 'smartphone' or 'tablet'.",
      });
    }

    if (discountPercentage < 0 || discountPercentage > 100) {
      return res.status(400).json({
        message: "Discount percentage must be between 0 and 100.",
      });
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

    const validStorage = storageVariants.map((s) => {
      const stockNumber = Number(s.stock);
      if (!s.storage || isNaN(stockNumber) || stockNumber < 0) {
        throw new Error(
          "Each storage variant must have a valid storage string and non-negative stock."
        );
      }
      return { ...s, stock: stockNumber };
    });

    const newProduct = new Product({
      name,
      brand,
      description,
      price,
      category,
      discountPercentage,
      priceAfterDiscount,
      imgUrl,
      operatingSystem,
      screenSize,
      colors: updatedColors,
      storageVariants: validStorage,
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
    const { name, brand } = req.query;

    if (!name || !brand) {
      return res.status(400).json({ message: "Name and brand are required" });
    }

    const existing = await Product.findOne({
      name: { $regex: `^${name.trim()}$`, $options: "i" },
      brand: { $regex: `^${brand.trim()}$`, $options: "i" },
    });

    if (existing) {
      return res.json({ exists: true, productId: existing._id });
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

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
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

    const {
      name,
      description,
      brand,
      operatingSystem,
      screenSize,
      price,
      discountPercentage,
      priceAfterDiscount,
      category,
      colors,
      storageVariants,
    } = JSON.parse(req.body.product);

    if (
      !name ||
      !description ||
      !brand ||
      !category ||
      !operatingSystem ||
      !screenSize ||
      price == null ||
      discountPercentage == null ||
      priceAfterDiscount == null ||
      !colors ||
      !Array.isArray(colors) ||
      !storageVariants ||
      !Array.isArray(storageVariants)
    ) {
      return res.status(400).json({
        message:
          "All fields are required and colors, storageVariants must be arrays.",
      });
    }

    if (!["Android", "iOS", "Others"].includes(operatingSystem)) {
      return res.status(400).json({
        message: "Operating system must be 'Android', 'iOS' or 'Others'.",
      });
    }

    if (!["smartphone", "tablet"].includes(category)) {
      return res.status(400).json({
        message: "Category must be 'smartphone' or 'tablet'.",
      });
    }

    if (discountPercentage < 0 || discountPercentage > 100) {
      return res.status(400).json({
        message: "Discount percentage must be between 0 and 100.",
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

          return {
            ...color,
            imgUrl: existingColor ? existingColor.imgUrl : "",
          };
        }
      })
    );

    const validStorage = storageVariants.map((s) => {
      const stockNumber = Number(s.stock);
      if (!s.storage || isNaN(stockNumber) || stockNumber < 0) {
        throw new Error(
          "Each storage variant must have a valid storage string and non-negative stock."
        );
      }
      return { ...s, stock: stockNumber };
    });

    existingProduct.name = name;
    existingProduct.brand = brand;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.category = category;
    existingProduct.discountPercentage = discountPercentage;
    existingProduct.priceAfterDiscount = priceAfterDiscount;
    existingProduct.imgUrl = imgUrl;
    existingProduct.operatingSystem = operatingSystem;
    existingProduct.screenSize = screenSize;
    existingProduct.colors = updatedColors;
    existingProduct.storageVariants = validStorage;

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
};
