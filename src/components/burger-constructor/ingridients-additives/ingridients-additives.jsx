import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from '../burger-constructor.module.css';
import { ingredientPropType } from '../../../utils/prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_INGRIDIENT, CHANGE_CARTS } from '../../../services/actions/burgerState';
import { useContext, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { TotalPriceContext } from '../../../services/appContext';

const Ingridients = ({ data, index }) => {
    const id = data._id;
    const { selectedItems } = useSelector(state => state.burger);
    const dispatch = useDispatch();
    const { priceDispatcher } = useContext(TotalPriceContext);

    const moveCart = (dragIndex, hoverIndex) => {
        const dragCard = selectedItems[dragIndex];
        const newCarts = [...selectedItems];
        newCarts.splice(dragIndex, 1);
        newCarts.splice(hoverIndex, 0, dragCard);
        dispatch({ type: CHANGE_CARTS, payload: newCarts })
    }

    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: "ingrid",
        hover: (item, monitor) => {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveCart(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: "ingrid",
        item: () => {
            return { index, id }
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