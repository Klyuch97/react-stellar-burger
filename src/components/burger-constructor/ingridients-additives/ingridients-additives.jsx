import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from '../burger-constructor.module.css';
import { ingredientPropType } from '../../../utils/prop-types'
import { useDispatch } from 'react-redux';
import { DELETE_INGRIDIENT } from '../../../services/actions/burgerState';
import { useContext } from 'react';
import { TotalPriceContext } from '../../../services/appContext';

const Ingridients = ({ data,deleteIngrid }) => {
    const dispatch = useDispatch();

    const { priceState, priceDispatcher } = useContext(TotalPriceContext);

    return (<li className={`${BurgerConstructorStyles.ingridients} mb-4`}>
        <DragIcon type="primary" />
        <ConstructorElement
            text={data.name}
            price={data.price}
            thumbnail={data.image}
            handleClose={()=>{
                dispatch({type:DELETE_INGRIDIENT, payload: data});
                priceDispatcher({ type: "decriment", payload: data });}}
        />
    </li>
    )
}

Ingridients.propTypes = {
    data: ingredientPropType
}

export default Ingridients