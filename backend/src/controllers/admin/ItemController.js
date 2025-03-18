const Item = require('../../models/Item');
const {validationResult} = require('express-validator');
const moment = require("moment");

exports.addItem = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const existingItem = await Item.findOne({
            name: req.body.name,
            modelNumber: req.body.modelNumber,
            color: req.body.color,
            ram: req.body.ram,
            rom: req.body.rom
        });
        if (existingItem) {
            return res.status(400).json({ errors: "This mobile configuration is already added." });
        }
        let formattedDate = "";
        if (req.body.date) {
            formattedDate = moment(req.body.date, "DD-MM-YYYY").format("YYYY-MM-DD");
        }
        const newItem = new Item({
            ...req.body,
            date: formattedDate,
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const existingItem = await Item.findById(id);
        if (!existingItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        const duplicateItem = await Item.findOne({
            _id: { $ne: id },
            name: req.body.name,
            modelNumber: req.body.modelNumber,
            color: req.body.color,
            ram: req.body.ram,
            rom: req.body.rom
        });

        if (duplicateItem) {
            return res.status(400).json({ message: "This mobile configuration is already added." });
        }
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: "Item update failed" });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getItemById = async (req, res) => {
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

exports.getAllItems = async (req, res) => {
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

exports.getAllItemsSearchInName = async (req, res) => {
    try {
        console.log(req.query)
        const search = req.query.search || ""; // Ensure it's a string even if undefined
        const query = search ? { name: { $regex: search, $options: 'i' } } : {}; // Case-insensitive search

        const items = await Item.find(query);

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};






// exports.updateItem = async (req, res) => {
//     const { id } = req.params;
//     const { name, description } = req.body;
//
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ message: 'Invalid Item ID' });
//     }
//
//     try {
//
//         //check already exist same value and check id same value ....
//         const existingItem = await Item.findOne({ name, _id: { $ne: id } });
//         if (existingItem) {
//             return res.status(400).json({ message: 'Item with this name already exists.' });
//         }
//
//         const updatedItem = await Item.findByIdAndUpdate(id, { name, description }, { new: true })
//         if (!updatedItem) {
//             return res.status(404).json({ message: 'Item not found' });
//         }
//         res.status(200).json(updatedItem);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
//
// exports.deleteItem = async (req, res) => {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ message: 'Invalid menu ID' });
//     }
//     try {
//         const existingItem = await ItemCategory.findOne({ Item: id });
//         if (existingMenu) {
//             return res.status(400).json({ message: 'cannot delete its refer MenuCategory table.' });
//         }
//         const deletedMenu = await Menu.findByIdAndDelete(id);
//         if (!deletedMenu) {
//             return res.status(404).json({ message: 'Menu not found' });
//         }
//         res.status(200).json({ message: 'Menu deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
//
// exports.getMenuById = async (req, res) => {
//     const { id } = req.params;
//
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ message: 'Invalid menu ID' });
//     }
//
//     try {
//         const menu = await Menu.findById(id);
//         if (!menu) {
//             return res.status(404).json({ message: 'Menu not found' });
//         }
//         res.status(200).json(menu);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


                                                                // note


//check mongo object id valid or not

// if (mongoose.Types.ObjectId.isValid(id)) {
//     res.status(201).json({message : "valid id"});
//
//     // Proceed with database operation
// } else {
//     // Handle invalid ObjectId
//     res.status(400).json({ error: 'Invalid ID format' });
// }
