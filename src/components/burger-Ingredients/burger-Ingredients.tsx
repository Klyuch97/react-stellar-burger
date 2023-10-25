import React, { useMemo, useEffect, useState } from 'react';
import BurgerIngredientsStyles from '../burger-Ingredients/burger-Ingredients.module.css';
import Tabs from '../tabs/tabs';
import Ingredients from './ingredients/ingredients';
import { useInView } from 'react-intersection-observer';
import { useModal } from '../../hooks/modal';
import { useDispatch, useSelector } from '../../services/hooks';
import { IIngregient } from '../../types/types';



const BurgerIngredients = () => {
    const { ingrid, isLoading, hasError } = useSelector(state => state.burger);
    const { isModalOpen, openModal, closeModal } = useModal();
    const dispatch = useDispatch();

    const [buns, sauces, mains] = useMemo(() => {
        const filteredBuns = ingrid.filter((item: IIngregient) => item.type === 'bun');
        const filteredSauces = ingrid.filter((item: IIngregient) => item.type === 'sauce');
        const filteredMains = ingrid.filter((item: IIngregient) => item.type === 'main');

        return [filteredBuns, filteredSauces, filteredMains];
    }, [ingrid]);

    const [current, setCurrent] = React.useState<string>('one');
    const [bunsRef, bunsInView] = useInView({ threshold: 0.1 });
    const [sausesRef, sausesInView] = useInView({ threshold: 0.1 });
    const [mainsRef, mainInView] = useInView({ threshold: 0.1 });

    useEffect(() => {
        if (bunsInView) {
            setCurrent("one");
        } else if (sausesInView) {
            setCurrent("two");
        } else if (mainInView) {
            setCurrent("three");
        }
    }, [bunsInView, sausesInView, mainInView]);

    const handleTabClick = (currentTab: string): void => {
        setCurrent(currentTab);
        switch (currentTab) {
            case 'one':
                const bunsTab = document.getElementById('bunsTab');
                if (bunsTab) {
                    bunsTab.scrollIntoView({ behavior: "smooth" });
                }
                break;
            case 'two':
                const saucesTab = document.getElementById('saucesTab');
                if (saucesTab) {
                    saucesTab.scrollIntoView({ behavior: "smooth" });
                }
                break;
            case 'three':
                const mainsTab = document.getElementById('mainsTab');
                if (mainsTab) {
                    mainsTab.scrollIntoView({ behavior: "smooth" });
                }
                break;
            default:
                break;
        }
    };

    const handleItemClick = (): void => {
        openModal()
    }

    return (
        <section className={BurgerIngredientsStyles.page}>
            <h1 className='text text_type_main-large mt-10 pb-5'>
                Соберите бургер
            </h1>
            <Tabs current={current} handleTabClick={handleTabClick} />
            <ul className={`${BurgerIngredientsStyles.li} custom-scroll`}>
                <li className={BurgerIngredientsStyles.ul} ref={bunsRef} id='bunsTab' >
                    <h2 className='mb-6 text text_type_main-medium'>Булки</h2>

                    <div className={BurgerIngredientsStyles.containerContent}>
                        {isLoading && 'Загрузка...'}
                        {hasError && 'Произошла ошибка'}
                        {!isLoading &&
                            !hasError &&
                            ingrid.length &&
                            buns.map((ingrid: IIngregient) => <Ingredients key={ingrid._id} data={ingrid} handleItemClick={handleItemClick} />)}
                    </div> </li>
                <li className={BurgerIngredientsStyles.ul} ref={sausesRef} id='saucesTab'>
                    <h2 className='mb-6 text text_type_main-medium'>Соусы</h2>
                    <div className={BurgerIngredientsStyles.containerContent}>
                        {isLoading && 'Загрузка...'}
                        {hasError && 'Произошла ошибка'}
                        {!isLoading &&
                            !hasError &&
                            ingrid.length &&
                            sauces.map((ingrid: IIngregient) => <Ingredients key={ingrid._id} data={ingrid} handleItemClick={handleItemClick} />)}
                    </div>
                </li>
                <li className={BurgerIngredientsStyles.ul} ref={mainsRef} id='mainsTab'>
                    <h2 className='mb-6 text text_type_main-medium'>Начинки</h2>
                    <div className={BurgerIngredientsStyles.containerContent}>
                        {isLoading && 'Загрузка...'}
                        {hasError && 'Произошла ошибка'}
                        {!isLoading &&
                            !hasError &&
                            ingrid.length &&
                            mains.map((ingrid: IIngregient) => <Ingredients key={ingrid._id} data={ingrid} handleItemClick={handleItemClick} />)}
                    </div>
                </li>
            </ul>


        </section>
    )
}

export default BurgerIngredients