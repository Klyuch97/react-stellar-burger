import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from '../burger-constructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_INGRIDIENT, CHANGE_CARTS } from '../../../services/actions/burgerState';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DECREMENT } from '../../../services/actions/price';
import { IIngregient } from '../../../types/types';
import { any } from 'prop-types';

interface IIngredientElement {
    data: IIngregient,
    index: number,
}

const Ingridients: FC<IIngredientElement> = ({ data, index }) => {
    const id = data._id;
    const { selectedItems } = useSelector((state:any) => state.burger);
    const dispatch = useDispatch();

    const moveCart = (dragIndex: any, hoverIndex: any) => {
        const dragCard = selectedItems[dragIndex];
        const newCarts = [...selectedItems];
        newCarts.splice(dragIndex, 1);
        newCarts.splice(hoverIndex, 0, dragCard);
        dispatch({ type: CHANGE_CARTS, payload: newCarts })
    }

    const ref = useRef<HTMLLIElement>(null);

    const [, drop] = useDrop({
        accept: "ingrid",
        hover: (item: any, monitor) => {
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
             const clientOffset: any | null  = monitor.getClientOffset()
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
                dispatch({ type: DECREMENT, payload: data });
            }}
        />
    </li>
    )
}



export default Ingridients