import React from 'react';
import BurgerConstructorStyles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = () => {
    return (
        <section className={BurgerConstructorStyles.page}>
            <div className="pt-25 pb-10">
                <div className="pl-8 mb-4">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                    //thumbnail={img}
                    />
                </div>
                <ul className={`${BurgerConstructorStyles.containerScroll} custom-scroll`}>
                    <li className={`${BurgerConstructorStyles.ingridients} mb-4`}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={200}
                        //thumbnail={img}
                        />
                    </li>
                    <li className={`${BurgerConstructorStyles.ingridients} mb-4`}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={200}
                        //thumbnail={img}
                        />
                    </li>
                    <li className={`${BurgerConstructorStyles.ingridients} mb-4`}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={200}
                        //thumbnail={img}
                        />
                    </li>
                    <li className={`${BurgerConstructorStyles.ingridients} mb-4`}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={200}
                        //thumbnail={img}
                        />
                    </li>
                    <li className={`${BurgerConstructorStyles.ingridients} mb-4`}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={200}
                        //thumbnail={img}
                        />
                    </li>
                    <li className={`${BurgerConstructorStyles.ingridients} mb-4`}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={200}
                        //thumbnail={img}
                        />
                    </li>
                </ul>
                <div className="pl-8 mt-4">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                    //thumbnail={img}
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

//в бургер конструктор сейчас должны данные передаваться из BurgerIngredients или это в следующей ветке?
//Тот же вопрос по Counter, счетчик делать в след ветке?