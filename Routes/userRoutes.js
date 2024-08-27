const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const {check} = require('express-validator');


//signUp
router.post('/signup',userController.signUp);

//login
router.post('/login',userController.userLogin);

//profile creation
router.post('/profile',userController.userProfile);

//edit profile\
router.patch('/profile/update',userController.editProfile);

module.exports = router;