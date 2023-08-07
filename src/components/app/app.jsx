import React, { useState, useContext } from "react";
import styles from "./app.module.css";
import Header from "../header/header"
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { BurgerContext } from "../../services/appContext";

export const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';




function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    ingrid: [],
    selectedItem: null,
    selected: false,
  });
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
    setState({ ...state, selectedItem: item, selected:true });
  };

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <BurgerContext.Provider value={state}>
          <BurgerIngredients onItemClick={handleItemClick} />
          <BurgerConstructor />
        </BurgerContext.Provider>
      </main>

    </div>
  );
}

export default App;
