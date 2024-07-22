/** Meal Plan routes */

const jsonschema = require("jsonschema");
const express = require("express");
const axios = require("axios");
const {BadRequestError} = require("../expressError");
const {ensureCorrectUserOrAdmin} = require("../middleware/auth");



const BASE_URL = "https://api.spoonacular.com"
const API_KEY = "f2c5d0c51e4c4a7ea7703510f392eb82";
// const userHash = "83b1e2ce664c845552728ea055e7cdec724e3781"
// const username = "swhitt0"

const router = express.Router({mergeParams: true});


/** POST  add to meal plan*/

router.post("/", async function(req,res,next){
    console.log("plan add")
    const {username, userHash} = res.locals
    try{
 

        const response = await axios.post(
            `${BASE_URL}/mealplanner/${username}/items?hash=${userHash}&apiKey=${API_KEY}}`, 
            {date: req.body.date,
             slot: req.body.slot, 
            position: req.body.position,
            type: "RECIPE",
            value:{
            id: req.body.value.id,
            servings: req.body.value.servings,
            title: req.body.value.title}});
           
           
        return res.json(response.data)
    }
    catch(err){
        return next(err);
    }
});



/** GET for selected day */

router.get("/:date",  async function(req,res,next){
    console.log("hello there")
    const {username, userHash} = res.locals
    const date = req.params.date;
    try{
        const response = await axios.get(
        `${BASE_URL}/mealplanner/${username}/day/${date}?hash=${userHash}&apiKey=${API_KEY}`);
                
   
        return res.json({
            date: response.data.date,
            day: response.data.day,
            nutrient:response.data.nutritionSummary,
           items: response.data.items,
           
         
    });
    }
    catch(err){
        return next(err);
    }
});



/** DELETE one item by id */
router.delete("/:id", ensureCorrectUserOrAdmin, async function(req,res,next){
    const {username, userHash} = res.locals
    const recipeId = req.params.id
    try{
        await axios.delete(
            `${BASE_URL}/mealplanner/${username}/items/${recipeId} `
        );
        return res.json({deleted: recipeId });
    }
    catch(err){
        return next(err);
    }
});

/** DELETE all items for selected day */
router.delete("/:date", ensureCorrectUserOrAdmin, async function(req,res,next){
    const {username, userHash} = res.locals
    const date = req.params.date
    try{
        await axios.delete(
            `${BASE_URL}/mealplanner/${username}/day/${date} `
        );
        return res.json({cleared: date });
    }
    catch(err){
        return next(err);
    }
});



module.exports = router;