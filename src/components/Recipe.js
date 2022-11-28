import "./Recipe.css";
import { useState } from "react";
import cn from "classnames";
import { Button } from '@mui/material';
import costIcon from "../icons/costIcon.svg";
import caloriesIcon from "../icons/caloriesIcon.png";
import timeIcon from "../icons/timeIcon.svg";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Recipe({
  name,
  price,
  description,
  image,
  calories,
  ingredients,
  time,
  addToCart,
  card,
}) {
  const [showBack, setShowBack] = useState(false);

  function handleClick() {
    if (card.variant === "click") {
      setShowBack(!showBack);
    }
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

//   <div className="cardWrapper" onClick={() => flipCard(flipped)}>
//   <h1 className="back">hello</h1>
// </div>
// </div>

  return (

    <>
    <div
      tabIndex={card.id}
      className={cn("flip-card-outer", {
        "focus-trigger": card.variant === "focus",
      })}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
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
            <p className="card-text fs-1 fw-bold" style={{position: "absolute", bottom: "0"}}>{name}</p>
          </div>
        </div>
        <div className="card back">
          <div className="card-body container justify-content-center align-items-center">
            <Row>
            <img className="image" src={costIcon} alt="costIcon" style={{width: "25%", height: "25%", padding: "15px"}}/>
            <Col>
            <p className="card-text fs-1 fw-bold" style={{padding: "15px"}}>${price}</p>
            </Col>
            </Row>
            <Row>
            <img className="image" src={caloriesIcon} alt="caloriesIcon" style={{width: "25%", height: "25%", padding: "15px"}}/>
            <Col>
            <p className="card-text fs-1 fw-bold" style={{padding: "15px"}}>{calories} calories</p>
            </Col>
            </Row>
            <Row>
            <img className="image" src={timeIcon} alt="timeIcon" style={{width: "25%", height: "25%", padding: "15px"}}/>
            <Col>
            <p className="card-text fs-1 fw-bold" style={{padding: "15px"}}>{time} minutes</p>
            </Col>
            </Row>

            {/* <img className="image" src={timeIcon} alt="timeIcon" style={{width: "25%", height: "25%"}}/>
            <img className="image" src={caloriesIcon} alt="caloriesIcon" style={{width: "25%", height: "25%"}}/> */}
          </div>
        </div>
      </div>
    </div>
    <Button onClick={() => addToCart(name, price, ingredients)} style={{width: "100px", justifyContent: "bottom"}}>Add to Cart</Button>
    </>
  );
}

export default Recipe;
