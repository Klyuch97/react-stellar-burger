import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed.module.css"


export const BurgerDetailsOrders = ({ data }) => {
    console.log(data);
    return (
        <div className={styles.burgerContainer}>
            <div className={`${styles.orderId} mb-6 mt-6`}>
                <p className={`text text_type_digits-default`}>#{data.number}</p>
                <p className={`text text_type_main-default text_color_inactive`}><FormattedDate date={new Date(data.createdAt)} /> </p>
            </div>
            <p className={`${styles.burgerName} text text_type_main-medium mb-6`}>{data.name}</p>
        </div>
    )
}