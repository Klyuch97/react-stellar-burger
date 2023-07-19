import React from 'react';
import BurgerConstructorStyles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';
import { buns, sauces, mains } from '../burger-Ingredients/burger-Ingredients';
import Ingridients from './ingridients-additives/ingridients-additives';


const additives = [...sauces, ...mains];

const BurgerConstructor = () => {
    return (
        <section className={BurgerConstructorStyles.page}>
            <div className="pt-25 pb-10">
                <div className="pl-8 mb-4">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${buns[0].name} (верх)`}
                        price={buns[0].price}
                        thumbnail={buns[0].image}
                    />
                </div>
                <ul className={`${BurgerConstructorStyles.containerScroll} custom-scroll`}>
                    {additives.map((data) => (<Ingridients data={data} key={additives.type} />))}
                </ul>
                <div className="pl-8 mt-4">
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${buns[0].name} (низ)`}
                        price={buns[0].price}
                        thumbnail={buns[0].image}
                    />
                </div>
                <div className={`${BurgerConstructorStyles.checkout} mr-4 mt-10`}>
                    <div className={`${BurgerConstructorStyles.price} mr-10`}>
                        <p className="text text_type_digits-medium">610</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button" type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    )
}
export default BurgerConstructor

