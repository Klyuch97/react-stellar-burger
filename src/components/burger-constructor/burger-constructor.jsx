import React, { useContext, useState } from 'react';
import BurgerConstructorStyles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingridients from './ingridients-additives/ingridients-additives';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { postOrderSubmit } from '../../services/actions/burgerState';
import { useDrop } from 'react-dnd';
import { addItem, addItems } from '../../services/actions/burgerState';
import { INCREMENT, RESET } from '../../services/actions/price';




const BurgerConstructor = () => {
    const { selectedItemBuns, selectedItems } = useSelector(state => state.burger);
    const [modalActive, setModalActive] = useState(false)
    const { totalPrice } = useSelector(state => state.price);
    const dispatch = useDispatch();
    const [{ isHover }, dropTarget] = useDrop({
        accept: 'itemBun',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop: (item) => {
            dispatch(addItem(item));
            dispatch({ type: INCREMENT, payload: item });

        },
    })

    const [{ isHoverItems }, dropTargets] = useDrop({
        accept: 'itemOther',
        collect: monitor => ({
            isHoverItems: monitor.isOver()
        }),
        drop: (item) => {
            dispatch(addItems(item));
            dispatch({ type: INCREMENT, payload: item });
        }
    })

    const handleOrderSubmit = async () => {
        const ingredientId = selectedItems.map(item => item._id);
        const ingredientBunsId = selectedItemBuns._id;
        const ingredient = [...ingredientId, ingredientBunsId];
        dispatch(postOrderSubmit(ingredient))
        dispatch({ type: RESET })
        setModalActive(true)

    }
    const closeModal = () => {
        setModalActive(false)
    }
    return (
        <section className={BurgerConstructorStyles.page}>
            <div className="pt-25 pb-10">
                <div className={`${isHover ? BurgerConstructorStyles.onHoverBun : ""} pl-8 mb-4
                ${BurgerConstructorStyles.ingridientsBun}`}
                    ref={dropTarget} >
                    {Object.keys(selectedItemBuns).length > 0 && <ConstructorElement
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
                    {selectedItems.map((ingrid, index) => <Ingridients key={ingrid.key} data={ingrid} index={index} />)
                    }
                </ul>
                <div className={`${isHover ? BurgerConstructorStyles.onHoverBun : ""} pl-8 mb-4
                ${BurgerConstructorStyles.ingridientsBun}`}
                >
                    {Object.keys(selectedItemBuns).length > 0 && <ConstructorElement
                        type=" bottom"
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
                    modalActive && <Modal onClose={closeModal}>
                        <OrderDetails /></Modal>
                }
            </div>
        </section>
    )
}
export default BurgerConstructor

