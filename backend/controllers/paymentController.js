import Stripe from "stripe";
// import dotnev from 'dotenv';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
import Order from "../models/Order.js";

const createCheckoutSession  = async (req,res)=>{
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ user: userId });
   
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

     let subTotal = 0;

     const line_items = await Promise.all(
        cart.items.map(async(item)=>{
            const product = await Product.findById(item.product);
        if (!product) return null;

        const variation = product.variations.find(
          (v) =>
            v.storage === item.storage &&
            v.colorName.toLowerCase() === item.colorName.toLowerCase()
        );

        if (!variation) return null;
        if (variation.stock < item.quantity) return null;

        const itemTotal = item.priceAfterDiscount * item.quantity;
        subTotal += itemTotal;

        return {
          price_data: {
            currency: "aed",
            product_data: {
              name: `${product.name} - ${variation.storage} - ${variation.colorName}`,
              images: [product.imgUrl],
            },
            unit_amount: Math.round(item.priceAfterDiscount * 100), // cents
          },
          quantity: item.quantity,
        };

        })
     )

     const filteredItems = line_items.filter(Boolean);

    if (filteredItems.length === 0) {
      return res.status(400).json({ message: "No valid items in cart" });
    }

     const shipping = 5;
    const tax = +(subTotal * 0.084).toFixed(2);

     filteredItems.push({
      price_data: {
        currency: "aed",
        product_data: {
          name: "Shipping",
        },
        unit_amount: Math.round(shipping * 100),
      },
      quantity: 1,
    });

    filteredItems.push({
      price_data: {
        currency: "aed",
        product_data: {
          name: "Tax (8.4%)",
        },
        unit_amount: Math.round(tax * 100),
      },
      quantity: 1,
    });

    const session  = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:filteredItems,
        mode:"payment",
        customer_email:req.user.email,
        success_url:`${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    })

    res.json({ id: session.id });
    } catch (err) {
        console.error("Stripe error:", err);
    res.status(500).json({ error: "Could not create Stripe session" });
    }
}


 const stripeWebhookHandler = async (req, res) => {
   console.log("Webhook received");
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("Stripe event:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // Find user by email
      console.log("Looking for user with email:", session.customer_email);
      const user = await User.findOne({ email: session.customer_email });
      if (!user) {
        console.log("User not found");
        return res.status(404).send("User not found");
      }
      console.log("User found:", user._id);

      // Get user cart
      const cart = await Cart.findOne({ user: user._id });
      if (!cart) {
        console.log("Cart not found for user", user._id);
        return res.status(400).send("Cart not found");
      }
      console.log("Cart found with", cart.items.length, "items");


      // Prepare order items
      const orderItems = [];

      for (const item of cart.items) {
        const product = await Product.findById(item.product);
        if (!product) {
          console.log("Product not found for item:", item.product);
          continue;
        }

        const variation = product.variations.find(
          (v) =>
            v.storage === item.storage &&
            v.colorName.toLowerCase() === item.colorName.toLowerCase()
        );
        if (!variation) {
          console.log("Variation not found for item:", item.product);
          continue;
        }

        console.log(`Reducing stock for product ${product._id} variation ${variation.colorName}, current stock: ${variation.stock}, quantity ordered: ${item.quantity}`);

        // Reduce stock
        if (variation.stock >= item.quantity) {
          variation.stock -= item.quantity;
        } else {
          // Handle out of stock case if needed
          console.log(`Insufficient stock for product ${product._id} variation ${variation.colorName}`);
        }

        await product.save();

        orderItems.push({
          product: item.product,
          name: product.name,
          storage: item.storage,
          colorName: item.colorName,
          quantity: item.quantity,
          priceAfterDiscount: item.priceAfterDiscount,
          productImage: item.productImage,
        });
      }

      // Create order record
      const order = await Order.create({
        user: user._id,
        items: orderItems,
        totalAmount: session.amount_total / 100, // Stripe amount in cents
        currency: session.currency,
        paymentStatus: "Paid",
        createdAt: new Date(),
      });

      console.log("Order created with ID:", order._id);


      // Clear user's cart
      // await Cart.deleteOne({ user: user._id });

      await Cart.updateOne({ user: user._id }, { $set: { items: [] } });
      console.log("User cart cleared");


      console.log("Webhook processing completed successfully for session:", session.id);

      res.json({ received: true });
    } catch (err) {
      console.error("Webhook processing error:", err.message);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.json({ received: true }); // Return 200 for other events
  }
};



export {
    createCheckoutSession,
    stripeWebhookHandler
}