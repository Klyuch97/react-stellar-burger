import React from "react";
import styles from "./ingredient.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

export const Ingredient = () => {
    const { id } = useParams();
    const ingrids = useSelector((state) => state.burger.ingrid);
    const currentElem = ingrids.find((elem) => elem._id === id);

    return (
        <>
            {currentElem && <div className={`${styles.content}`}>
                <h2 className={`text text_type_main-large ${styles.title}`}>Детали ингредиента </h2 >
                <img src={currentElem.image} className={styles.image} alt={currentElem.name}></img>
                <p className={`text text_type_main-medium mb-8 mt-4 ${styles.text}`}>{currentElem.name}</p>
                <div className={`${styles.items}`}>
                    <div className={styles.item}>
                        <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                        <p className='text text_type_digits-default text_color_inactive'>{currentElem.calories}</p>
                    </div>
                    <div className={styles.item}>
                        <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{currentElem.proteins}</p>
                    </div>
                    <div className={styles.item}>
                        <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{currentElem.fat}</p>
                    </div>
                    <div className={styles.item}>
                        <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>
                            {currentElem.carbohydrates}</p>
                    </div>
                </div>
            </div >}
        </>
    )
}