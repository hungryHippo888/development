import './App.css';
import { Card } from '@mui/material';
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

  // var filteredData = foodData;

  function addToCart(name, price, cals) {
    // setCart(cart + name + ", ");
    setTotal(total + price);
    setCalories(calories + cals);
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

function sortByPrice() {
  if(!priceSort) {
  const filtered = filteredData.sort((a, b) => {
    return a.price - b.price;
  });
  setFilteredData(filtered);
  }
  else {
    setFilteredData(foodData);
  }
  setSortByPrice(!priceSort);
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
      <Button onClick={() => filterIsVegan()} style = {{borderColor: "#7DAA92", borderWidth: "2px", backgroundColor: filterByVegan ? "#7DAA92" : "#FFF", color: filterByVegan ? "#FFF" : "#7DAA92"}}>Filter isVegan</Button>
      <Button onClick={() => filterIsGlutenFree()} style = {{borderColor: "#7DAA92", borderWidth: "2px", backgroundColor: filterByGlutenFree ? "#7DAA92" : "#FFF", color: filterByGlutenFree ? "#FFF" : "#7DAA92"}}>Filter by Gluten-Free</Button>
      {/* <Button onClick={() => sortByPrice()}>Sort By Price</Button> */}
      <select defaultValue={'DEFAULT'} onChange={(e) => setSortState(e.target.value)}>
        <option value="DEFAULT" disabled>None</option>
        <option value="price">price</option>
        <option value="calories">calories</option>
      </select>
      <div className="container">
      <Row>
      {filteredData
      .filter((item) => {
        const matchesVegan = (filterByVegan ? (item.isVegan === "true") : true)
        const matchesIsGlutenFree = (filterByGlutenFree ? (item.isGlutenFree === "true") : true)
        return matchesVegan && matchesIsGlutenFree
      })
      .sort( 
        sortMethods[sortState].method
      )      
      .map((item) => ( // TODO: map bakeryData to BakeryItem components
      <Recipe card = {item} isGlutenFree={item.isGlutenFree} isVegan = {item.isVegan} name={item.name} description={item.description} price={item.price} calories = {item.calories} time={item.duration} image={item.image} ingredients={item.ingredients} addToCart={addToCart} removeFromTotal={removeFromTotal}></Recipe>
      ))}
      </Row>
      <h2>Cart</h2>
        {/* <h2>Items: {cart}</h2>
        <h2>Cart Total: ${total}</h2> */}
        <h3>Total Calories: {calories}</h3>
      </div>
    </div>    
  );
}

export default App;
