import React, {useState,useEffect} from 'react';
import RecipeCard from "./RecipeCard";
import CapstoneApi from "../Api";
import SearchForm from "../Forms/SearchForm";
import Paginate from './Paginate';



const RecipeList = () => {
    
    const [recipes, setRecipes] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const [cu, setCuisine] = useState("");
    const [dt, setDiet] = useState("");
    const [ds, setDish] = useState("");
    const [ti, setTitle] = useState("")
    
    

    useEffect(function getRecipesOnMount(){
        console.debug("RecipeList useEffect getRecipesOnMount")
        search();
    },[])
    

    async function search({cuisine, diet,dish, title}){
        console.log(cuisine, "cuisine, search");
        console.log(dish, "dish")
        console.log(dish, "dish")
        console.log(title, "title"); 
        setCuisine(cuisine);
        setDiet(diet);
        setDish(dish);
        setTitle(title)
        let recipesRes = await CapstoneApi.getRecipes(cuisine, diet,dish, title,itemOffset);
        setRecipes(recipesRes);
        console.log(recipesRes, "recipesR")
        setItemOffset(recipesRes.offset)
       

       

        console.log(recipesRes.totalResults)
        console.log(recipesRes.offset)
         console.log(cu, "cuisine")
        console.log(dt, "diet")
        console.log(ds, "dish")
        console.log(ti, "title")
      
    }

    async function handleClick(itemOffset){
        // let recipes = await CapstoneApi.getRecipes(cuisine, diet,dish, title,time,itemOffset);
        console.log(itemOffset, "offset")
        setItemOffset(itemOffset)
        let recipesArray = await CapstoneApi.getRecipes(cu, dt,ds, ti,itemOffset);
        // console.log(cuisine,diet,dish, title, "recipesRes")
        setRecipes(recipesArray);
        console.log(cu, "cuisine")
        console.log(dt, "diet")
        console.log(ds, "dish")
        console.log(ti, "title")

    }


    if(!recipes)return  <SearchForm search={search}/>

    return (
        <div>
            
            <div className='RecipeList col-md-8 offset-md-2'>
                <h2 style={{textShadow: "2px 2px 2px white" }}>Recipes</h2>
            <SearchForm search={search}/>
            <div className='RecipeList-list'>

            {recipes.results.length ? (
                <div>
                {recipes.results.map(r => (
                    <RecipeCard 
                    key={r.id}
                    id={r.id} 
                    img={r.image}
                    title={r.title}
                 
                    />
                ))}

                <Paginate
                recipes={recipes.results}
                totalResults={recipes.totalResults}
                itemsPerPage={50}
                itemOffset={itemOffset}
                setItemOffset={setItemOffset}
                handleClick={handleClick}
               
                />
                </div>
            ):(
                <p>Sorry, Cannot find any results</p>
            )}
              </div>
            </div>
        </div>
    );
}

export default RecipeList;