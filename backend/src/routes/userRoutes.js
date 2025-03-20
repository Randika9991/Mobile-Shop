const express = require('express');
const router = express.Router();
const { authMiddleware,userMiddleware } = require('../middleware/authMiddleware');
const ItemController = require('../controllers/user/UserItemController');
const FavoriteController = require('../controllers/user/FavoriteController');
const AddToCard = require('../controllers/user/AddToCard');
const Order = require('../controllers/user/Order');

//Product
router.get('/getAllItemsUser', authMiddleware, userMiddleware, ItemController.getAllItemsUser);
router.get('/itemFindByIdUser/:id', authMiddleware, userMiddleware, ItemController.getItemByIdUser);

//Favorite
router.post('/addFavorite', authMiddleware, userMiddleware, FavoriteController.addFavorite);
router.get('/getAllUserFavorite/:authId', authMiddleware, userMiddleware, FavoriteController.getAllFavorite);
router.delete('/DeleteFavoriteFindProductId/:productId', authMiddleware, userMiddleware, FavoriteController.removeFavorite);
router.get('/getAllFavoriteOnly/:authId', authMiddleware, userMiddleware, FavoriteController.getAllFavoriteProductOnly);
router.get('/getFavoriteItemFindId/:authId', authMiddleware, userMiddleware, FavoriteController.getFavoriteItemFindId);

// addToCart
router.post('/addAddToCart', authMiddleware, userMiddleware, AddToCard.addAddToCart);
router.get('/getAddToCartItemFindId/:authId', authMiddleware, userMiddleware, AddToCard.getFavoriteItemFindId);
router.delete('/DeleteAddToCart/:productId', authMiddleware, userMiddleware, AddToCard.DeleteAddToCart);
router.get('/getAllAddToCartOnly/:authId', authMiddleware, userMiddleware, AddToCard.getAllAddToCartOnly);
router.delete('/ClearUserCartAll/:authId', authMiddleware, userMiddleware, AddToCard.ClearUserCartAll);

//Order
router.post('/orders', authMiddleware, userMiddleware, Order.addOrder);


module.exports = router;