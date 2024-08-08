const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');

//signUp
router.post('/signup',userController.signUp);

//login
router.post('/login',userController.userLogin);


module.exports = router;