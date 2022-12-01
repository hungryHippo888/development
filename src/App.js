import './App.css';

import { Card, duration } from '@mui/material';
import { React, useState } from "react";
import foodData from "./assets/food-data.json";
import Recipe from "./components/Recipe";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { FormGroup, FormControl, InputLabel, MenuItem, Select, createMuiTheme, ThemeProvider } from '@mui/material';
import { dark } from '@mui/material/styles/createPalette';

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
    const index = updatedFilteredData.findIndex(item => {
      return item.name === name;
    });
    updatedFilteredData[index] = newItem;
    setFilteredData(updatedFilteredData);
    console.log(index);
    console.log(updatedFilteredData);
    
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
  setFavoritedItems([]);
  setFilteredData(foodData);
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
      <Button onClick={() => filterIsVegan()} style = {{borderColor: "#7DAA92", borderWidth: "2px", backgroundColor: filterByVegan ? "#7DAA92" : "#FFF", color: filterByVegan ? "#FFF" : "#7DAA92"}}>Vegan Options</Button>
      <Button onClick={() => filterIsGlutenFree()} style = {{borderColor: "#7DAA92", borderWidth: "2px", backgroundColor: filterByGlutenFree ? "#7DAA92" : "#FFF", color: filterByGlutenFree ? "#FFF" : "#7DAA92"}}>Gluten-Free Options</Button>
      <Button onClick={() => goToFavorites()} style = {{borderColor: "#8E4A49", borderWidth: "2px", backgroundColor: favCart ? "#8E4A49" : "#FFF", color: favCart ? "#FFF" : "#8E4A49"}}>{favCart ? "Show All" : "Show Favorites"}</Button>
      <h2>Sort By</h2>
      {/* <select defaultValue={'none'} onChange={(e) => setSortState(e.target.value)}>
        <option value="none">Popular</option>
        <option value="price">Price</option>
        <option value="calories">Calories</option>
      </select> */}
      <ThemeProvider theme={theme}>
      <FormControl fullWidth variant='filled' disableTypography	sx={{}}>
  <InputLabel>Sort Filter</InputLabel>
  <Select
    onChange={(e) => setSortState(e.target.value)}
  >
    <MenuItem value="none">Popular</MenuItem>
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
