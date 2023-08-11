import React, { useMemo, useEffect } from 'react';
import BurgerIngredientsStyles from '../burger-Ingredients/burger-Ingredients.module.css';
import Tabs from '../tabs/tabs';
import Ingredients from './ingredients/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { getIngrid } from '../../services/actions/burgerState';
import Modal from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { MODAL_CLOSE } from '../../services/actions/modal';
import { useInView } from 'react-intersection-observer';


export const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';


const BurgerIngredients = () => {
    const { modalActive, currentIngrid } = useSelector(state => state.modal);
    const { ingrid, isLoading, hasError, } = useSelector(state => state.burger);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngrid());
    }, [dispatch]);

    const closeModal = () => {
        dispatch({ type: MODAL_CLOSE })
    }

    const [buns, sauces, mains] = useMemo(() => {
        const filteredBuns = ingrid.filter(item => item.type === 'bun');
        const filteredSauces = ingrid.filter(item => item.type === 'sauce');
        const filteredMains = ingrid.filter(item => item.type === 'main');

        return [filteredBuns, filteredSauces, filteredMains];
    }, [ingrid]);


    const [current, setCurrent] = React.useState('one');

    const [bunsRef, bunsInView] = useInView({ threshold: 0 });
    const [sausesRef, sausesInView] = useInView({ threshold: 0 });
    const [mainsRef, mainInView] = useInView({ threshold: 0 });
    
    useEffect(() => {
        if (bunsInView) {
            setCurrent("one");
        } else if (sausesInView) {
            setCurrent("two");
        } else if (mainInView) {
            setCurrent("three");
        }
    }, [bunsInView, sausesInView, mainInView]);

    const handleTabClick = (value) => {
        setCurrent(value);
        console.log(value);
    };


    return (
        <section className={BurgerIngredientsStyles.page}>
            <h1 className='text text_type_main-large mt-10 pb-5'>
                Соберите бургер
            </h1>
            <Tabs current={current} setCurrent={setCurrent} handleTabClick={handleTabClick} />
            <ul className={`${BurgerIngredientsStyles.li} custom-scroll`}>
                <li className={BurgerIngredientsStyles.ul} ref={bunsRef} >
                    <h2 className='mb-6 text text_type_main-medium'>Булки</h2>

                    <div className={BurgerIngredientsStyles.containerContent}>
                        {isLoading && 'Загрузка...'}
                        {hasError && 'Произошла ошибка'}
                        {!isLoading &&
                            !hasError &&
                            ingrid.length &&
                            buns.map((ingrid, index) => <Ingredients key={ingrid._id} data={ingrid} />)}
                    </div> </li>
                <li className={BurgerIngredientsStyles.ul} ref={sausesRef}>
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
                <li className={BurgerIngredientsStyles.ul} ref={mainsRef}>
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
            {
                modalActive && currentIngrid && <Modal onClose={closeModal}>
                    <IngredientDetails /></Modal>
            }

        </section>
    )
}

export default BurgerIngredients