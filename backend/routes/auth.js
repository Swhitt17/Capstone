"use strict";
const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const {createToken} = require("../helpers/token");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json")
const {BadRequestError} = require("../expressError");

// const BASE_URL = "https://api.spoonacular.com"
const API_KEY = "f2c5d0c51e4c4a7ea7703510f392eb82"; //put in config

const router = new express.Router();

router.post("/register", async function(req,res,next){
    // console.log("hi", req.body)
  
    try{
        const validator = jsonschema.validate(req.body,userRegisterSchema);
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
      
        const newUser = await User.register({...req.body, isAdmin:false});
        console.log(req.body, "req.body")
        
        const token = createToken(newUser);
        
           const response =  await axios.post (`https://api.spoonacular.com/users/connect?apiKey=${API_KEY}`,
           {ussername: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
           });
           res.locals.username = response.username
           res.locals.password = response.spoonacularPassword
           res.locals.userHash = response.hash
           console.log(response, "data")
           
        
        
        return res.status(201).json({token});
    
    }
    catch(err){
        // console.log("error")
        return next(err);
    }

});


router.post("/login", async function (req,res,next){
    try{
        const validator = jsonschema.validate(req.body,userAuthSchema);
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const {username,password} = req.body;
        const user = await User.authenticate(username,password);
        const token = createToken(user);
        //   (token){
            // const response =  await axios.post (`https://api.spoonacular.com/users/connect?apiKey=${API_KEY}`,
            // {username: req.body.username});
            // res.locals.username = response.username
            // res.locals.password = response.spoonacularPassword
            // res.locals.userHash = response.hash
            
        //  }
        return res.json({token});
    }
    catch(err){
        return next(err);
    }
});




// router.get("/register", async function(req,res,next){
//     try{
//        console.log("hi")
//     res.send([1,2,3])  
//     }
//     catch(err){
//         return next(err);
//     }
   
// })

module.exports = router;