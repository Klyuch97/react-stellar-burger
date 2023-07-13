import React from 'react';
import BurgerIngredientsStyles from '../burger-Ingredients/burger-Ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerIngredients = () => {
    return (
        <section className={BurgerIngredientsStyles.page}>
            <h1 className='text text_type_main-large mt-10 pb-5'>
                Соберите бургер
            </h1>
            <Tab></Tab>
        </section>
    )
}

export default BurgerIngredients