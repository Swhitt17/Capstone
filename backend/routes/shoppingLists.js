/** List Routes */

const jsonschema = require("jsonschema");
const axios = require("axios");
const express = require("express");
const {BadRequestError} = require("../expressError");
const {ensureCorrectUserOrAdmin} = require("../middleware/auth");
const listNewSchema = require("../schemas/listNew.json");


const BASE_URL = "https://api.spoonacular.com"
const API_KEY = "f2c5d0c51e4c4a7ea7703510f392eb82";
// const userHash = "83d65c0eadf20c68c595f429fca23199a29df180"
// const username = "mhuynh20"
// const userHash = "83b1e2ce664c845552728ea055e7cdec724e3781"
// const username = "swhitt0"


const router = express.Router({mergeParams: true});

/** POST generate list for selected week */
router.post("/:startDate/:endDate", ensureCorrectUserOrAdmin,async function (req,res,next){
    const {username, userHash} = res.locals
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    try{
        const validator = jsonschema.validate(req.body, listNewSchema);
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const response = await axios.post(
            `${BASE_URL}/mealplanner/${username}/shopping-list/${startDate}/${endDate}?hash=${userHash}$apiKey=${API_KEY}`, 
        );
        return res.json(response.data);
    }
    catch (err){
        return next(err);
    }
})

/** GET current list */
router.get("/",  async function(req,res,next){
    console.log("list")
    const {username, userHash} = res.locals
    // const username = req.params.username;
    // const userHash = req.params.userHash;
    try{
        const response = await axios.get(
            `${BASE_URL}/mealplanner/${username}/shopping-list?hash=${userHash}&apiKey=${API_KEY}`
        );
        return res.json(response.data);
    }
    catch(err){
        return next(err);
    }
});

/** POST add item to list */
router.post("/", async function(req,res,next){
    const {username, userHash} = res.locals
    console.log("add to list")
    console.log(username, "username")
    console.log(req.body, "body")
    

    try{
        const response = await axios.post(
            `${BASE_URL}/mealplanner/${username}/shopping-list/items?hash=${userHash}&apiKey=${API_KEY}`,{item:req.body.item, aisle:"", parse:true} 
        );
        return res.json(response.data);
    }
    catch(err){
        return next(err);
    }
});



/** DELETE one item from list */
router.delete("/:id",  async function(req,res,next){
    const {username, userHash} = res.locals
    console.log("delete")
    const id = req.params.id;
    console.log(id)
    try{
         await axios.delete(
             `${BASE_URL}/mealplanner/${username}/shopping-list/items/${id}?hash=${userHash}&apiKey=${API_KEY}`
            
         );
        return res.json({deleted: itemId});
    }
    catch(err){
        return next(err);
    }
});

module.exports = router;


