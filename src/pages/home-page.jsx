import React from 'react';
import BurgerIngredients from '../components/burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "../components/app/app.module.css";

export const HomePage = () => {
    return (
        <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    )
}