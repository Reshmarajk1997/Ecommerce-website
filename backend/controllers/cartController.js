import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, colorName, storage, quantity } = req.body;

  try {

     if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const normalizedColor = colorName.trim().toLowerCase();

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const variation = product.variations.find(
      v => v.storage === storage && v.colorName.toLowerCase() === normalizedColor
    );
    if (!variation) return res.status(400).json({ message: "Color and storage combination not found" });
 const colorExists = product.colors.find(
      c => c.colorName.toLowerCase() === normalizedColor
    );
    if (!colorExists) return res.status(400).json({ message: "Color not found" });



    if (variation.stock < quantity) {
      return res.status(400).json({
        message: `Only ${variation.stock} item(s) available in stock for ${storage}`,
      });
    }

    

    const productImage = colorExists.imgUrl || product.imgUrl;


//     console.log("product:", product);
// console.log("colorExists:", colorExists);
// console.log("product.imgUrl:", product.imgUrl);
// console.log("productImage:", productImage);

let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // No cart yet, create new


      const productName = `${product.name} (${variation.storage})`;
const productImage = colorExists.imgUrl || product.imgUrl;
const priceAfterDiscount = variation.priceAfterDiscount;

cart = new Cart({
  user: userId,
  items: [{
    product: productId,
    productName,
    productImage,
    colorName: normalizedColor,
    storage,
    quantity,
    priceAfterDiscount,
  }],
});

    } else {
     
      const existingItem = cart.items.find(
        item =>
          item.product.toString() === productId &&
          item.colorName.toLowerCase() === normalizedColor &&
          item.storage === storage
      );

      if (existingItem) {
        const updatedQty = existingItem.quantity + quantity;

        if (updatedQty > variation.stock) {
          return res.status(400).json({
            message: `Only ${variation.stock} item(s) available. You already have ${existingItem.quantity} in your cart.`,
          });
        }

        existingItem.quantity = updatedQty; 
         existingItem.productName = `${product.name} (${variation.storage})`;
  existingItem.productImage = colorExists.imgUrl || product.imgUrl;
  existingItem.priceAfterDiscount = variation.priceAfterDiscount;

      } else {
       
        const productName = `${product.name} (${variation.storage})`;
  const productImage = colorExists.imgUrl || product.imgUrl;
  const priceAfterDiscount = variation.priceAfterDiscount;

  cart.items.push({
    product: productId,
    productName,
    productImage,
    colorName: normalizedColor,
    storage,
    quantity,
    priceAfterDiscount,
  });

      }
    }

    await cart.save();
    return res.status(200).json({ message: "Item added to cart", cart });

  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getCartItems  = async(req,res)=>{
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({user:userId});

    if(!cart || cart.items.length === 0){
      return res.status(200).json({ message: "Cart is empty" });

    }

    let subTotal = 0;

    const resolvedItems  = await Promise.all(
  cart.items.map(async (item) => {
    const product = await Product.findById(item.product);
    if (!product) return null;

    const variation = product.variations.find(
      (v) =>
        v.storage === item.storage &&
        v.colorName.toLowerCase() === item.colorName.toLowerCase()
    );


    const colorObj = product.colors.find(
      (c) => c.colorName.toLowerCase() === item.colorName.toLowerCase()
    );

    const stock = variation ? variation.stock : 0;
    const isInvalid = stock <= 0 || item.quantity > stock;
    const itemTotal = isInvalid ? 0 : item.priceAfterDiscount * item.quantity;
        if (!isInvalid) subTotal += itemTotal;
    // const itemTotal = item.priceAfterDiscount * item.quantity;
    // subTotal += itemTotal;

    return {
      ...item.toObject(),
      itemTotal,
      stock,
       image: colorObj?.imgUrl || null,
        productName: product.name,
        brand: product.brand,
        outOfStock: isInvalid,
    };
  })
);
const itemsWithTotals = resolvedItems.filter(Boolean);

    const shipping = 5;
    const tax = +(subTotal * 0.084).toFixed(2); // 8.4% tax, example
    const total = +(subTotal + shipping + tax).toFixed(2);

   return res.status(200).json({
      items: itemsWithTotals,
      subTotal,
      shipping,
      tax,
      total,
    });
  } catch (error) {
    console.error("Error getting cart items:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

const updateCartItemQuantity  = async(req,res)=>{
  const userId = req.user._id;
  const { productId, colorName, storage, quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    const cart = await Cart.findOne({user:userId});
    if(!cart) return res.status(404).json({message:"Cart not found"});

    console.log("Cart items:", cart.items);
console.log("Searching for:", { productId, colorName, storage });


    const item = cart.items.find(
      (i)=>
        i.product.toString() === productId &&
        i.colorName.toLowerCase() === colorName.toLowerCase() &&
        i.storage === storage
    )
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const variation = product.variations.find(
      (v)=>
        v.colorName.toLowerCase() === colorName.toLowerCase() &&
        v.storage === storage
    )
     if (!variation) {
      return res.status(404).json({ message: "Matching product variation not found" });
    }

     if (quantity > variation.stock) {
      return res.status(400).json({
        message: `Only ${variation.stock} items available in stock`,
      });
    }

    item.quantity = quantity;
    await cart.save();

      let subTotal = 0;

    const resolvedItems  = await Promise.all(
  cart.items.map(async (item) => {
    const product = await Product.findById(item.product);
    if (!product) return null;

    const variation = product.variations.find(
      (v) =>
        v.storage === item.storage &&
        v.colorName.toLowerCase() === item.colorName.toLowerCase()
    );


    const colorObj = product.colors.find(
      (c) => c.colorName.toLowerCase() === item.colorName.toLowerCase()
    );

    const stock = variation ? variation.stock : 0;
    const itemTotal = item.priceAfterDiscount * item.quantity;
    subTotal += itemTotal;

    return {
      ...item.toObject(),
      itemTotal,
      stock,
       image: colorObj?.imgUrl || null,
        productName: product.name,
        brand: product.brand,
    };
  })
);
const itemsWithTotals = resolvedItems.filter(Boolean);

    const shipping = 5;
    const tax = +(subTotal * 0.084).toFixed(2); // 8.4% tax, example
    const total = +(subTotal + shipping + tax).toFixed(2);

   return res.status(200).json({
      items: itemsWithTotals,
      subTotal,
      shipping,
      tax,
      total,
    });

    

  } catch (error) {
   console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Server error" });
  }
}


 const removeCartItem  = async(req,res)=>{
  const userId = req.user._id;
  const { productId, colorName, storage } = req.query;

  if (!productId || !colorName || !storage) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const initialLength  = cart.items.length;

    cart.items = cart.items.filter(
      (i)=>
        !(
          i.product.toString() === productId &&
          i.colorName.toLowerCase() === colorName.toLowerCase() &&
          i.storage === storage
        )
    )

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await cart.save();

      if (cart.items.length === 0) {
      return res.status(200).json({
        items: [],
        subTotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
        message: "Cart is now empty",
      });
    }


    let subTotal = 0;

    const resolvedItems  = await Promise.all(
  cart.items.map(async (item) => {
    const product = await Product.findById(item.product);
    if (!product) return null;

    const variation = product.variations.find(
      (v) =>
        v.storage === item.storage &&
        v.colorName.toLowerCase() === item.colorName.toLowerCase()
    );


    const colorObj = product.colors.find(
      (c) => c.colorName.toLowerCase() === item.colorName.toLowerCase()
    );

    const stock = variation ? variation.stock : 0;
    const itemTotal = item.priceAfterDiscount * item.quantity;
    subTotal += itemTotal;

    return {
      ...item.toObject(),
      itemTotal,
      stock,
       image: colorObj?.imgUrl || null,
        productName: product.name,
        brand: product.brand,
    };
  })
);
const itemsWithTotals = resolvedItems.filter(Boolean);

    const shipping = 5;
    const tax = +(subTotal * 0.084).toFixed(2); // 8.4% tax, example
    const total = +(subTotal + shipping + tax).toFixed(2);

   return res.status(200).json({
      items: itemsWithTotals,
      subTotal,
      shipping,
      tax,
      total,
    });

    
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export { 
  addToCart,
getCartItems,
updateCartItemQuantity,
removeCartItem
 };
