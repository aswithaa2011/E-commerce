import Order from "../model/Order.js";

// POST /api/orders  (user protected — saves order after payment or COD)
export const placeOrder = async (req, res) => {
  try {
    const { items, totalPrice, totalItems, paymentMethod, paymentId, address } = req.body;

    const orderId = "GLO-" + Math.floor(100000 + Math.random() * 900000);

    const order = await Order.create({
      orderId,
      userEmail: req.user.email,
      items,
      totalPrice,
      totalItems,
      paymentMethod: paymentMethod || "COD",
      paymentId:     paymentId || null,
      address,
      status: "Processing",
    });

    return res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Place order error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/orders/my  (user protected)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.user.email }).sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/admin/orders  (admin protected)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/admin/orders/:id/status  (admin protected)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/admin/stats
export const getStats = async (req, res) => {
  try {
    const totalOrders  = await Order.countDocuments();
    const revenueAgg   = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }]);
    const totalRevenue = revenueAgg[0]?.total || 0;
    const byStatus     = await Order.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);
    return res.status(200).json({ totalOrders, totalRevenue, byStatus });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
