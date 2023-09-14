import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { WS_CONNECTION_CLOSED,WS_INIT_USER_ORDER_START } from "../../services/actions/web-socket";
import s from "./profile-order-info.module.css"
import { IngredientItems } from "../../components/order-info-popup/ingridinets-items";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";


export const ProfileOrderInfo = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: WS_INIT_USER_ORDER_START });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        }
    }, [dispatch]);
    const { ingrid } = useSelector(store => store.burger);
    const { id } = useParams();
    let messageSocket = useSelector(state => state.feed.messages.orders);
    const data = messageSocket && messageSocket.find((elem) => elem._id === id);
    let IngredientId = data && data.ingredients;
    const ingredientsCurrent = IngredientId && IngredientId.map((data) => {
        const item = ingrid.find(item => item._id === data);
        return item;
    });

    const uniqueId = ingredientsCurrent && ingredientsCurrent.reverse().reduce((acc, currentValue) => {
        if (!acc.find(data => data._id === currentValue._id)) {
            acc.push(currentValue);
        }
        return acc;
    }, []);

    let totalPrice = ingredientsCurrent && ingredientsCurrent.reduce((sum, item) => sum += item.price, 0);

    const Status = () => {
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
                    {uniqueId.map((data, index) => <IngredientItems data={data} key={index} ingredientsCurrent={ingredientsCurrent} />)}
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