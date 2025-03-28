const Favorite = require("../../models/Favorite");
const Item = require("../../models/Item");

exports.addFavorite = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.user.id;

        if (!userId || !itemId) {
            return res.status(400).json({ message: "User ID and Item ID are required" });
        }

        const existingFavorite = await Favorite.findOne({ userId, itemId });

        if (existingFavorite) {
            return res.status(400).json({ message: "Item is already in favorites" });
        }

        const newFavorite = new Favorite({ userId, itemId });
        await newFavorite.save();

        res.status(201).json({ message: "Item added to favorites successfully", favorite: newFavorite });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllFavorite = async (req, res) => {
    try {
        const { authId } = req.params;

        const favorites = await Favorite.find({ userId:authId });

        if (!favorites.length) {
            return res.status(404).json({ message: "No favorites found for this user" });
        }

        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllFavoriteProductOnly = async (req, res) => {
    try {
        const { authId } = req.params;
        const favorites = await Favorite.find({ userId:authId });

        const itemIds = favorites.map(fav => fav.itemId);

        const items = await Item.find({ _id: { $in: itemIds } });

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFavoriteItemFindId = async (req, res) => {
    try {
        const { authId } = req.params;
        const {productId}  = req.query;

        const result = await Favorite.findOne({ userId:authId, itemId: productId });

        res.status(200).json(!!result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const { productId } = req.params;
        const { authId } = req.body;

        if (!productId) {
            return res.status(400).json({ error: "productId is required" });
        }

        if (!authId) {
            return res.status(400).json({ error: "authId is required" });
        }
        const result = await Favorite.findOneAndDelete({ userId:authId, itemId: productId });

        if (!result) {
            return res.status(404).json({ message: "Favorite not found" });
        }

        res.status(200).json({ message: "Favorite removed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



