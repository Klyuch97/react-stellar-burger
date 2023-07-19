import styles from "./app.module.css";
import Header from "../header/header"
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { OrderDetails } from "../order-details/order-details";
import Modal from "../modal/modal";
import ReactDOM from "react-dom";
import React from "react";

function App() {
const [modalActive,setModalActive]=React.useState(false)
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
        <div>
          <Modal active={modalActive} setActive={setModalActive}><OrderDetails />
          </Modal></div>
      </main>

    </div>
  );
}

export default App;
