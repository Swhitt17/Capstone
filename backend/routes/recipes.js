/** Routes for recipes */


const express = require("express");
const axios = require("axios");





const BASE_URL = "https://api.spoonacular.com"
const API_KEY = "f2c5d0c51e4c4a7ea7703510f392eb82";

const router = new express.Router();



/** GET */

router.get("/", async function(req,res,next){
    
    const cuisine = req.query.cuisine;
    const diet = req.query.diet
    console.log(diet, "diet")
    // const cuisine = req.query.cuisine
    console.log(cuisine, "cuisine")
    // if(q.minServings !== undefined) q.minServings = +q.minServings;
    // if(q.maxServings !== undefined) q.maxServings = +q.maxServings;

    try{
        const result = await axios.get(
            `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cuisine}&diet=${diet}&number=50`);
        //   console.log(result.data, "result")
          
         return res.json(result.data)
    }
    catch(err){
        return next(err);
    }
});


/** GET [id] */

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
                // for(let i = 0; i < ingredients.length; i++){
                //     // console.log(nutrient[i])
                //   }

            }

            
            let nutrient = [];
            for( const n in result.data.nutrition.nutrients ){
                console.log(n)
                nutrient.push( result.data.nutrition.nutrients[n].name)
                for(let i = 0; i < nutrient.length; i++){
                    // console.log(nutrient[i])
                  }
             
            }

            
            let amount = [];
            for( const n in result.data.nutrition.nutrients ){
                console.log(n)
                amount.push( result.data.nutrition.nutrients[n].amount)
              for(let i = 0; i < amount.length; i++){
                // console.log(amount[i])
              }
                }
            
            let unit = [];
            for(const n in result.data.nutrition.nutrients ){
                console.log(n)
                unit.push (result.data.nutrition.nutrients[n].unit)
                for(let i = 0; i < unit.length; i++){
                    // console.log(unit[i])
                  }
                
            }

           let nutrientData = nutrient.map(function(value, index){
            return value + " " + amount[index] + " "+ unit[index]
           })
           console.log(nutrientData)

            // let nutrientString = nutrient + amount + unit
            // console.log( nutrientString, "string")

            
           return res.json({title :result.data.title,
           image: result.data.image,
            time: result.data.readyInMinutes,
            instructions: result.data.instructions,
            cuisines: result.data.cuisines,
            diets: result.data.diets,
            dishes: result.data.dishTypes,
            ingredients: ingredients,
            nutrients: nutrientData,
            id: result.data.id
    });
        
    }
    catch(err){
        return next(err);
    }
});



module.exports = router;