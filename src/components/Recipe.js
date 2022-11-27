import "./Recipe.css";
import { useState } from "react";

export default function Recipe({name, price, description, image, ingredients, addToCart}) {
    return (
        <div className="cardWrapper">
        <img className="image" src={image} alt="food" />
          <button onClick={() => addToCart(name, price, ingredients)} style={{maxWidth: "200px"}}>Add to Cart</button>  
        </div>
    );
  }
  