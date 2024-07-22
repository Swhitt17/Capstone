const jsonschema = require("jsonschema");
const express = require("express");
const User = require("../models/user");
const {ensureCorrectUserOrAdmin, ensureAdmin} = require("../middleware/auth");
const {BadRequestError} = require("../expressError");
const {createToken} = require("../helpers/token");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

//POST 
router.post("/", ensureAdmin, async function(req,res,next){
    try{
        const validator = jsonschema.validate(req.body,userNewSchema);
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const user = await User.register(req.body);
        const token = createToken(user);
        return res.status(201).json({user, token});
    }
    catch(err){
        return next(err);
    }
});

//GET
router.get("/",  async function(req,res,next){
    try{
        const users = await User.findAll();
        return res.json({users});
    }
    catch(err){
        return next(err);
    }
});


//GET /username    
router.get("/:username",  async function(req,res,next){
    try{
        
        const user = await User.get(req.params.username);
        console.log("after")
        return res.json({user});
    }
    catch(err){
        return next(err);
    }
});

//PATCH /username
router.patch("/:username", ensureCorrectUserOrAdmin, async function(req,res,next){
    try{
        const validator = jsonschema.validate(req.body,userUpdateSchema);
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const user = await User.update(req.params.username,req.body);
        return res.json({user});
    }
    catch(err){
        return next(err);
    }
});

//DELETE /username
router.delete("/:username", ensureCorrectUserOrAdmin, async function(req,res,next){
    try{
         await User.remove(req.params.username);
        return res.json({deleted: req.params.username});
    }
    catch(err){
        return next(err);
    }
});

module.exports = router;


