import React, { useContext, useState } from 'react';
import BurgerIngredientsStyles from '../burger-Ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../../utils/prop-types';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { CounterContext } from '../../../services/appContext';

export const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';

const Ingredients = ({ data }) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const [{ opacity }, ref] = useDrag({
        type: data.type === "bun" ? "itemBun" : "itemOther",
        item: data,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })
    const handleItemClick = (item) => {
        // dispatch({ type: "MODAL_OPEN", payload: item });
        if (item.type === "bun") { 
            setCount(1); }
            else {
                setCount(count+1)  
            }


    }

    return (
        <>
            <div className={`${BurgerIngredientsStyles.content}`}
                onClick={() => { handleItemClick(data) }}
                style={{ opacity }}
                ref={ref} >

                {count !== 0 && <Counter count={count} size="default" extraClass="m-1" />}
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