import React,{useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import CapstoneApi from "../Api";
import "./RecipeDetail.css"

const RecipeDetail = () => {
 const {id} = useParams();
 const [recipe, setRecipe] = useState(null);

 useEffect(function getRecipesOnMount(){
    async function getRecipe(){
        setRecipe(await CapstoneApi.getRecipe(id));
    }
    getRecipe();
 },[id])

 console.log(recipe)
 

 if(!recipe) return <h3>Loading...</h3>

 return (
    <div className="RecipeDetail col-md offset-md-2">
        <h3>{recipe.title}</h3>
        <div>
           <img src={recipe.image} alt={recipe.title}/> 
        </div>
        
        <div>
            <p> Id: {recipe.id}</p> 
        </div>
        
        <div>
            <h5> Cooking Time: {recipe.time} minutes</h5>
        </div>

       <div>
           <ul> Ingredients: 
            {recipe.ingredients.map((ingredient, i) =>(
               <li key={i}>{ingredient}</li>

            ))}
            
            </ul>
        </div>

        <div>
            <h5> Cuisines:{recipe.cuisines + ""}</h5>
        </div>

        <div>
           <h5> Diets: {recipe.diets + " "}</h5>
        </div>

        <div>
           <h5> Dishes: {recipe.dishes + " "}</h5>
        </div>
        
        <div>
             <h5> Instructions: {recipe.instructions}</h5>
        </div>

        <div>          
           <ul>  Nutrients:
            {recipe.nutrients.map((nutrient, i) => (
               <li key={i}>{nutrient} </li>
            ))}
            
            </ul>
        </div>

        {/* <div>
          <h5></h5>
        </div>
        <div>
          <h5></h5>
        </div> */}
       
    </div>
 )
}

export default RecipeDetail;