import React, { useReducer } from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (prevState, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      prevState.totalAmount + action.item.price * action.item.amount;
    const indexOfItem = prevState.items.findIndex(
      (el) => el.id === action.item.id
    );
    let updatedItems;
    if (indexOfItem !== -1) {
      const existingItem = prevState.items[indexOfItem];
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...prevState.items];
      updatedItems[indexOfItem] = updatedItem;
    } else {
      updatedItems = prevState.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const indexOfItem = prevState.items.findIndex((el) => el.id === action.id);
    const removedItem = prevState.items[indexOfItem];
    const updatedTotalAmount = prevState.totalAmount - removedItem.price;
    let updatedItems;
    if (removedItem.amount === 1) {
      updatedItems = prevState.items.filter((el) => el.id !== action.id);
    } else {
      const updatedItem = { ...removedItem, amount: removedItem.amount - 1 };
      updatedItems = [...prevState.items];
      updatedItems[indexOfItem] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
};

const CartProvider = (props) => {
  const [cartState, cartStateDispatch] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    cartStateDispatch({ type: "ADD", item: item });
  };
  const removeItemHandler = (id) => {
    cartStateDispatch({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export { CartProvider };
export default CartContext;
