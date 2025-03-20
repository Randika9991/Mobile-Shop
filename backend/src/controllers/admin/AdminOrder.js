const Order = require("../../models/Order");

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("userId", "name email"); // Populate user details

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

