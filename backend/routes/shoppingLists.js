/** Routes for shopping lists */


const axios = require("axios");
const express = require("express");
const {BadRequestError} = require("../expressError");
const {ensureCorrectUserOrAdmin} = require("../middleware/auth");
const {API_KEY} = require("../config")



// const BASE_URL = "https://api.spoonacular.com"

// const userHash = "83d65c0eadf20c68c595f429fca23199a29df180"
// const username = "mhuynh20"
// const userHash = "83b1e2ce664c845552728ea055e7cdec724e3781"
// const username = "swhitt0"


const router = express.Router({mergeParams: true});

/** POST /[startDate]/[endDate] => {shoppingList}
 * 
 * 
*/
router.post("/:startDate/:endDate", ensureCorrectUserOrAdmin,async function (req,res,next){
    const username = req.session.username;
    const userHash = req.session.userHash;
    
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    try{
       

        const response = await axios.post(
            `https://api.spoonacular.com/mealplanner/${username}/shopping-list/${startDate}/${endDate}?hash=${userHash}$apiKey=${API_KEY}`, 
        );
        return res.json(response.data);
    }
    catch (err){
        return next(err);
    }
})

/** GET / => {shoppingList}
 * 
 * Returns {items, aisle, parse}
 * 
 * Authorization require: user or admin
 */
router.get("/",  async function(req,res,next){
    console.log("list")
    const username = req.session.username;
    const userHash = req.session.userHash;
    console.log(username, "username")
    console.log(userHash, "hash")
    // const username = req.params.username;
    // const userHash = req.params.userHash;
    try{
        const response = await axios.get(
            `https://api.spoonacular.com/mealplanner/${username}/shopping-list?hash=${userHash}&apiKey=${API_KEY}`
        );
        return res.json(response.data);
    }
    catch(err){
        return next(err);
    }
});

/** POST / => {item} => {list} 
 * 
 * item should be {item, aisle, parse}
 * 
 * Returns {item, aisle, parse}
 * 
 * Authorization required: user or admin
*/
router.post("/", async function(req,res,next){
    const username = req.session.username;
    const userHash = req.session.userHash;
    console.log("add to list")
    console.log(username, "username")
    console.log(req.body, "body")
    

    try{
        const response = await axios.post(
            `https://api.spoonacular.com/mealplanner/${username}/shopping-list/items?hash=${userHash}&apiKey=${API_KEY}`,{item:req.body.item, aisle:"", parse:true} 
        );
        return res.json(response.data);
    }
    catch(err){
        return next(err);
    }
});



/** DELETE /[id] => {deleted: id} 
 * 
 * Authorization required: user or admin
*/
router.delete("/:id",  async function(req,res,next){
    const username = req.session.username;
    const userHash = req.session.userHash;
    console.log("delete")
    const id = req.params.id;
    console.log(id)
    try{
         await axios.delete(
             `https://api.spoonacular.com/mealplanner/${username}/shopping-list/items/${id}?hash=${userHash}&apiKey=${API_KEY}`
            
         );
        return res.json({deleted: itemId});
    }
    catch(err){
        return next(err);
    }
});

module.exports = router;


