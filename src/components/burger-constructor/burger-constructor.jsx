import React, { useContext } from 'react';
import BurgerConstructorStyles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingridients from './ingridients-additives/ingridients-additives';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { CountContext } from '../../services/appContext';
import { useDispatch, useSelector } from 'react-redux';
import { POST_ORDER_NUMBER_REQUEST,POST_ORDER_NUMBER_FAILED,POST_ORDER_NUMBER_SUCCESS } from '../../services/actions/burgerState';
export const orderPostUlr = 'https://norma.nomoreparties.space/api/orders';



const BurgerConstructor = () => {
    const { selectedItemBuns, selectedItems } = useSelector(state => state.burger);
    const [modalActive, setModalActive] = React.useState(false);
    const { priceState } = useContext(CountContext);
    const dispatch = useDispatch();
   

    const handleOrderSubmit = async () => {
        dispatch({type:POST_ORDER_NUMBER_REQUEST})
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
            dispatch({type:POST_ORDER_NUMBER_FAILED})
            throw new Error(message);
        }
        const data = await response.json();
        const orderNumber = data.order.number;
        dispatch({type:POST_ORDER_NUMBER_SUCCESS, orderNumber})
        console.log('Номер заказа:', orderNumber);
    }

    const closeModal = () => {
        setModalActive(false)
    }
    return (
        <section className={BurgerConstructorStyles.page}>
            <div className="pt-25 pb-10">
                <div className="pl-8 mb-4">
                    {selectedItemBuns && <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${selectedItemBuns.name} (верх)`}
                        price={selectedItemBuns.price}
                        thumbnail={selectedItemBuns.image}
                    />}
                </div>
                <ul className={`${BurgerConstructorStyles.containerScroll} custom-scroll`}>
                    {selectedItems.map((ingrid, index) => <Ingridients key={ingrid.key} data={ingrid} />)
                    }
                </ul>
                <div className="pl-8 mt-4">
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
                            setModalActive(true);
                        }}>
                        Оформить заказ
                    </Button>
                </div>
                {
                    modalActive && <Modal active={modalActive} onClose={closeModal}>
                        <OrderDetails /></Modal>
                }
            </div>
        </section>
    )
}
export default BurgerConstructor

