import React from "react";
import styles from "./app.module.css";
import Header from "../header/header"
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { BurgerContext } from "../../services/appContext";

function App() {

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerContext.Provider>
        <BurgerConstructor />
        </BurgerContext.Provider>
      </main>

    </div>
  );
}

export default App;
