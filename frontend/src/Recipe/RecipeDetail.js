import React,{useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import CapstoneApi from "../Api";
import "./RecipeDetail.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <header>
         <div className="head-text">
         <div>
           <img className="RecipeDetail-img" src={recipe.image} alt={recipe.title}/> 
        </div>
         <div>
            <h5 className="RecipeDetail-id"> Id: {recipe.id}</h5> 
        </div>
         <div>
            <h5 className="RecipeDetail-time"><FontAwesomeIcon icon="fa-solid fa-clock" /> {recipe.time} minutes</h5>
        </div>     
         <div>
           <h5 className="RecipeDetail-s"><FontAwesomeIcon icon="fa-solid fa-utensils" /> {recipe.servings} servings</h5>
        </div>

      </div>
        </header>
       
      
       

       <div className="RecipeDetail-ing-list">
         <div className="RecipeDetail-sign">
            <h2 className="RecipeDetail-header">Ingredients</h2>
         </div>
         
           <ul className="RecipeDetail-ing"> 
            {recipe.ingredients.map((ingredient, i) =>(
               <li className="ing-item" key={i}>{ingredient}</li>

            ))}
            
            </ul>
            
        </div>

      <div className="RecipeDetail-container">
        <div>
            <h5 className="RecipeDetail-c"> Cuisines: {recipe.cuisines + ""}</h5>
        </div>

        <div>
           <h5 className="RecipeDetail-dt"> Diets: {recipe.diets + " "}</h5>
        </div>

        <div>
           <h5 className="RecipeDetail-ds"> Dishes: {recipe.dishes + " "}</h5>
        </div>
        </div>
      
         
         <div className="RecipeDetail-instructions">
            <div className="RecipeDetail-sign" >
            <h2 className="RecipeDetail-header">Instructions</h2>
            </div>
         <ol className="RecipeDetail-ain"> 
            {recipe.ainstructions.map((step,index) =>(
               <div key={index}>
                  {step.steps.map((s,i)=>(
                      <li className="ain-item" key={i}>Step {s.number} 
                      <p className="ain-step">{s.step}</p>
                      </li>
                  ))}
                  
               </div>
               
         
            ))}
         </ol>
         
        </div>  

        <div className="table-container">
         <table className="RecipeDetail-nutrition-table">
            <thead className="table-head">
               <tr>
                  <th className="table-head-title">Nutrition Facts </th>
               </tr>
                <tr>
                  <th className="table-head-subtitle">
                     <span className="table-head-pretext">Servings: </span>
                     <span>{recipe.servings}</span>
                  </th>
               </tr>
            </thead>
            <tbody className="table-body">
               <tr className="table-empty"> Empty </tr>
               {recipe.nutrients.map((nutrient, i) => (
                  <tr index={i}>
                    <td className='n-item' key={i}>{nutrient}</td>
                  </tr>
            ))}
            </tbody>
         </table>
        </div>


       
    </div>
 )
}

export default RecipeDetail;