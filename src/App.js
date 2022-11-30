import './App.css';
import { Card, duration } from '@mui/material';
import { React, useState } from "react";
import foodData from "./assets/food-data.json";
import Recipe from "./components/Recipe";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { FormGroup } from '@mui/material';

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState("");
  const [calories, setCalories] = useState(0);
  const [type, setType] = useState("All");
  const [filteredData, setFilteredData] = useState(foodData);
  const [filterByVegan, setFilterByVegan] = useState(false);
  const [filterByGlutenFree, setFilterByGlutenFree] = useState(false);
  const [priceSort, setSortByPrice] = useState(false);
  const [sortState, setSortState] = useState("none");
  const [favCart, showFavCart] = useState(false);
  const [favoritedItems, setFavoritedItems] = useState([]);
  const [shake, setShake] = useState(false);
  // const [favorited, setFavorited] = useState(false);

  // var filteredData = foodData;

  function addToCart(name, price, cals, img, duration, vegan, glutenFree, favorited) {
    // setCart(cart + name + ", ");
    setTotal(total + price);
    setCalories(calories + cals);
    const newItem = {
      "name": name,
      "price": price,
      "calories": cals,
      "image": img,
      "duration": duration,
      "variant": "click",
      "front": "click",
      "back": "Back",
      "isVegan": vegan,
      "isGlutenFree": glutenFree,
      "favorited": true
    };
    const newItems = [...favoritedItems, newItem];
    setFavoritedItems(newItems);
    const currItem = {
      "name": name,
      "price": price,
      "calories": cals,
      "image": img,
      "duration": duration,
      "variant": "click",
      "front": "click",
      "back": "Back",
      "isVegan": vegan,
      "isGlutenFree": glutenFree,
      "favorited": favorited
    };
    var updatedFilteredData = [...filteredData];
    updatedFilteredData[currItem] = newItem;
    console.log(updatedFilteredData[currItem]);
    setFilteredData(updatedFilteredData);
  } 
  
  function removeFromTotal(price, cals) {
    setTotal(total - price);
    setCalories(calories - cals);
  } 

  function filterIsVegan() {
  setFilterByVegan(!filterByVegan);
}

function filterIsGlutenFree() {
  setFilterByGlutenFree(!filterByGlutenFree);
}

function animate() {
  
  // Button begins to shake
  setShake(true);
  
  // Buttons stops to shake after 1 seconds
  setTimeout(() => setShake(false), 1000);
  
}

function resetItems() {
  setType("All");
  setSortState("none");
  setFilterByVegan(false);
  setFilterByGlutenFree(false);
  animate();
}

function goToFavorites() {
  showFavCart(!favCart);
}

const sortMethods = {
  none: { method: (a, b) => {
    return a - b
  }},
  price: { method: (a, b) => {
    return a.price - b.price
  }},
  calories: { method: (a, b) => {
    return a.calories - b.calories
  }}
}

  return (
    <div className="App">
      <div className='header'>
      <h1>Brock's Breakfast Foods</h1> 
      </div>
      <div className="contentFlex">
      <div className="verticalMenu">
        <h2>Filter By</h2>
      <Button onClick={() => goToFavorites()}>Show Favorite Cart</Button>
      <Button onClick={() => filterIsVegan()} style = {{borderColor: "#7DAA92", borderWidth: "2px", backgroundColor: filterByVegan ? "#7DAA92" : "#FFF", color: filterByVegan ? "#FFF" : "#7DAA92", margin: "10px"}}>Vegan Options</Button>
      <Button onClick={() => filterIsGlutenFree()} style = {{borderColor: "#7DAA92", borderWidth: "2px", backgroundColor: filterByGlutenFree ? "#7DAA92" : "#FFF", color: filterByGlutenFree ? "#FFF" : "#7DAA92", margin: "10px"}}>Gluten-Free Options</Button>
      {/* <Button onClick={() => filterIsGlutenFree()} style = {{borderColor: "#7DAA92", borderWidth: "2px", backgroundColor: filterByGlutenFree ? "#7DAA92" : "#FFF", color: filterByGlutenFree ? "#FFF" : "#7DAA92", margin: "10px"}}>Favorited Options</Button> */}
      <Button onClick={() => resetItems()} style = {{borderColor: "#680C07", borderWidth: "2px", backgroundColor: "#680C07", color: "#FFF", margin: "10px"}} className = {shake ? `shake` : null}>Reset All Filters</Button>
      {/* <Button onClick={() => resetItems()} style = {{borderColor: "#680C07", borderWidth: "2px", backgroundColor: "#680C07", color: "#FFF", margin: "10px"}}>Reset all Items</Button> */}
      <h2>Sort By</h2>
      <select defaultValue={'DEFAULT'} onChange={(e) => setSortState(e.target.value)}>
        <option value="DEFAULT" disabled>None</option>
        <option value="price">price</option>
        <option value="calories">calories</option>
      </select>
      <h3>Total Calories: {calories}</h3>
      </div>
      <div className="container">
      <Row>
      {(favCart ? favoritedItems: filteredData)
      .filter((item) => {
        const matchesVegan = (filterByVegan ? (item.isVegan === "true") : true)
        const matchesIsGlutenFree = (filterByGlutenFree ? (item.isGlutenFree === "true") : true)
        return matchesVegan && matchesIsGlutenFree
      })
      .sort( 
        sortMethods[sortState].method
      )      
      .map((item) => (
      <Recipe card = {item} favorited={item.favorited} isGlutenFree={item.isGlutenFree} isVegan = {item.isVegan} name={item.name} description={item.description} price={item.price} calories = {item.calories} time={item.duration} image={item.image} ingredients={item.ingredients} addToCart={addToCart} removeFromTotal={removeFromTotal}></Recipe>
      ))}
      </Row>
      </div>
    </div>
    </div>    
  );
}

export default App;
