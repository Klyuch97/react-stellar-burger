import React, { useContext, useEffect } from 'react';
import BurgerIngredientsStyles from '../burger-Ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modal/modal';
import { IngredientDetails } from '../../ingredient-details/ingredient-details';
import { ingredientPropType } from '../../../utils/prop-types';
import { BurgerContext } from '../../../services/appContext';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, addItems } from '../../../services/actions/burgerState';
import { CountContext } from '../../../services/appContext';
import { MODAL_CLOSE, MODAL_OPEN } from '../../../services/actions/modal';

export const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';

const Ingredients = ({ data }) => {
    const { priceDispatcher } = useContext(CountContext);
    const dispatch = useDispatch();
    //const [modalActive, setModalActive] = React.useState(false);
    const { modalActive, currentIngrid } = useSelector(state => state.modal);



    const closeModal = () => {
        dispatch({ type: MODAL_CLOSE })
    }

    /*const handleItemClick = (item) => {
        if (item.type === "bun") {
            dispatch(addItem(item))
            priceDispatcher({ type: "incriment", payload: item });
           // dispatch({ type: "MODAL_OPEN" ,payload:item });
            //setModalActive(true);
        }
        else {
            dispatch(addItems(item))
           // dispatch({ type: "MODAL_OPEN" ,payload:item });
            priceDispatcher({ type: "incriment", payload: item });
            //setModalActive(true);
        }
    }*/
    const handleItemClick = React.useCallback((item) => {
        if (item.type === "bun") {
            dispatch(addItem(item));
            priceDispatcher({ type: "incriment", payload: item });
            dispatch({ type: "MODAL_OPEN", payload: item });
            // setModalActive(true);
        } else {
            dispatch(addItems(item));
            dispatch({ type: "MODAL_OPEN", payload: item });
            priceDispatcher({ type: "incriment", payload: item });
            // setModalActive(true);
        }
    }, [dispatch, addItem, addItems, priceDispatcher]);

    return (
        <>
            <div className={`${BurgerIngredientsStyles.content}`} onClick={() => { handleItemClick(data) }} >
                <Counter count={0} size="default" extraClass="m-1" />
                <img className={BurgerIngredientsStyles.image} src={data.image} ></img>
                <div className={`${BurgerIngredientsStyles.price} pb-1 pt-1`}>
                    <p className="text text_type_digits-default">{data.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${BurgerIngredientsStyles.text} text text_type_main-default`} >{data.name}</p>
            </div>

            {
                modalActive && currentIngrid && <Modal onClose={closeModal}>
                    <IngredientDetails /></Modal>
            }
        </>
    )
}

Ingredients.propTypes = {
    data: ingredientPropType
}

export default Ingredients;