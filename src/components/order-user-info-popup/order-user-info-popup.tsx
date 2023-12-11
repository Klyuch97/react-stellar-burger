import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import s from "./order-user-info-popup.module.css"
import { useParams } from "react-router-dom";
import { IngredientItems } from "./ingridinets-items";
import { useSelector } from "../../services/hooks";
import { Ingregient, OrderDetails } from "../../types/types";
import { FC } from "react";


export const OrderUserInfoPopup: FC = () => {
    const { ingrid } = useSelector(store => store.burger);
    const { id } = useParams();
    const messageSocket = useSelector(state => state.feed.messages.orders);
    const data: OrderDetails = messageSocket && messageSocket.find((elem: OrderDetails) => elem._id === id);
    const IngredientId: string[] = data && data.ingredients;
    const ingredientsCurrent: Ingregient[] | undefined = IngredientId && IngredientId
        .map((data: string) =>
            ingrid.find((item: Ingregient) => item._id === data))
        .filter((item: Ingregient | undefined): item is Ingregient =>
            item !== undefined);

    const uniqueId: Ingregient[] = ingredientsCurrent && ingredientsCurrent.reverse().reduce((acc: Ingregient[], currentValue: Ingregient) => {
        if (!acc.find(data => data._id === currentValue._id)) {
            acc.push(currentValue);
        }
        return acc;
    }, []
    );

    const totalPrice: number = ingredientsCurrent && ingredientsCurrent.reduce((sum: number, item: Ingregient) => sum += item.price, 0);

    const Status = (): JSX.Element => {
        return (
            data.status === "done" ? <p className={`text text_type_main-default ${s.statusDone}`}>Выполнен</p>
                : <p className={`text text_type_main-default  ${s.statusPending}`}>Готовится</p>
        )
    }
    return (
        <>
            {data && <div>
                <p className={`text text_type_digits-default mb-5 mt-20 ${s.number}`}>#{data.number}</p>
                <p className={`text text_type_main-medium mb-2 ${s.name}`}>{data.name}</p>
                {<Status />}
                <p className={`text text_type_main-medium mb-6 mt-15 ${s.compound}`}>Состав:</p>
                <div className={`${s.items} custom-scroll `}>
                    {uniqueId.map((data: Ingregient, index: number) => <IngredientItems data={data} key={index} ingredientsCurrent={ingredientsCurrent} />)}
                </div>
                <div className={`${s.timePrice} mt-10 mb-10`}>
                    <p className={`text text_type_main-default`}><FormattedDate date={new Date(data.createdAt)} /></p>
                    <div className={`${s.price}`}>
                        <p className={`text text_type_digits-default mr-2`}>{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>}
        </>
    )
}