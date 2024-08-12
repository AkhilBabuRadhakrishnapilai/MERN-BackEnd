const express  = require('express');
const adminController  = require('../Controller/adminController');

const router = express.Router();
const {check} = require('express-validator');

//adding flight details
router.post('/post/flightdetails',adminController.addFlightDetails);
//update flight details
router.patch('/update/flightdetails/:fid',adminController.editFlightDetails);
//disable flight details
router.patch('/disable/flightdetails/:fid',adminController.disableFlightDetails);
//view all flight details
router.get('/get/flightdetails',adminController.displayFlightDetails);
//display all bookings
router.get('/get/bookingdetails',adminController.displayBookings);
//edit bookings
router.patch('/update/tickets/:bid',adminController.editBookings);
//add flights
router.post('/post/flights',adminController.addFlights);
//edit flights
router.patch('/update/flights/:fid',adminController.editFlights);
//disable flights
router.patch('/disable/flights/:fid',adminController.disableFlights);
//add routes
router.post('/post/routes',adminController.addRoutes);
//edit routes
router.patch('/update/routes/:rid',adminController.editRoutes);
//disable routes
router.patch('/disable/routes/:rid',adminController.disableRoutes);

module.exports = router;