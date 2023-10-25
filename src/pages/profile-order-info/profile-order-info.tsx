import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import s from "./profile-order-info.module.css"
import { IngredientItems } from "../../components/order-info-popup/ingridinets-items";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { WS_CONNECTION_CLOSED, WS_INIT_USER_ORDER_START } from "../../services/constants";
import { useDispatch, useSelector } from "../../services/hooks";
import { IIngregient, IOrderDetails } from "../../types/types";


export const ProfileOrderInfo: FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: WS_INIT_USER_ORDER_START });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        }
    }, [dispatch]);

    const { ingrid } = useSelector(store => store.burger);

    const { id } = useParams();

    const messageSocket = useSelector(state => state.feed.messages.orders);

    const data: IOrderDetails = messageSocket && messageSocket.find((elem: any) => elem._id === id);

    const IngredientId: string[] = data && data.ingredients;

    const ingredientsCurrent: any = IngredientId && IngredientId.map((data: string) => {
        const item = ingrid.find((item: IIngregient) => item._id === data);
        return item;
    });

    const uniqueId = ingredientsCurrent && ingredientsCurrent.reverse().reduce((acc: any, currentValue: any) => {
        if (!acc.find((data: IIngregient) => data._id === currentValue._id)) {
            acc.push(currentValue);
        }
        return acc;
    }, []);

    const totalPrice = ingredientsCurrent && ingredientsCurrent.reduce((sum: number, item: any) => sum += item.price, 0);

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
                    {uniqueId.map((data: IIngregient, index: number) => <IngredientItems data={data} key={index} ingredientsCurrent={ingredientsCurrent} />)}
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