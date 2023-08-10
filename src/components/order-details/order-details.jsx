import React, { useContext } from 'react';
import OrderdetailsStyles from './order-details.module.css'
import DoneImage from '../../images/done.png'
import { useSelector } from 'react-redux';



export const OrderDetails = () => {
    const { isLoading, hasError, orderNumber, ingrid } = useSelector(state => state.burger);

    return (
        <div className={`mt-30 mb-30 ${OrderdetailsStyles.container}`}>
            <h2 className="text text_type_digits-large mb-8">
                {isLoading && 'Загрузка...'}
                {hasError && 'Произошла ошибка'}
                {!isLoading &&
                    !hasError &&
                    ingrid.length && orderNumber}
            </h2>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <img src={DoneImage} className='mb-15' />
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}