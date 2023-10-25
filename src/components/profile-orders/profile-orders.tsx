import { FC, useEffect } from "react";
import { WS_CONNECTION_CLOSED, WS_INIT_USER_ORDER_START } from "../../services/actions/web-socket";
import s from "./profile-orders.module.css"
import { ProfileOrderUser } from "./profile-order";
import { useDispatch, useSelector } from "../../services/hooks";
import { IOrderDetails } from "../../types/types";

export const ProfileOrders:FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: WS_INIT_USER_ORDER_START });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        }
    }, [dispatch]);

    const messageSocket = useSelector(state => state.feed.messages);
    const messagesOrdersNotFilter = messageSocket.orders;
    const messagesOrders:Array<IOrderDetails> = [];
    
    messagesOrdersNotFilter && messagesOrdersNotFilter.forEach((item:IOrderDetails) => {
        if (item.ingredients.every((ingredient:string) => ingredient !== null)) {
           messagesOrders.push(item);
        }
    });

    return (
        <div className={`${s.content} custom-scroll`}>
            {messagesOrders && messagesOrders.map((data:IOrderDetails) => <ProfileOrderUser data={data} key={data._id} />).reverse()}
        </div>
    )
}