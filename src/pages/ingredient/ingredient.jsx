import React from "react";
import styles from "./ingredient.module.css";
import { useSelector } from 'react-redux';
import { data } from "../../utils/data";

export const Ingredient = () => {
    let a = data[4];
    return (
        <>
            <div className={`${styles.content}`}>
                <h2 className={`text text_type_main-large ${styles.title}`}>Детали ингредиента </h2 >
                <img src={a.image} className={styles.image} alt={a.name}></img>
                <p className={`text text_type_main-medium mb-8 mt-4 ${styles.text}`}>{a.name}</p>
                <div className={`${styles.items}`}>
                    <div className={styles.item}>
                        <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                        <p className='text text_type_digits-default text_color_inactive'>{a.calories}</p>
                    </div>
                    <div className={styles.item}>
                        <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{a.proteins}</p>
                    </div>
                    <div className={styles.item}>
                        <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{a.fat}</p>
                    </div>
                    <div className={styles.item}>
                        <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>
                            {a.carbohydrates}</p>
                    </div>

                </div>
            </div >
        </>
    )
}