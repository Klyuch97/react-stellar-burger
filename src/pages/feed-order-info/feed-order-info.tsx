import { useEffect } from "react";
import { useParams } from "react-router-dom";
import s from "./feed-order-info.module.css"
import { IngredientItems } from "../../components/order-info-popup/ingridinets-items";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/constants";
import { useDispatch, useSelector } from "../../services/hooks";
import { Ingregient, OrderDetails } from "../../types/types";


export const FeedOrderInfo = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        }
    }, [dispatch]);

    const { ingrid } = useSelector(store => store.burger);

    const { id } = useParams();

    const messageSocket = useSelector(state => state.feed.messages.orders);

    const data: OrderDetails = messageSocket && messageSocket.find((elem: OrderDetails) => elem._id === id);


    const IngredientId: string[] = data && data.ingredients;

    const ingredientsCurrent: Ingregient[] | undefined = IngredientId && IngredientId
        .map((data: string) =>
            ingrid.find((item: Ingregient) =>
                item._id === data))
        .filter((item: Ingregient | undefined): item is Ingregient =>
            item !== undefined);


    const uniqueId: Ingregient[] = ingredientsCurrent && ingredientsCurrent.reduce((acc: Array<Ingregient>, currentValue: Ingregient) => {
        if (!acc.find((data: Ingregient) => data._id === currentValue._id)) {
            acc.push(currentValue);
        }
        return acc;
    }, []);

    const totalPrice: number = ingredientsCurrent && ingredientsCurrent.reduce((sum: number, item: Ingregient) => sum += item.price, 0);

    const Status = (): JSX.Element => {
        return (
            data.status === "done" ? <p className={`text text_type_main-default mb-15 ${s.status}`}>Выполнен</p>
                : <p className={`text text_type_main-default mb-15`}>Готовится</p>
        )
    }
    return (
        <>
            {data && <div className={s.content}>
                <p className={`text text_type_digits-default mb-10 ${s.number}`}>#{data.number}</p>
                <p className={`text text_type_main-medium mb-3`}>{data.name}</p>
                {<Status />}
                <p className={`text text_type_main-medium mb-6`}>Состав:</p>
                <div className={`${s.items} custom-scroll mb-10 `}>
                    {uniqueId.map((data: Ingregient, index: number) => <IngredientItems data={data} key={index} ingredientsCurrent={ingredientsCurrent} />)}
                </div>
                <div className={`${s.timePrice}`}>
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
