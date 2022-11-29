import "./Recipe.css";
import { useState } from "react";
import cn from "classnames";
import { Button } from '@mui/material';
import costIcon from "../icons/costIcon.svg";
import caloriesIcon from "../icons/caloriesIcon.png";
import timeIcon from "../icons/timeIcon.svg";
import veganIcon from "../icons/veganIcon.png";
import glutenFreeIcon from "../icons/gluten-free.png";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Icon } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Recipe({
  name,
  price,
  description,
  image,
  calories,
  time,
  addToCart,
  removeFromTotal,
  isVegan,
  isGlutenFree,
  card,
}) {
  const [showBack, setShowBack] = useState(false);
  const [favorited, setFavorited] = useState(false);

  function handleClick() {
    setShowBack(!showBack);
  }

  function handleFocus() {
    if (card.variant === "focus") {
      setShowBack(true);
    }
  }

  function handleBlur() {
    if (card.variant === "focus") {
      setShowBack(false);
    }
  }

  function favoritedItem(e) {
    e.stopPropagation();
    if(!favorited) {
      addToCart(name, price, calories);
      setFavorited(!favorited);
    }
    else {
      removeFromTotal(price, calories);
      setFavorited(!favorited);
    }
  }

  return (

    <>
    <div
      tabIndex={card.id}
      className="flip-card-outer"
      onClick={() => setShowBack(!showBack)}
    >
      <div
        className={cn("flip-card-inner", {
          showBack,
          "hover-trigger": card.variant === "hover",
        })}
      >
        <div className="card front">
          <div className="card-body d-flex justify-content-center align-items-center" style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover",
      backgroundImage: `url(${image})`, borderRadius: "20px", backgroundPosition: "right 0px bottom 0px"}}>
            <FavoriteIcon isActive={favorited} onClick={(e) => favoritedItem(e)} style={{position: "absolute", top: "15px", right: "15px", color: favorited ? "red" : "white"}}></FavoriteIcon>
            <p className="card-text fs-1 fw-bold" style={{position: "absolute", bottom: "0"}}>{name}</p>
          </div>
        </div>
        <div className="card back">
          <div className="card-body container justify-content-center align-items-center">
            <Row>
            <img className="image" src={costIcon} alt="costIcon" style={{width: "25%", height: "25%", paddingTop: "15px"}}/>
            <Col>
            <p className="card-text fs-2 fw-bold" style={{paddingTop: "15px"}}>${price}</p>
            </Col>
            </Row>
            <Row>
            <img className="image" src={caloriesIcon} alt="caloriesIcon" style={{width: "25%", height: "25%", paddingTop: "15px"}}/>
            <Col>
            <p className="card-text fs-2 fw-bold" style={{paddingTop: "15px"}}>{calories} calories</p>
            </Col>
            </Row>
            <Row>
            <img className="image" src={timeIcon} alt="timeIcon" style={{width: "25%", height: "25%", paddingTop: "15px"}}/>
            <Col>
            <p className="card-text fs-2 fw-bold" style={{paddingTop: "15px"}}>{time}</p>
            </Col>
            </Row>
            <Row>
            {(isGlutenFree === "true") && <img className="image" src={glutenFreeIcon} alt="glutenFreeIcon" style={{width: "25%", height: "25%", paddingTop: "15px", margin: "auto"}}/>}
            {(isVegan === "true") && <img className="image" src={veganIcon} alt="veganIcon" style={{width: "25%", height: "25%", paddingTop: "15px", margin: "auto"}}/>}
            </Row>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Recipe;