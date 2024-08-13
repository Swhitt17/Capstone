"use strict";

/** Routes for authentication */
const jsonschema = require("jsonschema");
// const session = require("express-session")
const User = require("../models/user");
const express = require("express");
const {createToken} = require("../helpers/token");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json")
const {BadRequestError} = require("../expressError");
const {API_KEY} = require("../config");
const { ensureLoggedIn } = require("../middleware/auth");
const axios = require("axios");
const session = require("express-session");




const router = new express.Router();

/** POST /auth/register: {user} => {token}
 * 
 * User must include {username,password,firstName, lastName, email}
 * 
 * Returns JWT token which can be used authenticate further requests
 * 
 * Authorization required: none
*/

router.post("/register", async function(req,res,next){
    console.log("hi", req.body)
  
    try{
        const validator = jsonschema.validate(req.body,userRegisterSchema);
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
      
        const newUser = await User.register({...req.body, isAdmin:false});
        console.log(req.body, "req.body")

        const { username,firstName, lastName, email } = req.body; 
        req.session.user = { username, email, firstName, lastName }; 
        
        const token = createToken(newUser);
        const spoonacularApiKey = "f2c5d0c51e4c4a7ea7703510f392eb82";        
        const response =  await axios.post (`https://api.spoonacular.com/users/connect?apiKey=${spoonacularApiKey}`,
           {username: req.session.username,
            firstName: req.session.firstName,
            lastName: req.session.lastName,
            email: req.session.email
           });
        //    console.log(response, "response");
           req.session.username = response.data.username;
           req.session.userHash  = response.data.hash;
           console.log(req.session.username, "req.session-username")
   
           
        return res.status(201).json({token, data: response.data});
    
    }
    catch(err){
        // console.log("error")
        return next(err);
    }

});


// router.post("/connect",   async function(req,res,next){
//      console.log(req.session.username, "session-username")
//     //  return res.status(201).json({data: req.session});

//      const user = req.session.user; 
//      if (!user) { return res.status(401).send('User not registered or session expired'); } 
//      const spoonacularApiKey = "f2c5d0c51e4c4a7ea7703510f392eb82";        
//          const response =  await axios.post (`https://api.spoonacular.com/users/connect?apiKey=${spoonacularApiKey}`,
//             {username: req.session.username,
//              firstName: req.session.firstName,
//              lastName: req.session.lastName,
//              email: req.session.email
//             });
//             console.log(response, "response");
//             req.session.username = response.data.username;
//             req.session.userHash  = response.data.hash;
//             console.log(req.session.username, "req.session-username")
            
//             return res.status(201).json({data: response.data})

      //    const response =  await axios.post (`${BASE_URL}/users/connect?apiKey=${API_KEY}`,
    //            {username: req.body.username,
    //             firstName: req.body.firstName,
    //             lastName: req.body.lastName,
    //             email: req.body.email
    //            });
    //            console.log(response, "response");

    // try{
    //       const response =  await axios.post (`${BASE_URL}/users/connect?apiKey=${API_KEY}`,
    //        {username: res.locals.username,
    //         firstName: res.locals.firstName,
    //         lastName: req.body.lastName,
    //         email: req.body.email
    //        });
    //        console.log(response, "data")
    //        res.locals.username = response.username
    //        res.locals.password = response.spoonacularPassword
    //        res.locals.userHash = response.hash
          
           

    // }
    // catch(err){
    //     return next(err);
    // }
// })

/** POST /auth/login: {username,password} => {token}
 *
 * Returns JWT token which can be used authenticate further requests
 * 
 * Authorization required: none
*/


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





module.exports = router;