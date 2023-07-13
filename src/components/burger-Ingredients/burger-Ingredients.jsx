import React from 'react';
import BurgerIngredientsStyles from '../burger-Ingredients/burger-Ingredients.module.css';
import Tabs from '../tabs/tabs';
import { data } from "../../utils/data";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const buns = data.filter((item) => item.type === 'bun');
const sauces = data.filter((item) => item.type === 'sauce');
const mains = data.filter((item) => item.type === 'main');

const Ingredients = ({ data }) => {
    return (

        <div className={`${BurgerIngredientsStyles.content}`}>
            <img className={BurgerIngredientsStyles.image} src={data.image}></img>
            <div className={`${BurgerIngredientsStyles.price} pb-1 pt-1`}>
                <p className="text text_type_digits-default">{data.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${BurgerIngredientsStyles.text} text text_type_main-default`} >{data.name}</p>
        </div>
    )
}


const BurgerIngredients = () => {
    return (
        <section className={BurgerIngredientsStyles.page}>
            <h1 className='text text_type_main-large mt-10 pb-5'>
                Соберите бургер
            </h1>
            <Tabs></Tabs>
            <ul className={BurgerIngredientsStyles.ul}>
                <h2 className='mb-6 text text_type_main-medium'>Булки</h2>
                <div className={BurgerIngredientsStyles.containerContent}>
                    {buns.map((data) => (< Ingredients data={data} key={buns} />))}
                </div> </ul>

                <ul className={BurgerIngredientsStyles.ul}>
                <h2 className='mb-6 text text_type_main-medium'>Соусы</h2>
                <div className={BurgerIngredientsStyles.containerContent}>
                    {sauces.map((data) => (< Ingredients data={data} key={buns} />))}
                </div>
                </ul>
        </section>
    )
}

export default BurgerIngredients