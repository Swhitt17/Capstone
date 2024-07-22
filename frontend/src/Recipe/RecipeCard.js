import React from "react";
import {Link} from "react-router-dom";
// import "./RecipeCard.css";

const RecipeCard = ({id,title,img}) => {

    return (
        <Link className="RecipeCard card" to={`/recipes/${id}`}>
            
            <div className="card-body">
                <h6 className="card-title">
                  {title}
                  <div>
                   {img && <img src={img}
                  alt={title}
                  className="float-right ml-5"
                  />}</div>
                  </h6>

                  
                  {/* <p>{id}</p>  */}
                
        
            </div>
        </Link>
    );
}

export default RecipeCard;