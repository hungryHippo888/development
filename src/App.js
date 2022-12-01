import './App.css';

import { Card, duration } from '@mui/material';
import { React, useState } from "react";
import foodData from "./assets/food-data.json";
import FoodItem from "./components/MenuItem";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import {FormControl, InputLabel, MenuItem, Select, createMuiTheme, ThemeProvider } from '@mui/material';

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [total, setTotal] = useState(0);
  const [calories, setCalories] = useState(0);
  const [type, setType] = useState("All");
  const [filteredData, setFilteredData] = useState(foodData);
  const [filterByVegan, setFilterByVegan] = useState(false);
  const [filterByGlutenFree, setFilterByGlutenFree] = useState(false);
  const [sortState, setSortState] = useState("none");
  const [favCart, showFavCart] = useState(false);
  const [favoritedItems, setFavoritedItems] = useState([]);
  const [shake, setShake] = useState(false);
  const [filterCal, setFilterCal] = useState(false);

  const theme = createMuiTheme({
     palette: {
      primary: {
        main: '#FFF'
      },
      secondary: {
        main: '#FFF'
      },
      action: {
        active: "#8E4A49",
        selected: "#7DAA92",
        disabled: "#7DAA92",
        disabledBackground: "#7DAA92",
      },
      text: {
        primary: "#FFF",
        secondary: "#FFF"
      },
      background: {
        paper: '#8E4A49',
        default: '#8E4A49',
        defaultChannel: '#8E4A49'
      },
      typography: {
        fontFamily: "Ubuntu, sans-serif"
      },
     },
     shape: {
      borderRadius: 20
     }
  })

  function addToCart(name, price, cals, img, duration, vegan, glutenFree, favorited) {
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
    var updatedFilteredData = [...filteredData];
    const index = updatedFilteredData.findIndex(item => {
      return item.name === name;
    });
    updatedFilteredData[index] = newItem;
    setFilteredData(updatedFilteredData);
  } 
  
  function removeFromTotal(name, price, cals, img, duration, vegan, glutenFree, favorited) {
    setTotal(total - price);
    setCalories(calories - cals);
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
      "favorited": false
    };
    var updatedFilteredData = [...filteredData];
    const index = updatedFilteredData.findIndex(item => {
      return item.name === name;
    });
    updatedFilteredData[index] = newItem;
    setFilteredData(updatedFilteredData);
    const newFavoritedItems = favoritedItems.filter(item => {return item.name !== name}); 
    setFavoritedItems(newFavoritedItems);
  } 

  function filterIsVegan() {
  setFilterByVegan(!filterByVegan);
}

function filterIsGlutenFree() {
  setFilterByGlutenFree(!filterByGlutenFree);
}

function filterCalories() {
  setFilterCal(!filterCal);
}

function animate() {
  setShake(true);
  setTimeout(() => setShake(false), 1000);
}

function resetItems() {
  setType("All");
  setSortState("none");
  setFilterByVegan(false);
  setFilterByGlutenFree(false);
  setFilterCal(false);
  showFavCart(false);
  // setFavoritedItems([]);
  // setFilteredData(foodData);
  // setCalories(0);
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
      <Button onClick={() => filterCalories()} style = {{borderColor: "#7DAA92", borderWidth: "2px", backgroundColor: filterCal ? "#7DAA92" : "#FFF", color: filterCal ? "#FFF" : "#7DAA92"}}>Less than 250 Calories</Button>
      <Button onClick={() => filterIsVegan()} style = {{borderColor: "#7DAA92", borderWidth: "2px", backgroundColor: filterByVegan ? "#7DAA92" : "#FFF", color: filterByVegan ? "#FFF" : "#7DAA92"}}>Vegan Options</Button>
      <Button onClick={() => filterIsGlutenFree()} style = {{borderColor: "#7DAA92", borderWidth: "2px", backgroundColor: filterByGlutenFree ? "#7DAA92" : "#FFF", color: filterByGlutenFree ? "#FFF" : "#7DAA92"}}>Gluten-Free Options</Button>
      <Button onClick={() => goToFavorites()} style = {{borderColor: "#8E4A49", borderWidth: "2px", backgroundColor: favCart ? "#8E4A49" : "#FFF", color: favCart ? "#FFF" : "#8E4A49"}}>{favCart ? "Show All" : "Show Favorites"}</Button>
      <h2>Sort By</h2>
      <ThemeProvider theme={theme}>
      <FormControl fullWidth variant='filled' disableTypography>
  <InputLabel>Sort Filter</InputLabel>
  <Select onChange={(e) => setSortState(e.target.value)} value={sortState}>
    <MenuItem value="none">Popular (Default)</MenuItem>
    <MenuItem value="price">Price</MenuItem>
    <MenuItem value="calories">Calories</MenuItem>
  </Select>
</FormControl>
</ThemeProvider>
      <Button onClick={() => resetItems()} style = {{borderColor: "#680C07", borderWidth: "2px", backgroundColor: "#680C07", color: "#FFF", margin: "10px"}} className = {shake ? `shake` : null}>Reset All Filters</Button>
      <div>
      <h3>Total Calories:</h3>
      <h3>{calories}</h3>
      </div>
      </div>
      <div className="container">
      <Row>
      {(favCart ? favoritedItems: filteredData)
      .filter((item) => {
        const matchesVegan = (filterByVegan ? (item.isVegan === "true") : true)
        const matchesIsGlutenFree = (filterByGlutenFree ? (item.isGlutenFree === "true") : true)
        const filterByCal = (filterCal ? (item.calories < 250) : true)
        return matchesVegan && matchesIsGlutenFree && filterByCal
      })
      .sort( 
        sortMethods[sortState].method
      )      
      .map((item) => (
      <FoodItem card = {item} favorited={item.favorited} isGlutenFree={item.isGlutenFree} isVegan = {item.isVegan} name={item.name} description={item.description} price={item.price} calories = {item.calories} time={item.duration} image={item.image} ingredients={item.ingredients} addToCart={addToCart} removeFromTotal={removeFromTotal}></FoodItem>
      ))}
      </Row>
      </div>
    </div>
    </div>    
  );
}

export default App;