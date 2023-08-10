import React, { useState, useReducer } from "react";
import styles from "./app.module.css";
import Header from "../header/header"
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { BurgerContext, CountContext } from "../../services/appContext";
import { v4 as uuidv4 } from 'uuid';




const priceInitialState = {
  selectedItems: [],
  selectedItemBuns: [],
  totalPrice: 0,
  price: 0,
  priceBuns: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "incriment":
      if (action.payload.type === "bun") {
        return {
          ...state,
          selectedItemBuns: [action.payload],
          priceBuns: action.payload.price * 2,
          totalPrice: state.price + action.payload.price * 2
        };
      } else {
        return {
          ...state,
          selectedItems: [...state.selectedItems, action.payload],
          price: state.price + action.payload.price,
          totalPrice: state.price + state.priceBuns + action.payload.price,
        };
      }
    case "reset":
      return priceInitialState;
  }
}

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    ingrid: [],
    selectedItemBuns: [],
    orderNumber: null,
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [priceState, priceDispatcher] = useReducer(reducer, priceInitialState, undefined);

  

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <CountContext.Provider value={{ priceState, priceDispatcher }}>
          <BurgerIngredients />
          <BurgerConstructor />
        </CountContext.Provider>
      </main>
    </div>
  );
}


export default App;
