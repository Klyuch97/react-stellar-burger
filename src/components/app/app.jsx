import React, { useState, useReducer } from "react";
import styles from "./app.module.css";
import Header from "../header/header"
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { TotalPriceContext } from "../../services/appContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


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
    case "decriment": {
      return {
        ...state,
        totalPrice: state.totalPrice - action.payload.price
      }
    }
  }
}

function App() {
  const [priceState, priceDispatcher] = useReducer(reducer, priceInitialState, undefined);
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <TotalPriceContext.Provider value={{ priceState, priceDispatcher }}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </TotalPriceContext.Provider>

      </main>
    </div>
  );
}


export default App;
