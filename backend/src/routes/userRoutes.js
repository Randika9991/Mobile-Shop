const express = require('express');
const router = express.Router();
const { authMiddleware,userMiddleware } = require('../middleware/authMiddleware');
const ItemController = require('../controllers/user/UserItemController');
const FavoriteController = require('../controllers/user/FavoriteController');

//Product
router.get('/getAllItemsUser', authMiddleware, userMiddleware, ItemController.getAllItemsUser);
router.get('/itemFindByIdUser/:id', authMiddleware, userMiddleware, ItemController.getItemByIdUser);

//Favorite
router.post('/addFavorite', authMiddleware, userMiddleware, FavoriteController.addFavorite);
router.get('/getAllUserFavorite/:authId', authMiddleware, userMiddleware, FavoriteController.getAllFavorite);
router.delete('/DeleteFavoriteFindProductId/:productId', authMiddleware, userMiddleware, FavoriteController.removeFavorite);
router.get('/getAllFavoriteOnly/:authId', authMiddleware, userMiddleware, FavoriteController.getAllFavoriteProductOnly);

module.exports = router;