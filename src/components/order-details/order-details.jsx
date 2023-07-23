import OrderdetailsStyles from './order-details.module.css'
import DoneImage from '../../images/done.png'
    


export const OrderDetails = () => {
    return (
        <div className={`mt-30 mb-30 ${OrderdetailsStyles.container}`}>
            <h2 className="text text_type_digits-large mb-8">034536</h2>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <img src={DoneImage} className='mb-15'/>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}