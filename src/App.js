import React, {useState} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart"
import {CartProvider} from "./store/cart-context"

const App = () => {

const [cartIsDisplayed, setCartIsDisplayed] = useState(false)

const showCart = () => {
  setCartIsDisplayed(true)
}

const hideCart = () => {
  setCartIsDisplayed(false)
}

  return (
    <CartProvider>
      {cartIsDisplayed && <Cart onHideCart={hideCart}/>}
      <Header onShowCart={showCart}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
