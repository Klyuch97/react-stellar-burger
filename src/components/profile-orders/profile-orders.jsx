import { useEffect } from "react";
import { WS_CONNECTION_CLOSED, WS_INIT_USER_ORDER_START } from "../../services/actions/web-socket";
import { useDispatch, useSelector } from "react-redux";

export const ProfileOrders = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.user)
   // console.log(user);
    useEffect(() => {
        
            dispatch({ type: WS_INIT_USER_ORDER_START });
        
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        }
    }, [dispatch]);
    return (
        <>
            <p>История заказ</p>
        </>
    )
}