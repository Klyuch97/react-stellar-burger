import React, { useContext, useMemo } from 'react';
import BurgerIngredientsStyles from '../burger-Ingredients/burger-Ingredients.module.css';
import Tabs from '../tabs/tabs';
import Ingredients from './ingredients/ingredients';
import { BurgerContext } from '../../services/appContext';

export const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';


const BurgerIngredients = ({ onItemClick }) => {


    const state = useContext(BurgerContext);


    const [buns, sauces, mains] = useMemo(() => {
        const filteredBuns = state.ingrid.filter(item => item.type === 'bun');
        const filteredSauces = state.ingrid.filter(item => item.type === 'sauce');
        const filteredMains = state.ingrid.filter(item => item.type === 'main');
        
        return [filteredBuns, filteredSauces, filteredMains];
        }, [state.ingrid]);

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
                        {state.isLoading && 'Загрузка...'}
                        {state.hasError && 'Произошла ошибка'}
                        {!state.isLoading &&
                            !state.hasError &&
                            state.ingrid.length &&
                            buns.map((ingrid, index) => <Ingredients key={ingrid._id} data={ingrid} addIngrid={onItemClick} />)}
                    </div> </li>
                <li className={BurgerIngredientsStyles.ul}>
                    <h2 className='mb-6 text text_type_main-medium'>Соусы</h2>
                    <div className={BurgerIngredientsStyles.containerContent}>
                        {state.isLoading && 'Загрузка...'}
                        {state.hasError && 'Произошла ошибка'}
                        {!state.isLoading &&
                            !state.hasError &&
                            state.ingrid.length &&
                            sauces.map((ingrid, index) => <Ingredients key={ingrid._id} data={ingrid} addIngrid={onItemClick} />)}
                    </div>
                </li>
                <li className={BurgerIngredientsStyles.ul}>
                    <h2 className='mb-6 text text_type_main-medium'>Начинки</h2>
                    <div className={BurgerIngredientsStyles.containerContent}>
                        {state.isLoading && 'Загрузка...'}
                        {state.hasError && 'Произошла ошибка'}
                        {!state.isLoading &&
                            !state.hasError &&
                            state.ingrid.length &&
                            mains.map((ingrid, index) => <Ingredients key={ingrid._id} data={ingrid} addIngrid={onItemClick} />)}
                    </div>
                </li>
            </ul>

        </section>
    )
}

export default BurgerIngredients