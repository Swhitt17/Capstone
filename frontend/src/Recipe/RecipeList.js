import React, {useState,useEffect} from 'react';
import RecipeCard from "./RecipeCard";
// import RecipeDetail from "./RecipeDetail"
import CapstoneApi from "../Api";
import SearchForm from "../Forms/SearchForm";
// import Paginate from './Paginate';
import ReactPaginate from 'react-paginate';


const RecipeList = () => {
    const initialState = [];
    const [recipes, setRecipes] = useState(null);
    const [data, setData] = useState(initialState);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const resultsPerPage = 50;

    useEffect(function getRecipesOnMount(){
        console.debug("RecipeList useEffect getRecipesOnMount")
        search();
    },[])

    async function search({cuisine, diet}){
        console.log(cuisine, "cuisine")
        console.log(diet, "diet")
        let recipes = await CapstoneApi.getRecipes(cuisine, diet);
        setRecipes(recipes);
        setData(recipes.results)
        console.log(recipes.results)
         setTotalPages(Math.ceil(recipes.totalResults / resultsPerPage));
        console.log(recipes.totalResults);
    }


        
  
    // console.log(typeof(data))

   

    const handlePageChange = (selectedPage) => {
     const startIndex = currentPage * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const currentResults = data.slice(startIndex, endIndex);
    setData(currentResults)
        setCurrentPage(selectedPage.selected);
        console.log(selectedPage)
    }

    if(!recipes)return <h3> Loading... </h3>

    return (
        <div>
            <h2>Recipes</h2>
            <SearchForm search={search}/>

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
{/* 
                {currentResults.map((result) => (
                    <div key={result.id}>{result.title}</div>
                ))} */}
                <ReactPaginate
                pageCount={totalPages}
                onPageChange={handlePageChange}
                forcePage={currentPage}
                
                />
                </div>
            ):(
                <p>Sorry, Cannot find any results</p>
            )}
        </div>
    );
}

export default RecipeList;