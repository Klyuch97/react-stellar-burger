import { useEffect } from "react";
import { WS_CONNECTION_CLOSED, WS_INIT_USER_ORDER_START } from "../../services/actions/web-socket";
import { useDispatch, useSelector } from "react-redux";
import s from "./profile-orders.module.css"
import { ProfileOrderUser } from "./profile-order";


export const ProfileOrders = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: WS_INIT_USER_ORDER_START });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        }
    }, [dispatch]);
    let messageSocket = useSelector(state => state.feed.messages);
    let messagesOrdersNotFilter = messageSocket.orders;
    let messagesOrders = [];
    messagesOrdersNotFilter && messagesOrdersNotFilter.forEach(item => {
        if (item.ingredients.every(ingredient => ingredient !== null)) {
            messagesOrders.push(item);
        }
        //console.log(messagesOrders);
    });
    return (
        <div className={`${s.content} custom-scroll`}>
            {messagesOrders && messagesOrders.map((data, index) =>  <ProfileOrderUser data={data} key={data._id}/> ).reverse()}
        </div>
    )
}