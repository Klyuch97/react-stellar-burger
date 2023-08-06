import React, { useContext } from 'react';
import BurgerIngredientsStyles from '../burger-Ingredients/burger-Ingredients.module.css';
import Tabs from '../tabs/tabs';
import Ingredients from './ingredients/ingredients';
import { BurgerContext } from '../../services/appContext';

export const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';


const BurgerIngredients = () => {

    const value = useContext(BurgerContext)
   

    const buns = value.ingrid.filter((item) => item.type === 'bun');
    const sauces = value.ingrid.filter((item) => item.type === 'sauce');
    const mains = value.ingrid.filter((item) => item.type === 'main');


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
                        {value.isLoading && 'Загрузка...'}
                        {value.hasError && 'Произошла ошибка'}
                        {!value.isLoading &&
                            !value.hasError &&
                            value.ingrid.length &&
                            buns.map((ingrid, index) => <Ingredients key={ingrid._id} data={ingrid} />)}
                    </div> </li>
                <li className={BurgerIngredientsStyles.ul}>
                    <h2 className='mb-6 text text_type_main-medium'>Соусы</h2>
                    <div className={BurgerIngredientsStyles.containerContent}>
                        {value.isLoading && 'Загрузка...'}
                        {value.hasError && 'Произошла ошибка'}
                        {!value.isLoading &&
                            !value.hasError &&
                            value.ingrid.length &&
                            sauces.map((ingrid, index) => <Ingredients key={ingrid._id} data={ingrid} />)}
                    </div>
                </li>
                <li className={BurgerIngredientsStyles.ul}>
                    <h2 className='mb-6 text text_type_main-medium'>Начинки</h2>
                    <div className={BurgerIngredientsStyles.containerContent}>
                        {value.isLoading && 'Загрузка...'}
                        {value.hasError && 'Произошла ошибка'}
                        {!value.isLoading &&
                            !value.hasError &&
                            value.ingrid.length &&
                            mains.map((ingrid, index) => <Ingredients key={ingrid._id} data={ingrid} />)}
                    </div>
                </li>
            </ul>

        </section>
    )
}

export default BurgerIngredients