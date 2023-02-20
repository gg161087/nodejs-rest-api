const express = require('express');
const userController = require('../controllers/userController');
const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/users', auth, userController.createUser);
router.get('/users', auth, userController.getUsers);
router.get('/users/:id', auth, userController.getUser);
router.put('/users/:id', auth, userController.updateUser);
router.delete('/users/:id', auth, userController.deleteUser);

module.exports = router;