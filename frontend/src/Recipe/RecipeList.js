import React, {useState,useEffect} from 'react';
import RecipeCard from "./RecipeCard";
import CapstoneApi from "../Api";
import SearchForm from "../Forms/SearchForm";
import Paginate from './Paginate';
import { Row } from 'reactstrap';
import "./RecipeList.css"



const RecipeList = () => {
    
    const [recipes, setRecipes] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const [cu, setCuisine] = useState("");
    const [dt, setDiet] = useState("");
    const [ds, setDish] = useState("");
    const [il, setIntolerance] = useState("");
    const [ti, setTitle] = useState("");
    
    

    useEffect(function getRecipesOnMount(){
        console.debug("RecipeList useEffect getRecipesOnMount")
        search();
    },[])
    

    async function search({cuisine, diet,dish,intolerance, title}){
        console.log(cuisine, "cuisine");
        console.log(diet, "diet")
        console.log(dish, "dish")
        console.log(intolerance, "intolerance")
        console.log(title, "title"); 
        setCuisine(cuisine);
        setDiet(diet);
        setDish(dish);
        setIntolerance(intolerance)
        setTitle(title);
        let recipesRes = await CapstoneApi.getRecipes(cuisine, diet,dish,intolerance, title,itemOffset);
        console.log(typeof(recipesRes))
        setRecipes(recipesRes);
        setItemOffset(recipesRes.offset)
       
    }

    async function handleClick(itemOffset){
        console.log(itemOffset, "offset")
        setItemOffset(itemOffset)
        let recipesArray = await CapstoneApi.getRecipes(cu, dt,ds, il, ti,itemOffset);
        setRecipes(recipesArray);
        console.log(cu, "cuisine");
        console.log(dt, "diet");
        console.log(ds, "dish");
        console.log(il, "intolerance");
        console.log(ti, "title");
    }

    console.log(typeof(recipes))
    if(!recipes)return  <SearchForm search={search}/>
    //

    return (
        <div>
            <div className='RecipeList col-md-8 offset-md-2'>
                <h2 className='Recipelist-title'>Recipes</h2>
            <SearchForm search={search}/>
            <div className='RecipeList-list'>
                <div className='row'>

            {recipes.results.length ? (
                <div>
                    <Row lg={3}>
                {recipes.results.map(r => (
                    <RecipeCard 
                    key={r.id}
                    id={r.id} 
                    img={r.image}
                    title={r.title}
                 
                    />
                ))}
                 </Row >

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
                <h3 style={{color: "white",textShadow: "2px 2px 2px black" }} >Sorry, Cannot find any results</h3>
            )}
              </div>
            </div>
            </div>
        </div>
    );
}

export default RecipeList;