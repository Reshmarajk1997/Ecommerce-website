import Product from "../models/Product.js";
import { buildProductQuery } from "../utils/buildProductQuery.js";



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

    const products = await Product.find(query)
      .collation({ locale: "en", strength: 2 })
      .sort({ [sortBy]: order });

    // Map each product to include only one defaultVariation (e.g., the first variation)
    const productCards = products.map((product) => {
      // Choose default variation (first one)
      const defaultVariation = product.variations[0];

      return {
        _id: product._id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        imgUrl: product.imgUrl,
        colorOptions: product.colors,
        operatingSystem: product.operatingSystem,
        screenSize: product.screenSize,
        description: product.description,
        defaultVariation, // <-- send this as the default variation info
        averageRating: product.averageRating,
        numReviews: product.numReviews,
        createdAt: product.createdAt,
        minPriceAfterDiscount: product.minPriceAfterDiscount,
        maxDiscountPercentage: product.maxDiscountPercentage,
        totalStock: product.totalStock,
      };
    });

    
    productCards.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (typeof aVal === "string") {
        return order === -1 ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
      } else {
        return order === -1 ? (bVal || 0) - (aVal || 0) : (aVal || 0) - (bVal || 0);
      }
    });

    // Pagination
    const total = productCards.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedCards = productCards.slice(startIndex, startIndex + limit);
    res.json({
      success: true,
      total,
      page,
      totalPages,
      products: paginatedCards,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export {
    getAllProducts,
}