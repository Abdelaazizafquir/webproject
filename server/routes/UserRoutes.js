const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/users', userController.getAllUsers);
router.put('/users/update-role', userController.updateUserRole);

module.exports = router;
