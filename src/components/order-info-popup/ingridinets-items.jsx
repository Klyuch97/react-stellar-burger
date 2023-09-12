import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import s from "./order-info-popup.module.css"
import { useSelector } from "react-redux";

export const IngredientItems = ({ data, ingredientsCurrent }) => {

   const uniqueId = ingredientsCurrent.reduce((acc, currentValue) => {
    if (!acc.find(data => data._id === currentValue._id)) {
        acc.push(currentValue);
    }
    return acc;
}, []
);

console.log(uniqueId);

    return (
        <div className={s.item}>
            <div className={`${s.frame}`}>
                <img src={data.image_mobile} className={s.image} />
            </div>
            <p className={` ${s.textPrice} text text_type_main-default ml-4`}>{data.name}</p>
            <div className={`${s.itemPrice}`}>
                <p className={`text text_type_digits-default mr-2`}>2x{data.price}</p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    )
}
