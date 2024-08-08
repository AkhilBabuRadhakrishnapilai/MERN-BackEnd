const express  = require('express');
const adminController  = require('../Controller/adminController');

const router = express.Router();

//adding flight details
router.post('/post/flightdetails',adminController.addFlightDetails);
//update flight details
router.patch('/update/flightdetails/:fid',adminController.editFlightDetails);
//disable flight details
router.patch('/disable/flightdetails/:fid',adminController.disableFlightDetails);
//view all flight details
router.get('/get/flightdetails',adminController.displayFlightDetails);
module.exports = router;