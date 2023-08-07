import React, { useState, useReducer } from "react";
import styles from "./app.module.css";
import Header from "../header/header"
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { BurgerContext, CountContext } from "../../services/appContext";

export const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';
const priceInitialState = {
  selectedItems: [],
  selectedItemBuns: [],
  totalPrice: 0,
  price:0,
  priceBuns: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "incriment":
      if (action.payload.type === "bun") {
        return {
          ...state,
          selectedItemBuns: [action.payload],
          priceBuns: action.payload.price*2,
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
    selectedItemBuns: null
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [priceState, priceDispatcher] = useReducer(reducer, priceInitialState, undefined);
  React.useEffect(() => {
    const Ingredients = async () => {
      setState({ ...state, isLoading: true });
      const res = await fetch(baseUrl);
      if (!res.ok) {
        const message = alert(`Ошибка: ${res.status}`);
        setState({ ...state, hasError: true });
        throw new Error(message);
      }
      const data = await res.json();
      setState({ ingrid: data.data, isLoading: false });
    }

    Ingredients();
  }, [])

  const handleItemClick = (item) => {
    if (item.type === "bun") {
      setState({ ...state, selectedItemBuns: item });
      priceDispatcher({ type: "incriment", payload: item });
    }
    else {
      setSelectedItems((prevItems) => [...prevItems, item]);
      priceDispatcher({ type: "incriment", payload: item });
    }
  }


  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <BurgerContext.Provider value={{ ...state, selectedItems }}>
          <CountContext.Provider value={{ priceState, priceDispatcher }}>
            <BurgerIngredients onItemClick={handleItemClick} />
            <BurgerConstructor />
          </CountContext.Provider>
        </BurgerContext.Provider>
      </main>

    </div>
  );
}


export default App;
