const Item = require('../../models/Item');
const {validationResult} = require('express-validator');
const moment = require("moment");

exports.getItemByIdUser = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllItemsUser = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const items = await Item.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};






