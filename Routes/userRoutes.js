const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');

//signUp
router.get('/signup',userController.signUp);

//login
router.get('/login',userController.userLogin);


module.exports = router;