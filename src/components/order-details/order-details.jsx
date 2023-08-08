import React, { useContext } from 'react';
import OrderdetailsStyles from './order-details.module.css'
import DoneImage from '../../images/done.png'
import { BurgerContext } from '../../services/appContext';



export const OrderDetails = () => {
    const state = useContext(BurgerContext)
    return (
        <div className={`mt-30 mb-30 ${OrderdetailsStyles.container}`}>
            <h2 className="text text_type_digits-large mb-8">
                {state.isLoading && 'Загрузка...'}
                {state.hasError && 'Произошла ошибка'}
                {!state.isLoading &&
                    !state.hasError &&
                    state.ingrid.length && state.orderNumber}
            </h2>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <img src={DoneImage} className='mb-15' />
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}