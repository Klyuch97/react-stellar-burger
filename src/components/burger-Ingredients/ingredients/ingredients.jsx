import React, { useContext, useEffect } from 'react';
import BurgerIngredientsStyles from '../burger-Ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modal/modal';
import { IngredientDetails } from '../../ingredient-details/ingredient-details';
import { ingredientPropType } from '../../../utils/prop-types';
import { BurgerContext } from '../../../services/appContext';
import { useDispatch, useSelector } from 'react-redux';
import { addItem,addItems } from '../../../services/actions/burgerState';

export const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';

const Ingredients = ({ data }) => {
    const { selectedItemBuns, selectedItems } = useSelector(state => state.burger);

    const dispatch = useDispatch();

    const [modalActive, setModalActive] = React.useState(false);
    const closeModal = () => {
        setModalActive(false)
    }

    const handleItemClick = (item) => {
        if (item.type === "bun") {
            dispatch(addItem(item))
        }
        else {
            dispatch(addItems(item))
            // priceDispatcher({ type: "incriment", payload: item });
        }
    }
   

    return (
        <>
            <div className={`${BurgerIngredientsStyles.content}`} onClick={() => handleItemClick(data)} >
                <Counter count={0} size="default" extraClass="m-1" />
                <img className={BurgerIngredientsStyles.image} src={data.image}></img>
                <div className={`${BurgerIngredientsStyles.price} pb-1 pt-1`}>
                    <p className="text text_type_digits-default">{data.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${BurgerIngredientsStyles.text} text text_type_main-default`} >{data.name}</p>
            </div>

            {
                modalActive && <Modal active={modalActive} onClose={closeModal}>
                    <IngredientDetails data={data} /></Modal>
            }
        </>
    )
}

Ingredients.propTypes = {
    data: ingredientPropType
}

export default Ingredients;