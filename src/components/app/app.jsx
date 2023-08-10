import React, { useState, useReducer } from "react";
import styles from "./app.module.css";
import Header from "../header/header"
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { BurgerContext, CountContext } from "../../services/appContext";
import { v4 as uuidv4 } from 'uuid';


export const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';
const orderPostUlr= 'https://norma.nomoreparties.space/api/orders';
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
 /* React.useEffect(() => {
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
  }, [])8*/

 

  const handleOrderSubmit = async () => {
    setState({ ...state, isLoading: true });
    const ingredientId = selectedItems.map(item => item._id);
    const ingredientBunsId = state.selectedItemBuns._id;
    const ingredient = [...ingredientId, ingredientBunsId];
    const response = await fetch(orderPostUlr, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: ingredient }),
    });
    if (!response.ok) {
      const message = alert(`Ошибка: ${response.status}`);
      setState({ ...state, hasError: true });
      throw new Error(message);
    }
    const data = await response.json();
    const orderNumber = data.order.number;
    setState({...state, orderNumber:orderNumber,isLoading: false})
console.log('Номер заказа:', orderNumber);
  }


  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <BurgerContext.Provider value={{ ...state, selectedItems, handleOrderSubmit }}>
          <CountContext.Provider value={{ priceState, priceDispatcher }}>
            <BurgerIngredients />
            <BurgerConstructor handleOrderSubmit={handleOrderSubmit} />
          </CountContext.Provider>
        </BurgerContext.Provider>
      </main>

    </div>
  );
}


export default App;
