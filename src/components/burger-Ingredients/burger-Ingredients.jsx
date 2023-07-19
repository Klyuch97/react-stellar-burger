import React from 'react';
import BurgerIngredientsStyles from '../burger-Ingredients/burger-Ingredients.module.css';
import Tabs from '../tabs/tabs';
import { data } from "../../utils/data";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";

export const buns = data.filter((item) => item.type === 'bun');
export const sauces = data.filter((item) => item.type === 'sauce');
export const mains = data.filter((item) => item.type === 'main');
const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';


const Ingredients = ({ data }) => {

    return (
        <div className={`${BurgerIngredientsStyles.content}`} >
            <Counter count={0} size="default" extraClass="m-1" />
            <img className={BurgerIngredientsStyles.image} src={data.image}></img>
            <div className={`${BurgerIngredientsStyles.price} pb-1 pt-1`}>
                <p className="text text_type_digits-default">{data.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${BurgerIngredientsStyles.text} text text_type_main-default`} >{data.name}</p>
        </div>
    )
}

Ingredients.propTypes = {
    data: ingredientPropType
}

const BurgerIngredients = () => {

    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        ingrid: []
    });
    React.useEffect(() => {
        const Ingredients = async () => {
            setState({ ...state, isLoading: true });
            const res = await fetch(baseUrl);
            const data = await res.json();
            setState({ ingrid: data.data, isloading: false });
        }

        Ingredients();
    }, [])
    const { ingrid, isLoading, hasError } = state;

    const bunss = ingrid.filter((item) => item.type === 'bun');
    const saucess = ingrid.filter((item) => item.type === 'sauce');
    const mainss = ingrid.filter((item) => item.type === 'main');

    return (
        <section className={BurgerIngredientsStyles.page}>
            <h1 className='text text_type_main-large mt-10 pb-5'>
                Соберите бургер
            </h1>
            <Tabs />
            <ul className={`${BurgerIngredientsStyles.li} custom-scroll`}>
                <li className={BurgerIngredientsStyles.ul} >
                    <h2 className='mb-6 text text_type_main-medium'>Булки</h2>
                    <div className={BurgerIngredientsStyles.containerContent}>
                        {isLoading && 'Загрузка...'}
                        {hasError && 'Произошла ошибка'}
                        {!isLoading &&
                            !hasError &&
                            ingrid.length &&
                            bunss.map((ingrid, index) => <Ingredients key={index} data={ingrid} />)}
                    </div> </li>
                <li className={BurgerIngredientsStyles.ul}>
                    <h2 className='mb-6 text text_type_main-medium'>Соусы</h2>
                    <div className={BurgerIngredientsStyles.containerContent}>
                        {isLoading && 'Загрузка...'}
                        {hasError && 'Произошла ошибка'}
                        {!isLoading &&
                            !hasError &&
                            ingrid.length &&
                            saucess.map((ingrid, index) => <Ingredients key={index} data={ingrid} />)}
                    </div>
                </li>
                <li className={BurgerIngredientsStyles.ul}>
                    <h2 className='mb-6 text text_type_main-medium'>Начинки</h2>
                    <div className={BurgerIngredientsStyles.containerContent}>
                        {isLoading && 'Загрузка...'}
                        {hasError && 'Произошла ошибка'}
                        {!isLoading &&
                            !hasError &&
                            ingrid.length &&
                            mainss.map((ingrid, index) => <Ingredients key={index} data={ingrid} />)}
                    </div>
                </li>
            </ul>
        </section>
    )
}

export default BurgerIngredients