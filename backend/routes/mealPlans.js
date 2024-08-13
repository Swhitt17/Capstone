/** Routes for meal plans */

const express = require("express");
const axios = require("axios");
const {BadRequestError} = require("../expressError");
const {ensureCorrectUserOrAdmin} = require("../middleware/auth");
const {API_KEY} = require("../config")



// const BASE_URL = "https://api.spoonacular.com"

// const userHash = "83b1e2ce664c845552728ea055e7cdec724e3781"
// const username = "swhitt0"
//"83d65c0eadf20c68c595f429fca23199a29df180" mhuynh hash

const router = express.Router({mergeParams: true});


/** POST  {mealPlan} => {mealPlan}
 * 
 * mealPlan should be {date, slot, position, type, id, servings, title}
 * 
 * date: as timestamp
 * 
 * slot: refers to meal so options are 1,2,or 3
 * 
 * position: refers to order within the slot
 * 
 * Returns {date, slot, position, type, id, servings, title}
 * 
 * Authorization required: user or admin
*/

router.post("/", async function(req,res,next){
    console.log("plan add")
    const username = req.session.username;
    const userHash = req.session.userHash;
    console.log(userHash, "hash")
    console.log(username, "username")
    try{
 
        const response = await axios.post(
            `https://api.spoonacular.com/mealplanner/${username}/items?hash=${userHash}&apiKey=${API_KEY}`, 
            {date: req.body.date,
             slot: req.body.slot, 
            position: req.body.position,
            type: "RECIPE",
            value:{
            id: req.body.value.id,
            servings: req.body.value.servings,
            title: req.body.value.title}});
            console.log(response)
           
           
        return res.json(response.data)
    }
    catch(err){
        return next(err);
    }
});



/** GET /[date] => {mealPlan}
 * 
 * mealPlan is {date, slot, position, type, id, servings, title}
 * 
 * Returns {date,day,nutrients, items}
 * 
 * date is yyyy/mm/dd
 * 
 * day is day of the week
 * 
 * Authorzation required: user or admin
 */

router.get("/:date",  async function(req,res,next){
    console.log("hello there")
    const username = req.session.username;
    const userHash = req.session.userHash;
    console.log(username, "username");
    console.log(userHash, "userHash");
    const date = req.params.date;
    try{
        const response = await axios.get(
        `https://api.spoonacular.com/mealplanner/${username}/day/${date}?hash=${userHash}&apiKey=${API_KEY}`);
                
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

/**DELETE /[id] => {deleted: id} 
 * 
 * Authorization required: user or admin
*/

/** DELETE one item by id */
router.delete("/:id", ensureCorrectUserOrAdmin, async function(req,res,next){
    const username = req.session.username;
    const userHash = req.session.userHash;
    const recipeId = req.params.id
    try{
        await axios.delete(
            `${BASE_URL}/mealplanner/${username}/items/${recipeId}?hash=${userHash}&apiKey=${API_KEY}`
        );
        return res.json({deleted: recipeId });
    }
    catch(err){
        return next(err);
    }
});

/**DELETE /[date] => {cleared: date} 
 * 
 * Authorization required: user or admin
*/

router.delete("/:date", ensureCorrectUserOrAdmin, async function(req,res,next){
    const username = req.session.username;
    const userHash = req.session.userHash;
    const date = req.params.date
    try{
        await axios.delete(
            `${BASE_URL}/mealplanner/${username}/day/${date}?hash=${userHash}&apiKey=${API_KEY}`
        );
        return res.json({cleared: date });
    }
    catch(err){
        return next(err);
    }
});



module.exports = router;