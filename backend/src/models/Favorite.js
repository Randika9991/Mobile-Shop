const mongoose = require('mongoose');

const favorite = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favorite);
