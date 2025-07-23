import Product from "../models/Product.js";
import { buildProductQuery } from "../utils/buildProductQuery.js";



const getAllProducts = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page)) || 1;
    const limit = Math.max(1, parseInt(req.query.limit)) || 10;
    const sortBy = req.query.sortBy || "name";
    const order = req.query.order?.toLowerCase() === "desc" ? -1 : 1;

    const search = req.query.search || "";
    const category = (req.query.category || "").trim();

     console.log("Incoming filters:", { search, category, page, limit, sortBy, order });

    const query = buildProductQuery({ search, category });

     console.log("MongoDB query before adding variations filter:", query);

    query.variations = { $exists: true, $ne: [] };

    const products = await Product.find(query)
      .collation({ locale: "en", strength: 2 })
      .sort({ [sortBy]: order });

      console.log(`Found ${products.length} products matching query.`);

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
        
      };
    });

   


 const variationFields = ["priceAfterDiscount", "discountPercentage", "stock"];

    productCards.sort((a, b) => {
      let aVal, bVal;

      if (variationFields.includes(sortBy)) {
        aVal = a.defaultVariation?.[sortBy] ?? 0;
        bVal = b.defaultVariation?.[sortBy] ?? 0;
      } else {
        aVal = a[sortBy] ?? "";
        bVal = b[sortBy] ?? "";
      }

      // Compare strings
      if (typeof aVal === "string" && typeof bVal === "string") {
        return order === -1 ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
      }

      // Compare numbers
      return order === -1 ? bVal - aVal : aVal - bVal;
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


const addReview = async(req,res)=>{
  const {rating,comment} = req.body;
  const {id} = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const alreadyReviewed = product.reviews.find(
      (r)=>r.user.toString() === req.user._id.toString()
    )
     if (alreadyReviewed) {
      return res.status(400).json({ message: "Product already reviewed" });
    }

    const review = {
      user: req.user._id,
      name: req.user.userName,
      rating: Number(rating),
      comment,
    }

    product.reviews.push(review);
     product.numReviews = product.reviews.length;
    product.averageRating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

       await product.save();

       const newReview  = product.reviews[product.reviews.length-1]


    res.status(201).json({ 
  message: "Review added successfully",
  //  review: {
  //       name: newReview.name,
  //       rating: newReview.rating,
  //       comment: newReview.comment,
  //       createdAt: newReview.createdAt, // this is auto-populated
  //     },
  review:newReview,
      averageRating: product.averageRating,
      numReviews: product.numReviews,          // send updated product with new reviews
});
  } catch (error) {
     console.error("Add review error:", error); 
    res.status(500).json({ message: "Server error" });
  }
}


const getProductReviews  = async(req,res)=>{
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate("reviews.user","name");
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product.reviews);
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
}

export {
    getAllProducts,
    getProductById,
    addReview,
    getProductReviews,
}