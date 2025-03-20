const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const ItemController = require('../controllers/admin/ItemController');
const ItemValidateController = require('../controllers/admin/ItemValidateController');
const UserController = require('../controllers/admin/UserController');
const AdminOrder = require('../controllers/admin/AdminOrder');


//Product
router.get('/admin/dashboard', authMiddleware, adminMiddleware);
router.post('/addItem', authMiddleware, adminMiddleware,ItemValidateController.validateItem, ItemController.addItem);
router.get('/getAllItems', authMiddleware, adminMiddleware, ItemController.getAllItems);
router.put('/itemUpdate/:id', authMiddleware, adminMiddleware,ItemValidateController.validateItem, ItemController.updateItem);
router.delete('/itemDelete/:id', authMiddleware, adminMiddleware, ItemController.deleteItem);
router.get('/itemFindById/:id', authMiddleware, adminMiddleware, ItemController.getItemById);
router.get('/getAllItemsSearchInName', authMiddleware, adminMiddleware, ItemController.getAllItemsSearchInName);

//users
router.get('/getAllUsers', authMiddleware, adminMiddleware, UserController.getAllUsers);

//order
router.get('/admin/orders', authMiddleware, adminMiddleware, AdminOrder.getAllOrders);


module.exports = router;