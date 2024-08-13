/** Routes for recipes */

const express = require("express");
const axios = require("axios");
const {API_KEY} = require("../config")


const BASE_URL = "https://api.spoonacular.com"


const router = new express.Router();



/** GET / =>  
 *  {recipes: [{title, id, time, servings, nutrients, instructions,ingredients, cuisines, diets, dishes, image}]}
 * 
 * Can filter on provided search filters
 * - cuisine
 * - diet
 * - dish
 * - servings
 * - time
 * - title (will find case-insensitive, partial matches)
 * 
 * Authorization required: none
*/

router.get("/", async function(req,res,next){
    
    const cuisine = req.query.cuisine;
    const diet = req.query.diet;
    const dish = req.query.dish;
    // const servings = req.query.servings;
    const title = req.query.title;
    const time = req.query.time;
    const offset = req.query.itemOffset
    console.log(diet, "diet")
    console.log(cuisine, "cuisine")
    // console.log(servings, "servings")
    console.log(dish, "dish")
    // console.log(time, "time")
    console.log(title, "title")


    try{
        const result = await axios.get(
            `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cuisine}&diet=${diet}&type=${dish}&titleMatch=${title}&number=50&offset=${offset}`);
        //   console.log(result.data, "result")
          
         return res.json(result.data)
    }
    catch(err){
        return next(err);
    }
});


/** GET /[id] => {recipe} 
 * 
 * recipe is {title, id, time, servings, nutrients, instructions,ingredients, cuisines, diets, dishes, image}
 * 
 * Authorizarion required: none
*/

router.get("/:id", async function(req,res,next){
    console.log("hi", "id")
    const id = +req.params.id;
   
    try{
        const result = await axios.get(
            `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`);
          

            let ingredients = [];
            for( const n in result.data.extendedIngredients ){
                console.log(n)
                ingredients.push(result.data.extendedIngredients[n].original)
                console.log(ingredients)
              

            }

            
            let nutrient = [];
            for( const n in result.data.nutrition.nutrients ){
                console.log(n)
                nutrient.push( result.data.nutrition.nutrients[n].name)
                for(let i = 0; i < nutrient.length; i++){
                    
                  }
             
            }

            
            let amount = [];
            for( const n in result.data.nutrition.nutrients ){
                console.log(n)
                amount.push( result.data.nutrition.nutrients[n].amount)
              for(let i = 0; i < amount.length; i++){
               
              }
                }
            
            let unit = [];
            for(const n in result.data.nutrition.nutrients ){
                console.log(n)
                unit.push (result.data.nutrition.nutrients[n].unit)
                for(let i = 0; i < unit.length; i++){
                  
                  }
                
            }

           let nutrientData = nutrient.map(function(value, index){
            return value + " " + amount[index] + " "+ unit[index]
           })
           console.log(nutrientData)

           
           let instructions = result.data.instructions.replace(/<[^>]*>?/gm, "");
        //    console.log(instructions.)
        //    console.log(instructions.replace("<li>", ""))
           
            
           return res.json({title :result.data.title,
           image: result.data.image,
            time: result.data.readyInMinutes,
            instructions: instructions,
            cuisines: result.data.cuisines,
            diets: result.data.diets,
            dishes: result.data.dishTypes,
            ingredients: ingredients,
            nutrients: nutrientData,
            id: result.data.id,
            servings: result.data.servings
    });
        
    }
    catch(err){
        return next(err);
    }
});



module.exports = router;