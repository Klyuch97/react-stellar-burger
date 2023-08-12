import React, { useContext } from 'react';
import BurgerIngredientsStyles from '../burger-Ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../../utils/prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, addItems } from '../../../services/actions/burgerState';
import { CountContext } from '../../../services/appContext';
import { useDrag } from 'react-dnd';

export const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';

const Ingredients = ({ data }) => {
    const { priceDispatcher } = useContext(CountContext);
    const dispatch = useDispatch();
    const [{ opacity }, ref] = useDrag({
        type: 'items',
        item: data._id ,
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })
      })

    const handleItemClick = React.useCallback((item) => {
        if (item.type === "bun") {
            //dispatch(addItem(item));
            priceDispatcher({ type: "incriment", payload: item });
            dispatch({ type: "MODAL_OPEN", payload: item });
        } else {
            //dispatch(addItems(item));
            dispatch({ type: "MODAL_OPEN", payload: item });
            priceDispatcher({ type: "incriment", payload: item });
        }
    }, [dispatch, addItem, addItems, priceDispatcher]);

    return (
        <>
            <div className={`${BurgerIngredientsStyles.content}`} 
            onClick={() => { handleItemClick(data) }}
            style={{opacity}}
            ref={ref} >

                <Counter count={0} size="default" extraClass="m-1" />
                <img className={BurgerIngredientsStyles.image} src={data.image} ></img>
                <div className={`${BurgerIngredientsStyles.price} pb-1 pt-1`}>
                    <p className="text text_type_digits-default">{data.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${BurgerIngredientsStyles.text} text text_type_main-default`} >{data.name}</p>
            </div>
        </>
    )
}

Ingredients.propTypes = {
    data: ingredientPropType
}

export default Ingredients;