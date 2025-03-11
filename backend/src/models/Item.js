const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        index: false
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String, // Storing image URL instead of binary data
        required: true
    },
    color: {
        type: String
    },
    ram: {
        type: Number
    },
    rom: {
        type: Number
    },
    processor: {
        type: String
    },
    operatingSystem: {
        type: String
    },
    battery: {
        type: Number
    },
    frontCamera: {
        type: Number
    },
    rearCamera: {
        type: Number
    },
    displaySize: {
        type: Number
    },
    warrenty: {
        type: Number
    },
    modelName: {
        type: String
    },
    modelNumber: {
        type: String
    },
    qty: {
        type: Number
    }
}, { timestamps: true });

const Item = mongoose.model('Item', ItemSchema);

// Ensure index is updated (Run once in your app)
Item.collection.dropIndexes();

module.exports = Item;
                                                            //explain

//categories: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'MenuCategory',
//         },
//],
//මෙහි categories කියන field එක හරහා, menu එකක්ට අදාල category එකක් refer කරන්න පුළුවන්.
//උදාහරණයක් ලෙස, "Lunch Menu" එකට "Vegetarian" වගේ category එකක් link කරන්න මෙය facilitate කරනවා.

                                                            //still check

// categories: [
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'MenuCategory',
//     },
// ],