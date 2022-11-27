import './App.css';
import { Card } from '@mui/material';
import { useState } from "react";
import foodData from "./assets/food-data.json";
import Recipe from "./components/Recipe";
import FlipCard from "./components/FlipCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

const cards = [
  {
    id: "1",
    variant: "hover",
    front: "Hover",
    back: "Back"
  },
  {
    id: "2",
    variant: "click",
    front: "Click",
    back: "Back"
  },
  {
    id: "3",
    variant: "focus",
    front: "Focus",
    back: "Back"
  }
];

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [flipped, setFlip] = useState(false);  
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState("");
  const [shoppingList, setIngredients] = useState(""); //convert this to an array later

  function addToCart(name, price, ingredients) {
    setCart(cart + name + ", ");
    setTotal(total + price);
    setIngredients(shoppingList + ingredients);
  }  

  function flipCard(flipped) {
    setFlip(true);
  }

  return (
    <div className="App">
      <h1>HungryHippo888's Recipes</h1> {/* TODO: personalize your bakery (if you want) */}
      <button>Cost</button>
      <button>Calories</button>

      {foodData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
      <Recipe name={item.name} description={item.description} price={item.price} image={item.image} ingredients={item.ingredients} flipped = {item.flipped} flipCard = {flipCard} addToCart={addToCart}></Recipe>
      ))}

      <div>
        <h2>Cart</h2>
        {/* TODO: render a list of items in the cart */}
        <h2>Items: {cart}</h2>
        <h2>Cart Total: ${total}</h2>
        <h3>Ingredients: {shoppingList}</h3>
      </div>
      <div className="container">
      <div className="row h-100">
        <div class="col d-flex flex-column flex-md-row justify-content-around align-items-center">
          {cards.map((card) => (
            <FlipCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default App;
