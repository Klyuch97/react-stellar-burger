import React, { FC, useContext, useState } from 'react';
import BurgerConstructorStyles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingridients from './ingridients-additives/ingridients-additives';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { postOrderSubmit } from '../../services/actions/burgerState';
import { useDrop } from 'react-dnd';
import { addItem, addItems } from '../../services/actions/burgerState';
import { INCREMENT, RESET } from '../../services/constants/index';
import { useModal } from '../../hooks/modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { IIngregient } from '../../types/types';

const BurgerConstructor:FC = () => {
    const navigate = useNavigate()
    const { selectedItemBuns, selectedItems } = useSelector(state => state.burger);
    const { totalPrice } = useSelector(state => state.price);
    const user = useSelector(state => state.user.user);
    const { isModalOpen, openModal, closeModal } = useModal();
    const dispatch = useDispatch();
    const [{ isHover }, dropTarget] = useDrop({
        accept: 'itemBun',
        collect: monitor => ({
            isHover: monitor.canDrop()
        }),
        drop: (item:IIngregient) => {
            dispatch(addItem(item));
            dispatch({ type: INCREMENT, payload: item });

        },
    })

    const [{ isHoverItems }, dropTargets] = useDrop({
        accept: 'itemOther',
        collect: monitor => ({
            isHoverItems: monitor.canDrop()
        }),
        drop: (item:IIngregient) => {
            dispatch(addItems(item));
            dispatch({ type: INCREMENT, payload: item });
        }
    })

    const handleOrderSubmit = async () => {
        if (user === null) {
            return (navigate('/login'))
        }
        else {
            const ingredientId = selectedItems.map((item:IIngregient) => item._id);
            const ingredientBunsId = selectedItemBuns._id;
            const ingredient = [...ingredientId, ingredientBunsId, ingredientBunsId];
            dispatch(postOrderSubmit(ingredient))
            dispatch({ type: RESET })
            openModal()
        }

    }
    const closeModals = () => {
        closeModal()
    }

    const DefaultBun = () => {
        return (
            <div className={`${BurgerConstructorStyles.defaultBun}`}>
                <p className="text text_type_main-medium">Перенесите булку сюда!</p>
            </div>
        )
    }

    const DefaultItems = () => {
        return (
            <div className={BurgerConstructorStyles.defaultItems}>
                <p className="text text_type_main-medium">Добавьте ингредиенты!</p>
            </div>
        )
    }
    return (
        <section className={BurgerConstructorStyles.page}>
            <div className="pt-25 pb-10">
                <div className={`${isHover ? BurgerConstructorStyles.onHoverBun : ""} mb-4 ml-8
                ${BurgerConstructorStyles.ingridientsBun}`}
                    ref={dropTarget} >
                    {Object.keys(selectedItemBuns).length === 0 ? <DefaultBun /> : <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${selectedItemBuns.name} (верх)`}
                        price={selectedItemBuns.price}
                        thumbnail={selectedItemBuns.image}
                    />}
                </div>
                <ul className={`${BurgerConstructorStyles.containerScroll} 
                ${isHoverItems ? BurgerConstructorStyles.onHover : ""} custom-scroll`}
                    ref={dropTargets}>
                    {selectedItems.length === 0 ? <DefaultItems /> : selectedItems.map((ingrid:IIngregient, index:number) => <Ingridients key={ingrid.key} data={ingrid} index={index} />)
                    }
                </ul>
                <div className={`pl-8 mb-4 ${BurgerConstructorStyles.ingridientsBun}`}
                >
                    {Object.keys(selectedItemBuns).length > 0 && <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${selectedItemBuns.name} (низ)`}
                        price={selectedItemBuns.price}
                        thumbnail={selectedItemBuns.image}
                    />}
                </div>
                <div className={`${BurgerConstructorStyles.checkout} mr-4 mt-10`}>
                    <div className={`${BurgerConstructorStyles.price} mr-10`}>
                        <p className="text text_type_digits-medium">{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    {Object.keys(selectedItemBuns).length > 0 ?
                        <Button htmlType="button"
                            type="primary"
                            size="medium"
                            onClick={() => {
                                handleOrderSubmit();
                            }}>
                            Оформить заказ
                        </Button> : <Button htmlType="button"
                            type="primary"
                            size="medium"
                            disabled>
                            Оформить заказ
                        </Button>
                    }
                </div>
                {
                    isModalOpen && <Modal onClose={closeModals}>
                        <OrderDetails /></Modal>
                }
            </div>
        </section>
    )
}
export default BurgerConstructor

