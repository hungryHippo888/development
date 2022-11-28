import './App.css';
import { Card } from '@mui/material';
import { React, useState } from "react";
import foodData from "./assets/food-data.json";
import Recipe from "./components/Recipe";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import Row from 'react-bootstrap/Row';

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState("");
  const [shoppingList, setIngredients] = useState(""); //convert this to an array later

  function addToCart(name, price, ingredients) {
    setCart(cart + name + ", ");
    setTotal(total + price);
    setIngredients(shoppingList + ingredients);
  }  

  return (
    <div className="App">
      <div className='header'>
      <h1>Brock's Breakfast Foods</h1> 
      </div>
      <button>Cost</button>
      <button>Calories</button>
      <div className="container">
      <Row>
      {foodData.map((item) => ( // TODO: map bakeryData to BakeryItem components
      <Recipe card = {item} name={item.name} description={item.description} price={item.price} calories = {item.calories} time={item.duration} image={item.image} ingredients={item.ingredients} addToCart={addToCart}></Recipe>
      ))}
      </Row>
      <h2>Cart</h2>
        {/* TODO: render a list of items in the cart */}
        <h2>Items: {cart}</h2>
        <h2>Cart Total: ${total}</h2>
        <h3>Ingredients: {shoppingList}</h3>
      </div>
    </div>    
  );
}

export default App;
