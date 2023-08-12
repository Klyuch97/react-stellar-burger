import React, { useContext } from 'react';
import BurgerConstructorStyles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingridients from './ingridients-additives/ingridients-additives';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { CountContext } from '../../services/appContext';
import { useDispatch, useSelector } from 'react-redux';
import { MODAL_CLOSE, MODAL_OPEN } from '../../services/actions/modal';
import { POST_ORDER_NUMBER_REQUEST, POST_ORDER_NUMBER_FAILED, POST_ORDER_NUMBER_SUCCESS } from '../../services/actions/burgerState';
import { useDrop } from 'react-dnd';
import { addItem,addItems } from '../../services/actions/burgerState';

export const orderPostUlr = 'https://norma.nomoreparties.space/api/orders';



const BurgerConstructor = () => {
    const { selectedItemBuns, selectedItems } = useSelector(state => state.burger);
    const { priceState } = useContext(CountContext);
    const { modalActive, currentIngrid } = useSelector(state => state.modal);
    const dispatch = useDispatch();
   

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'itemBun',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) { dispatch(addItem(item)) }
    })

    const handleOrderSubmit = async () => {
        dispatch({ type: POST_ORDER_NUMBER_REQUEST })
        const ingredientId = selectedItems.map(item => item._id);
        const ingredientBunsId = selectedItemBuns._id;
        const ingredient = [...ingredientId, ingredientBunsId];
        const response = await fetch(orderPostUlr, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredient }),
        });
        if (!response.ok) {
            const message = alert(`Ошибка: ${response.status}`);
            dispatch({ type: POST_ORDER_NUMBER_FAILED })
            throw new Error(message);
        }
        const data = await response.json();
        const orderNumber = data.order.number;
        dispatch({ type: POST_ORDER_NUMBER_SUCCESS, orderNumber })
        console.log('Номер заказа:', orderNumber);
    }
    const closeModal = () => {
        dispatch({ type: MODAL_CLOSE })
    }
    return (
        <section className={BurgerConstructorStyles.page}>
            <div className="pt-25 pb-10">
                <div className={`${isHover ? BurgerConstructorStyles.onHoverBun : ""} pl-8 mb-4
                ${BurgerConstructorStyles.ingridientsBun}`}
                    ref={dropTarget}>
                    {selectedItemBuns && <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${selectedItemBuns.name} (верх)`}
                        price={selectedItemBuns.price}
                        thumbnail={selectedItemBuns.image}
                    />}
                </div>
                <ul className={`${BurgerConstructorStyles.containerScroll}
                 custom-scroll`}>
                    {selectedItems.map((ingrid, index) => <Ingridients key={ingrid.key} data={ingrid} />)
                    }
                </ul>
                <div className={`${isHover ? BurgerConstructorStyles.onHoverBun : ""} pl-8 mb-4
                ${BurgerConstructorStyles.ingridientsBun}`}
                >
                    {selectedItemBuns && <ConstructorElement
                        type=" bottom"
                        isLocked={true}
                        text={`${selectedItemBuns.name} (низ)`}
                        price={selectedItemBuns.price}
                        thumbnail={selectedItemBuns.image}
                    />}
                </div>
                <div className={`${BurgerConstructorStyles.checkout} mr-4 mt-10`}>
                    <div className={`${BurgerConstructorStyles.price} mr-10`}>
                        <p className="text text_type_digits-medium">{priceState.totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button"
                        type="primary"
                        size="medium"
                        onClick={() => {
                            handleOrderSubmit();
                            dispatch({ type: "MODAL_OPEN", payload: undefined });
                        }}>
                        Оформить заказ
                    </Button>
                </div>
                {
                    modalActive && currentIngrid === undefined && <Modal onClose={closeModal}>
                        <OrderDetails /></Modal>
                }
            </div>
        </section>
    )
}
export default BurgerConstructor

