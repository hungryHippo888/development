import './App.css';
import { Card } from '@mui/material';
import { useState } from "react";
import foodData from "./assets/food-data.json";
import Recipe from "./components/Recipe";

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
      <h1>HungryHippo888's Recipes</h1> {/* TODO: personalize your bakery (if you want) */}
      {foodData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
      <Recipe name={item.name} description={item.description} price={item.price} image={item.image} ingredients={item.ingredients} addToCart={addToCart}></Recipe>
      ))}

      <div>
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
