const express = require('express');
const HttpError = require('../Models/httpError');
const User = require('../Models/Users');
const Profile = require('../Models/Profile');

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
        const error = new HttpError('SignIn failed...please try again..!',401);
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
        console.log(user);
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Invalid Credentials...Please try again...!',500);
        return next(error);
    }
   if(!user){
    const error =  new HttpError('Invalid Credentials....! Please try again',500);
    return next(error);
   }
    res.status(200).json({user:user.toObject({getters:true})});
}

//profile creation
const userProfile= async (req,res,next)=>{
    const userId = req.params.uid;
    let existingProfile;
    try{
        existingProfile = await Profile.findOne({userId:userId});
    }
    catch(err){
        console.log(err);
        const error = new HttpError('Something went wrong....',500);
        return next(error);
    }
    if(existingProfile){
        const error = new HttpError('Profile already exists',500);
        return next(error);
    }
    //creating new profile
    const profile = new Profile({
        userId : userId,
        dateOfBirth : '',
        address: '',
        gender : ''
    })

    try{
        await profile.save();
    }
    catch(err){
        console.log(err);
        const error = new HttpError(`Something went wrong,can't save the data`,500);
        return next(error);
    }

    res.status(201).json({profile:profile.toObject({getters:true})})
}

//edit user profile
const editProfile = async (req,res,next)=>{
    const details = req.body;
    const userId = req.params.uid;

    let userProfile;
    try{
        userProfile = await Profile.findById(userId);
        console.log(userProfile);
    }
    catch(err){
        console.log(err);
        const error = new HttpError(`Someting went wrong,can't find the user`,500);
        return next(error);
    }
    const profile = new Profile({
        dateOfBirth : details.dateOfBirth,
        address : details.address,
        gender : details.gender
    })
    try{
        await profile.save();
    }
    catch(err){
        console.log(err);
        const error = new HttpError(`Something went wrong,couldn't save...Please try again`,500)
        return next(error);
    }
    res.status(200).json({profile:profile.toObject({getters:true})})
}

exports.editProfile = editProfile;
exports.userProfile = userProfile;
exports.signUp = signUp;
exports.userLogin = userLogin;