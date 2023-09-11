import { useDispatch, useSelector } from "react-redux";
import styles from "./feed.module.css"
import { useEffect } from "react";
import { WS_CONNECTION_START } from "../../services/actions/web-socket";
import { BurgerDetailsOrders } from "./burger-details-orders";




export const Feed = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
    }, [dispatch]);
    let messageSocket = useSelector(state => state.feed.messages);
    let messagesOrders = messageSocket.orders


    return (
        <div className={`${styles.content}`}>
            <p className={`${styles.text} mb-5 text text_type_main-large`}>Лента заказов</p>
            <div className={styles.block}>
                <div className={`${styles.orderFeed} custom-scroll`}>
                    {messagesOrders && messagesOrders.map((data, index) => <BurgerDetailsOrders data={data} key={data._id}/>)}
                </div>
                <div className={styles.statusFeed}></div>
            </div>
        </div>
    )
}