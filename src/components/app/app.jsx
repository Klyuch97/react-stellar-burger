import styles from "./app.module.css";
import { data } from "../../utils/data";
import Header from "../header/header"
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <div className={styles.app}>
      <Header/>
      <main className={styles.main}>
        <BurgerIngredients/>
        <BurgerConstructor/>
        </main>
    </div>
  );
}

export default App;
