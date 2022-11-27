import "./Recipe.css";
import { useState } from "react";

function Recipe({name, price, description, image, ingredients, flipped, addToCart, flipCard}) {
  return (
        <div className="cardWrapper" onClick={() => flipCard(flipped)}>
          <div className={flipped ? "flipped" : ""}>
          <img className="image front" src={image} alt="food"/>
          <h1 className="back">hello</h1>
          <button onClick={() => addToCart(name, price, ingredients)} style={{maxWidth: "200px"}}>Add to Cart</button>  
        </div>
        </div>
    );
  }
  
export default Recipe;
