import { useDispatch, useSelector } from "react-redux";
import styles from "./feed.module.css"
import { useEffect } from "react";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/actions/web-socket";
import { BurgerDetailsOrders } from "./burger-details-orders";




export const Feed = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        }
    }, [dispatch]);
    let messageSocket = useSelector(state => state.feed.messages);
    let messagesOrders = messageSocket.orders;

    return (
        <div className={`${styles.content}`}>
            <p className={`${styles.text} mb-5 text text_type_main-large`}>Лента заказов</p>
            <div className={styles.block}>
                <div className={`${styles.orderFeed} custom-scroll`}>
                    {messagesOrders && messagesOrders.map((data, index) => <BurgerDetailsOrders data={data} key={data._id} />)}
                </div>
                <div className={styles.statusFeed}>

                    <p className={`text text_type_main-medium mt-15`}>Выполнено за все время:</p>
                    <p className={`text text_type_digits-large mb-15`}>{messageSocket.total}</p>
                    <p className={`text text_type_main-medium mt-15`}>Выполнено за сегодня:</p>
                    <p className={`text text_type_digits-large mb-15`}>{messageSocket.totalToday}</p>
                </div>
            </div>
        </div>
    )
}