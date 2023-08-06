import React,{useContext} from 'react';
import BurgerConstructorStyles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { baseUrl } from '../burger-Ingredients/burger-Ingredients';
import Ingridients from './ingridients-additives/ingridients-additives';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { BurgerContext } from '../../services/appContext';




const BurgerConstructor = () => {

    const value = useContext(BurgerContext);
    const buns = value.ingrid.filter((item) => item.type === 'bun');
   
    const [modalActive, setModalActive] = React.useState(false);
    const closeModal = () => {
        setModalActive(false)
    }
    return (
        <section className={BurgerConstructorStyles.page}>
            <div className="pt-25 pb-10">
                <div className="pl-8 mb-4">
                    {value.isLoading && 'Загрузка...'}
                    {value.hasError && 'Произошла ошибка'}
                    {!value.isLoading &&
                        !value.hasError &&
                        value.ingrid.length &&
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${buns[0].name} (верх)`}
                            price={buns[0].price}
                            thumbnail={buns[0].image}
                        />}
                </div>
                <ul className={`${BurgerConstructorStyles.containerScroll} custom-scroll`}>
                  <Ingridients  key={value.ingrid._id}></Ingridients>
                </ul>
                <div className="pl-8 mt-4">
                    {value.isLoading && 'Загрузка...'}
                    {value.hasError && 'Произошла ошибка'}
                    {!value.isLoading &&
                        !value.hasError &&
                        value.ingrid.length &&
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${buns[0].name} (низ)`}
                            price={buns[0].price}
                            thumbnail={buns[0].image}
                        />}
                </div>
                <div className={`${BurgerConstructorStyles.checkout} mr-4 mt-10`}>
                    <div className={`${BurgerConstructorStyles.price} mr-10`}>
                        <p className="text text_type_digits-medium">610</p>
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

