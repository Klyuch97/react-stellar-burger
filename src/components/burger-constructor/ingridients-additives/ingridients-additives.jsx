import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from '../burger-constructor.module.css';
import { ingredientPropType } from '../../../utils/prop-types'
import { useDispatch } from 'react-redux';
import { DELETE_INGRIDIENT } from '../../../services/actions/burgerState';
import { useContext, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { TotalPriceContext } from '../../../services/appContext';

const Ingridients = ({ data, deleteIngrid }) => {
    const dispatch = useDispatch();
    const { priceState, priceDispatcher } = useContext(TotalPriceContext);
    const ref = useRef(null)

    const [, drop] = useDrop({
        accept: "ingrid",
        hover:(item, monitor)=>{
            
        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: "ingrid",
        item: () => {
            return { data }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    drag(drop(ref))
    const opacity = isDragging ? 0 : 1;

    return (<li className={`${BurgerConstructorStyles.ingridients} mb-4`} ref={ref} style={{ opacity }} >
        <DragIcon type="primary" />
        <ConstructorElement
            text={data.name}
            price={data.price}
            thumbnail={data.image}
            handleClose={() => {
                dispatch({ type: DELETE_INGRIDIENT, payload: data });
                priceDispatcher({ type: "decriment", payload: data });
            }}
        />
    </li>
    )
}

Ingridients.propTypes = {
    data: ingredientPropType
}

export default Ingridients