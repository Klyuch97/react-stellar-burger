import React from 'react';
import BurgerConstructorStyles from '../burger-constructor/burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { baseUrl } from '../burger-Ingredients/burger-Ingredients';
import Ingridients from './ingridients-additives/ingridients-additives';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';




const BurgerConstructor = () => {

    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        ingrid: []
    });
    React.useEffect(() => {
        const Ingredients = async () => {
            setState({ ...state, isLoading: true });
            const res = await fetch(baseUrl);
            const data = await res.json();
            setState({ ingrid: data.data, isloading: false });
        }

        Ingredients();
    }, [])

    const { ingrid, isLoading, hasError } = state;
    const buns = ingrid.filter((item) => item.type === 'bun');
    const sauces = ingrid.filter((item) => item.type === 'sauce');
    const mains = ingrid.filter((item) => item.type === 'main');
    const additives = [...sauces, ...mains];
    const [modalActive, setModalActive] = React.useState(false);
    const closeModal = () => {
        setModalActive(false)
    }
    return (
        <section className={BurgerConstructorStyles.page}>
            <div className="pt-25 pb-10">
                <div className="pl-8 mb-4">
                    {isLoading && 'Загрузка...'}
                    {hasError && 'Произошла ошибка'}
                    {!isLoading &&
                        !hasError &&
                        ingrid.length &&
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${buns[0].name} (верх)`}
                            price={buns[0].price}
                            thumbnail={buns[0].image}
                        />}
                </div>
                <ul className={`${BurgerConstructorStyles.containerScroll} custom-scroll`}>
                    {isLoading && 'Загрузка...'}
                    {hasError && 'Произошла ошибка'}
                    {!isLoading &&
                        !hasError &&
                        ingrid.length &&
                        additives.map((ingrid, index) => <Ingridients key={ingrid._id} data={ingrid} />)}

                </ul>
                <div className="pl-8 mt-4">
                    {isLoading && 'Загрузка...'}
                    {hasError && 'Произошла ошибка'}
                    {!isLoading &&
                        !hasError &&
                        ingrid.length &&
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

