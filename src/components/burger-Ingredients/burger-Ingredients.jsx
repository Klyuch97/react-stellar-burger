import React from 'react';
import BurgerIngredientsStyles from '../burger-Ingredients/burger-Ingredients.module.css';
import Tabs from '../tabs/tabs';
import Ingredients from './ingredients/ingredients';

export const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';


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
            if (!res.ok) {
                const message = alert(`Ошибка: ${res.status}`);
                setState({...state, hasError: true });
                throw new Error(message);
              }
            const data = await res.json();
        setState({ ingrid: data.data, isloading: false });
        }

        Ingredients();
    }, [])
    const { ingrid, isLoading, hasError } = state;
    //console.log(state);

    const buns = ingrid.filter((item) => item.type === 'bun');
    const sauces = ingrid.filter((item) => item.type === 'sauce');
    const mains = ingrid.filter((item) => item.type === 'main');
   

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
                            buns.map((ingrid, index) => <Ingredients key={ingrid._id} data={ingrid} />)}
                    </div> </li>
                <li className={BurgerIngredientsStyles.ul}>
                    <h2 className='mb-6 text text_type_main-medium'>Соусы</h2>
                    <div className={BurgerIngredientsStyles.containerContent}>
                        {isLoading && 'Загрузка...'}
                        {hasError && 'Произошла ошибка'}
                        {!isLoading &&
                            !hasError &&
                            ingrid.length &&
                            sauces.map((ingrid, index) => <Ingredients key={ingrid._id} data={ingrid} />)}
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
                            mains.map((ingrid, index) => <Ingredients key={ingrid._id} data={ingrid} />)}
                    </div>
                </li>
            </ul>
            
        </section>
    )
}

export default BurgerIngredients