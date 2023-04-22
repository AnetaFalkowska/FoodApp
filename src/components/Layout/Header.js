import React from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import meals from "../../assets/meals.jpg";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick = {props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={meals} alt="meals"></img>
      </div>
    </React.Fragment>
  );
};

export default Header;
