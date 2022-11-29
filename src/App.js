import './App.css';
import { Card } from '@mui/material';
import { React, useState } from "react";
import foodData from "./assets/food-data.json";
import Recipe from "./components/Recipe";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';

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
    if(!filterByVegan){
    const filtered = filteredData.filter(item => item.isVegan === "true");
    setType("Vegan");
    setFilteredData(filtered);
  }
  else {
    // in this case, how should I revert it back?
    setFilteredData(foodData);
  }
  setFilterByVegan(!filterByVegan);
}

function filterIsGlutenFree() {
  if(!filterByGlutenFree){
    const filtered = filteredData.filter(item => item.isGlutenFree === "true");
    setType("IsGlutenFree");
    setFilteredData(filtered);
  }
  else {
    // in this case, how should I revert it back?
    setFilteredData(foodData);
  }
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

  const matchesFilterType = item => {
    // all items should be shown when no filter is selected
    if(type === "All") { 
      return true
    } else if (type === item.type) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className="App">
      <div className='header'>
      <h1>Brock's Breakfast Foods</h1> 
      </div>
      <Button onClick={() => filterIsVegan()} style = {{borderColor: "#7DAA92", borderWidth: "2px", backgroundColor: filterByVegan ? "#7DAA92" : "#FFF", color: filterByVegan ? "#FFF" : "#7DAA92"}}>Filter isVegan</Button>
      <Button onClick={() => filterIsGlutenFree()} style = {{borderColor: "#7DAA92", borderWidth: "2px", backgroundColor: filterByGlutenFree ? "#7DAA92" : "#FFF", color: filterByGlutenFree ? "#FFF" : "#7DAA92"}}>Filter by Gluten-Free</Button>
      <Button onClick={() => sortByPrice()}>Sort By Price</Button>
      <div className="container">
      <Row>
      {filteredData
      .filter((item) => {
        const matchesVegan = (filterByVegan ? (item.isVegan === "true") : true)
        const matchesIsGlutenFree = (filterByGlutenFree ? (item.isGlutenFree === "true") : true)
        return matchesVegan && matchesIsGlutenFree
      })
      .sort()
      .map((item) => ( // TODO: map bakeryData to BakeryItem components
      <Recipe card = {item} isGlutenFree={item.isGlutenFree} isVegan = {item.isVegan} name={item.name} description={item.description} price={item.price} calories = {item.calories} time={item.duration} image={item.image} ingredients={item.ingredients} addToCart={addToCart} removeFromTotal={removeFromTotal}></Recipe>
      ))}
      </Row>
      <h2>Cart</h2>
        <h2>Items: {cart}</h2>
        <h2>Cart Total: ${total}</h2>
        <h3>Total Calories: {calories}</h3>
      </div>
    </div>    
  );
}

export default App;
