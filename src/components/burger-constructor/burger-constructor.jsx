import React, { useContext } from 'react';
import BurgerConstructorStyles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingridients from './ingridients-additives/ingridients-additives';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { BurgerContext,CountContext } from '../../services/appContext';




const BurgerConstructor = () => {
    const { selectedItemBuns,selectedItems } = useContext(BurgerContext);
    const [modalActive, setModalActive] = React.useState(false);
    const {priceState, priceDispatcher}= useContext(CountContext)
  
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
                    {selectedItems.map((ingrid, index) => <Ingridients key={ingrid._id} data={ingrid} />)
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
                        <p className="text text_type_digits-medium">0</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button"
                        type="primary"
                        size="medium"
                        onClick={() => setModalActive(true)}>
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

