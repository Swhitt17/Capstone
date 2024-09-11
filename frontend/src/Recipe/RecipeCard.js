import React from "react";
import {Link} from "react-router-dom";
import "./RecipeCard.css";
import { Col } from "reactstrap";

const RecipeCard = ({id,title,img}) => {

    return (
      <>
      <Col className="col-6">
        <div className="recipe-card">
        <div className="rcard-list">
            <article className="rcard">
        <Link to={`/recipes/${id}`}>
        <figure className="rcard-image">
           {img && <img src={img}
                  alt={title}/>}
        </figure>
            <div className="rcard-header">
                <h6 className="rcard-title">{title} </h6>
            </div>
        </Link>
        </article>
        </div>
        </div>
        </Col>
        </>
        
    );
}

export default RecipeCard;