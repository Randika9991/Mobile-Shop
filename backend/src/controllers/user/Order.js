const Order = require("../../models/Order");

exports.addOrder = async (req, res) =>{
    try {
        const { userId, shippingInfo, items, totalAmount } = req.body;

        if (!userId || !shippingInfo || !items || items.length === 0) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        const newOrder = new Order({
            userId,
            shippingInfo,
            items,
            totalAmount,
            status: "Pending",
        });

        await newOrder.save();

        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Server error" });
    }
};


