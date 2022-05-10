const express = require('express');

const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/createUser', UserController.createUser);
router.put('/updateUser/:id', UserController.updateUser);
router.delete('/deleteUser/:id', UserController.deleteUser);
router.get('/getUsers', UserController.getUsers);

module.exports = router;
