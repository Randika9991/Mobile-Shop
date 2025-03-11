const express = require('express');
const router = express.Router();
const { authMiddleware,adminUserMiddleware } = require('../middleware/authMiddleware');
const userAdminController = require('../controllers/userAdminController');
// const adminController = require("../controllers/adminController");

router.post('/register', userAdminController.registerUser);
router.post('/login', userAdminController.loginUser);
router.get('/profile', authMiddleware,adminUserMiddleware, userAdminController.getUserProfile);
router.get('/dashboard', authMiddleware, adminUserMiddleware, userAdminController.getDashboard);
router.get('/uerFindById/:id', authMiddleware, userAdminController.userFindById);

router.put('/profile-edit/:id', userAdminController.editProfile);

module.exports = router;