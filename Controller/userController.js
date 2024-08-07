const express = require('express');
const HttpError = require('../Models/httpError');
const User = require('../Models/Users');


//signup
const signUp = async (req,res,next) =>{
    const {firstName,lastName,email,password,contactNumber} = req.body;
    let existingUser;
    //finfing in data base
    try{
        existingUser = await User.findOne({email:email});
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Sign up failed.. Please try again..!',500);
        return next(error);
    }
    //checking user already exists
    if(existingUser){
        const error = new HttpError('User Already exists....Please try again',500);
        return next(error);
    }
    //creating new user
    const newUser = new User({
        firstName : firstName,
        lastName : lastName,
        email : email,
        password : password,
        contactNumber : contactNumber
    })

    //saving
    try{
        await newUser.save();
    }
    catch(err){
        console.log(err);
        const error = new HttpError('SignIn failed...please try again..!',500);
        return next(error);
    }

    res.status(201).json({user:newUser.toObject({getters:true})});
}

//login
const userLogin= async (req,res,next)=>{
    const {email,password}=req.body;
    let user;
    try{
        user = await User.findOne({email:email,password:password});
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Invalid Credentials...Please try again...!',500);
        return next(error); 
    }
   
    res.status(200).json({user:user.toObject({getters:true})});
}

exports.signUp = signUp;
exports.userLogin = userLogin;