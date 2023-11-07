import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from '../burger-constructor.module.css';
import { DELETE_INGRIDIENT, CHANGE_CARTS, DECREMENT } from '../../../services/constants';
import { FC, useRef } from 'react';
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { Ingregient } from '../../../types/types';
import { useDispatch, useSelector } from '../../../services/hooks';

type IngredientElement = {
    data: Ingregient,
    index: number,
}

const Ingridients: FC<IngredientElement> = ({ data, index }) => {
    const id = data._id;
    const { selectedItems } = useSelector((state) => state.burger);
    const dispatch = useDispatch();
    const moveCart = (dragIndex:number, hoverIndex:number) => {
        const dragCard = selectedItems[dragIndex];
        const newCarts = [...selectedItems];
        newCarts.splice(dragIndex, 1);
        newCarts.splice(hoverIndex, 0, dragCard);
        dispatch({ type: CHANGE_CARTS, payload: newCarts })
    }

    const ref = useRef<HTMLLIElement>(null);

    const [, drop] = useDrop({
        accept: "ingrid",
        hover: (item: { index: number }, monitor) => {
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
            const clientOffset: XYCoord | null = monitor.getClientOffset()
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top
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