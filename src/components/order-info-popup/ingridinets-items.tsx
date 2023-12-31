import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import s from "./order-info-popup.module.css"
import { FC, useMemo } from "react";
import { IIngredientsItem, Ingregient } from "../../types/types";




export const IngredientItems:FC<IIngredientsItem> = ({ data, ingredientsCurrent }) => {
    const count: { [key: string]: number } = useMemo(() => {
        return ingredientsCurrent.reduce(
            (acc: { [key: string]: number }, item:Ingregient) => ({ ...acc, [item._id]: (acc[item._id] || 0) + 1 }),
            {}
        );
    }, [ingredientsCurrent]);

    return (
        <div className={s.item}>
            <div className={`${s.frame}`}>
                <img src={data.image_mobile} className={s.image} />
            </div>
            <p className={` ${s.textPrice} text text_type_main-default ml-4`}>{data.name}</p>
            <div className={`${s.itemPrice}`}>
                <p className={`text text_type_digits-default mr-2`}>{count[data._id]}x{data.price}</p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    )
}
