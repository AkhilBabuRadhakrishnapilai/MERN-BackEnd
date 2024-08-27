const mongoose = require('mongoose');
const HttpError = require('../Models/httpError');
const {validationResult} = require('express-validator');
//flightDetails Schema
const FlightDetails = require('../Models/FlightDetails');
//booking details Schema
const BookingDetails = require('../Models/Booking');
//flights details
const Flights =  require('../Models/Flights');
//routes 
const Routes = require('../Models/flightRoutes');
//role
const Roles = require('../Models/Roles.js');
//airports
const Airports = require('../Models/airports.js');
//category
const Category = require('../Models/Category.js');
//flight type
const FlightType = require('../Models/flightType.js');
//payment details
const PaymentDetails = require('../Models/paymentDetails.js');
//Profile
const Profile = require('../Models/Profile.js');
//Seats
const Seats = require('../Models/Seats.js');
//Travel Type
const TravelType = require('../Models/TravelType.js');
//class SChema
const seatClass = require('../Models/class.js');

//add flight Details
const addFlightDetails = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid inputs passed...Please check your data..',422);
    }
    const Details = req.body;
    // creating object for flight details
    const flights = new FlightDetails({
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

    res.status(201).json({flightDet : flights.toObject({getters:true})});
}

//edit flight details
const editFlightDetails = async (req,res,next)=>{
    const Details = req.body;
    const flightId = req.params.fid;

    let flight;
    try{
        flight = await FlightDetails.findById(flightId);
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Something went wrong...!could not update...',500);
        return next(error);
    }

    flight.typeId = Details.typeId;
    flight.routeId = Details.routeId;
    flight.depDate = Details.depDate;
    flight.arrivalDate = Details.arrivalDate;
    flight.depTime = Details.depTime;
    flight.arrivalTime = Details.arrivalTime;

    try{
        await flight.save();
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Something went wrong...couold not update',500);
        return next(error);
    }

    res.status(200).json({flightDet:flight.toObject({getters:true})});
}
//Disable flights
const disableFlightDetails = async (req,res,next)=>{
    const flightId = req.params.fid;
    let flight;
    try{
        flight = await FlightDetails.findById(flightId);
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Something went wrong...Please try again..!',500);
        return next(error);
    }
    flight.isActive = false;

    try{
        await flight.save();
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Somethimg went wrong...Please try again',500);
        return next(error);
    }

    res.status(200).json({messgae:"Deleted Successfully....!"})
}
//Display all flight details
const displayFlightDetails = async (req,res,next)=>{
    console.log("reached list");
    let flight;
    try{
        flight = await FlightDetails.find({isActive:true}).populate('routeId');
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Something went wrong....',500);
        return next(error);
    }
    if(!flight){
        const error = new HttpError('Something went wronng,Please try again',500);
        return next(error);
    }
    console.log("exiting list method");
    res.status(200).json({flightdetails:flight.map((value)=>value.toObject({getters:true}))});
}
//search flight details

//Display all bookings
const displayBookings = async (req,res,next)=>{
    let ticket;
    try{
        ticket = await BookingDetails.find({isActive:true});
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Something went wrong....please try again',500);
        return next(error);
    }
    if(!ticket){
        const error = new HttpError('something went wrong,Please try again',500);
        return next(error);
    }
    res.status(200).json({tickets:ticket.map((value)=>value.toObject({getters:true}))});
}
//Edit boookings 
const editBookings = async (req,res,next)=>{
    const existingTicket = req.body;
    const bookingId = req.params.bid;
    let ticket;
    try{
        ticket = await BookingDetails.findById(bookingId);
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Something went wrong...Try again...!',500);
        return next(error);
    }
    ticket.flightId = existingTicket.flightId;
    ticket.startingDate = existingTicket.startingDate;
    ticket.routeId = existingTicket.routeId;
    ticket.totalPrice = existingTicket.totalPrice;
    ticket.category = existingTicket.category;
    ticket.typeOfTravel = existingTicket.typeOfTravel;
    ticket.endDate = existingTicket.endDate;

    try{
        await ticket.save();
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Something wnet wrong....try again',500);
        return next(error);
    }

    res.status(200).json({editedTicket:ticket.toObject({getters:true})});
}
//Cancel Boookings

//Generate Reports

//list flights
const listFlights = async (req,res,next)=>{
    let flight;
    try{
        flight = await Flights.find({isActive:true});
        console.log(flight);
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Something went wrong,Please try again',500);
        return next(error);
    }
    if(!flight || flight.length===0){
        const error = new HttpError('something went wrong,flights not found',404);
        return next(error);
    }

    res.status(200).json({flights:flight.map((value)=>value.toObject({getters:true}))});
}
//add flights
const addFlights = async (req,res,next)=>{


    const details = req.body;
    let existingFlight;
    const flightId = details.flightId;
    try{
        existingFlight = await Flights.findOne({flightId:flightId});
        console.log(existingFlight);
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Flight already exists.....!',500);
        return next(error);
    }

    if(!existingFlight){
        const flight = new Flights({
            flightId : details.flightId,
            flightName : details.flightName,
            totalSeat : details.totalSeat,
            economySeat : details.economySeat,
            businessSeat : details.businessSeat
        })

        try{
            await flight.save();
        }
        catch(err){
            console.log(err);
            const error = new HttpError('Something went wrong,please try again',500);
            return next(error);
        }

        res.status(201).json({flight:flight.toObject({getters:true})});
    }
}
//edit flights
const editFlights= async (req,res,next)=>{
    const details = req.body;
    const fliId = req.params.fid;
    let flight;
    try{
        flight = await Flights.findById(fliId);
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Something went wrong..Please try again...!',500);
        return next(error);
    }
    flight.flightId = details.flightId;
    flight.flightName = details.flightName;
    flight.totalSeat = details.totalSeat;
    flight.economySeat = details.economySeat;
    flight.businessSeat = details.businessSeat;

    try{
        await flight.save();
    }
    catch(err){
        console.log(err);
        const error = new HttpError('something went wrong...Try again',500);
        return next(error);
    }

    res.status(200).json({flights:flight.toObject({getters:true})});
}
//disable flights
const disableFlights= async (req,res,next)=>{
    const fliId = req.params.fid;
    let flight;
    try{
        flight = await Flights.findById(fliId);
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Something wrong occurred...PLease try again...!',500)
        return next(error);
    }
    flight.isActive = false;

    try{
        await flight.save();
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Something wrong occurred,Please try again',500);
        return next(error);
    }

    res.status(200).json({message:"Deleted Sucessfully...!"})
}

//list routes
const listRoutes = async (req,res,next)=>{
    let routes;
    try{
        routes = await Routes.find({isActive:true});
        console.log(routes);
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Something went wrong',500);
        return next(error);
    }

    if(!routes || routes.length===0){
        const error = new HttpError('Something went wrong,Routes not found',400);
        return next(error);
    }
    res.status(200).json({routes:routes.map((value)=>value.toObject({getters:true}))})
}
//add routes
const addRoutes = async (req,res,next)=>{
    const routeDetails = req.body;
    const route = new Routes({
        departure : routeDetails.departure,
        arrival : routeDetails.arrival,
        price : routeDetails.price
    })

    try{
        await route.save();
    }
    catch(err){
        console.og(err);
        const error = new HttpError('Something went wrong,please try again',500);
        return next(error);
    }

    res.status(200).json({route:route.toObject({getters:true})});
}
// edit routes
const editRoutes = async (req,res,next)=>{
    const routeDetails = req.body;
    const routeId = req.params.rid;
    let route;
    try{
        route = await Routes.findById(routeId);
    }
    catch(err){
        console.log(err);
        const error = new HttpError(`Could'nt find the route,please try again...!`,500);
        return next(error);
    }
    route.departure = routeDetails.departure;
    route.arrival = routeDetails.arrival;
    route.price = routeDetails.price;

    try{
        await route.save();
    }
    catch(err){
        cosole.log(err);
        const error = new HttpError('something went wrong,please try again',500);
        return next(error);
    }

    res.status(200).json({route:route.toObject({getters:true})});
}
//disbale routes
const disableRoutes = async (req,res,next)=>{
    console.log("disable hitted");
    const routeId = req.params.rid;
    console.log(routeId);
    let route;
    try{
        route = await Routes.findById(routeId);
        console.log(route);
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Route not found,please try again',500);
        return next(error)
    }
    route.isActive = false;
    try{
        await route.save();
    }
    catch(err){
        console.log(err);
        const error = new HttpError('something went wrong,Please try again',500);
        return next(error);
    }

    res.status(200).json({message:"Deleted successfully...!"})
}

//get airport locations
const getLocations =async(req,res,next)=>{

    let airport;
    try{
        airport = await Airports.find({isActive:true});
        console.log(airport)
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Somethig went wrong',500)
        return next(error);
    }
    if(!airport && airport.length===0){
        const error = new HttpError('Airports not found',404);
        return next(error);
    }
    console.log("exiting list of airports");
    res.status(200).json({airports:airport.map((value)=>value.toObject({getters:true}))});
}

//travel type
const travelType = async(req,res,next)=>{
    let types;
    try{
        types = await FlightType.find({isActive:true});
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Something went wrong',500)
        return next(error)
    }

    if(!types){
        const error = new HttpError('Not Found',400)
        return next(error)
    }

    res.status(200).json({types:types.map((value)=>value.toObject({getters:true}))});
}

exports.travelType = travelType;
exports.getLocations = getLocations;
exports.listRoutes = listRoutes;
exports.addFlightDetails = addFlightDetails;
exports.editFlightDetails = editFlightDetails;
exports.disableFlightDetails = disableFlightDetails;
exports.displayFlightDetails = displayFlightDetails;
exports.displayBookings = displayBookings;
exports.editBookings = editBookings;
exports.listFlights = listFlights;
exports.addFlights = addFlights;
exports.editFlights = editFlights;
exports.disableFlights = disableFlights;
exports.addRoutes = addRoutes;
exports.editRoutes = editRoutes;
exports.disableRoutes = disableRoutes;

