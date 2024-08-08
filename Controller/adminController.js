const mongoose = require('mongoose');
const HttpError = require('../Models/httpError');
const {validationResult} = require('express-validator');
//flightDetails Schema
const flightDetails = require('../Models/FlightDetails');

//add flight Details
const addFlightDetails = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid inputs passed...Please check your data..',422);
    }
    const Details = req.body;
    // creating object for flight details
    const flights = new flightDetails({
        flightId : Details.flightId,
        typeId : Details.typeId,
        routeId : Details.routeId,
        depDate : Details.depDate,
        arrivalDate:Details.arrivalDate,
        depTime:Details.depTime,
        arrivalTime:Details.arrivalTime
    })
    try{
        await flights.save();
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Error occurred... Please try again..!',500);
        return next(error);
    }

    res.status(201).json({flightDet : flights});
}

//edit flight details
const editFlightDetails = async (req,res,next){
    
}
//Disable flights

//Display all flights

//Add Flight Routes

//Edit Flight Routes

//Display all Routes

//Display all bookings

//Edit boookings 

//Cancel Boookings

//Generate Reports

