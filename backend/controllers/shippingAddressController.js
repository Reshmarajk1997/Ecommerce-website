import User from "../models/User.js";


 const getShippingAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("shippingAddress");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.shippingAddress || {});
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch shipping address" });
  }
};

// PUT /api/users/address
 const updateShippingAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.shippingAddress = req.body; // Make sure frontend sends the correct shape
    await user.save();

    res.json({ message: "Address updated successfully", shippingAddress: user.shippingAddress });
  } catch (err) {
    res.status(500).json({ message: "Failed to update shipping address" });
  }
};

export {
    getShippingAddress,
    updateShippingAddress
}