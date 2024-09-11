import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HomeCards.css"


const HomeCards = () => {

    return (
        <div className="card-deck">
           <Link className="HomeCard card" to={`/recipes`}>
  <div className=" Home-card">
    
    <div className="card-body">
      <h5 className="card-title"><FontAwesomeIcon icon="fa-solid fa-plate-wheat" size="xl" /></h5>
      <p className="card-text">Recipes</p>
    </div>
  </div>
</Link>
  
  <Link className="HomeCard card" to={`/mealplans`}>
  <div className="Home-card">
    <div className="card-body">
      <h5 className="card-title"><FontAwesomeIcon icon="fa-regular fa-calendar-days" size="xl" /></h5>
      <p className="card-text">Meal Plans</p>
    </div>
  </div>
</Link>

<Link className="HomeCard card" to={`/lists`}>
  <div className="Home-card">
    
    <div className="card-body">
      <h5 className="card-title"><FontAwesomeIcon icon="fa-regular fa-clipboard" size="xl"/></h5>
      <p className="card-text">Shopping Lists</p>
    </div>
  </div>
  </Link>
</div>
       
    );
}

export default HomeCards;