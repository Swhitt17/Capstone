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

 
 

 if(!recipe) return <h3>Loading...</h3>

 return (
    <div className="RecipeDetail col-md offset-md-2">
        <h2 className="RecipeDetail-title">{recipe.title}</h2>
        <div>
           <img src={recipe.image} alt={recipe.title}/> 
        </div>
        
        <div>
            <h5 className="RecipeDetail-id"> Id: {recipe.id}</h5> 
        </div>
        
        <div>
            <h5 className="RecipeDetail-time"> Ready In: {recipe.time} minutes</h5>
        </div>

       <div className="RecipeDetail-ing-list">
           <ul className="RecipeDetail-ing"> Ingredients: 
            {recipe.ingredients.map((ingredient, i) =>(
               <li className="ing-item" key={i}>{ingredient}</li>

            ))}
            
            </ul>
        </div>

        <div>
            <h5 className="RecipeDetail-c"> Cuisines: {recipe.cuisines + ""}</h5>
        </div>

        <div>
           <h5 className="RecipeDetail-dt"> Diets: {recipe.diets + " "}</h5>
        </div>

        <div>
           <h5 className="RecipeDetail-ds"> Dishes: {recipe.dishes + " "}</h5>
        </div>
        
        <div>
             <p className="RecipeDetail-ins"> Instructions: {recipe.instructions}</p>
        </div>

        <div>
           <h5 className="RecipeDetail-s">Servings: {recipe.servings}</h5>
        </div>

        <div className="RecipeDetail-n-list">          
           <ul className="RecipeDetail-n">  Nutrients:
            {recipe.nutrients.map((nutrient, i) => (
               <li className='n-item' key={i}>{nutrient} </li>
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