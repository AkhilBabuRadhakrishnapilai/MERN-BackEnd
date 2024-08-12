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
//Display all flights
const displayFlightDetails = async (req,res,next)=>{
    let flight;
    try{
        flight = await FlightDetails.find({isActive:true});
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Something went wrong....',500);
        return next(error);
    }

    res.status(200).json({flightDet:flight.toObject({getters:true})});
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

    res.status(200).json({booking:ticket.toObject({getters:true})});
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

//add flights
const addFlights = async (req,res,next)=>{


    const details = req.body;
    let existingFlight;
    const flightId = details.flightId;
    try{
        existingFlight = await Flights.findOne({flightId:flightId});
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Flight already exists.....!',500);
        return next(error);
    }

    if(!existingFlight){
        const flight = new Flight({
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
    const routeId = req.param.rid;
    let route;
    try{
        route = await Routes.findById(routeId);
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



exports.addFlightDetails = addFlightDetails;
exports.editFlightDetails = editFlightDetails;
exports.disableFlightDetails = disableFlightDetails;
exports.displayFlightDetails = displayFlightDetails;
exports.displayBookings = displayBookings;
exports.editBookings = editBookings;
exports.addFlights = addFlights;
exports.editFlights = editFlights;
exports.disableFlights = disableFlights;
exports.addRoutes = addRoutes;
exports.editRoutes = editRoutes;
exports.disableRoutes = disableRoutes;

