const AddToCart = require("../../models/AddToCart");
const Item = require("../../models/Item");

exports.addAddToCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.user.id;

        if (!userId || !itemId) {
            return res.status(400).json({ message: "User ID and Item ID are required" });
        }

        const existingAddToCart = await AddToCart.findOne({ userId, itemId });

        if (existingAddToCart) {
            return res.status(400).json({ message: "Item is already in favorites" });
        }

        const addToCart = new AddToCart({ userId, itemId });
        await addToCart.save();

        res.status(201).json({ message: "Item added to favorites successfully", AddToCart: addToCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFavoriteItemFindId = async (req, res) => {
    try {
        const { authId } = req.params;
        const {productId}  = req.query;
        const result = await AddToCart.findOne({ userId:authId, itemId: productId });
        res.status(200).json(!!result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.DeleteAddToCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const { authId } = req.body;

        if (!productId) {
            return res.status(400).json({ error: "productId is required" });
        }

        if (!authId) {
            return res.status(400).json({ error: "authId is required" });
        }
        const result = await AddToCart.findOneAndDelete({ userId:authId, itemId: productId });

        if (!result) {
            return res.status(404).json({ message: "AddToCart not found" });
        }

        res.status(200).json({ message: "AddToCart removed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllAddToCartOnly = async (req, res) => {
    try {
        const { authId } = req.params;
        const addToCart = await AddToCart.find({ userId:authId });

        const itemIds = addToCart.map(fav => fav.itemId);

        const items = await Item.find({ _id: { $in: itemIds } });
        console.log(items);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.ClearUserCartAll = async (req, res) => {
    try {
        const { authId } = req.params; // Get user ID from URL params

        if (!authId) {
            return res.status(400).json({ error: "authId is required" });
        }

        // Delete all cart items where userId matches
        const result = await AddToCart.deleteMany({ userId: authId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No items found in cart" });
        }

        res.status(200).json({ message: "All cart items removed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
