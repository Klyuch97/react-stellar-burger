import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed.module.css"
import { useSelector } from "react-redux";


export const BurgerDetailsOrders = ({ data }) => {
    const { ingrid } = useSelector(store => store.burger);
    let IngredientId = data.ingredients;

    const ingredientsCurrent = IngredientId.map((data) => {
        const item = ingrid.find(item => item._id === data);
        return item;
    });
    //console.log(ingredientsCurrent);
    let totalPrice = ingredientsCurrent.reduce((sum, item) => sum += item.price, 0);


    return (
        <div className={styles.burgerContainer}>
            <div className={`${styles.orderId} pb-6 pt-6`}>
                <p className={`text text_type_digits-default`}>#{data.number}</p>
                <p className={`text text_type_main-default text_color_inactive`}><FormattedDate date={new Date(data.createdAt)} /> </p>
            </div>
            <p className={`${styles.burgerName} text text_type_main-medium pb-6`}>{data.name}</p>
            <div className={`${styles.imgAndPrice} pb-6`}>
                <div className={styles.containerImage}>
                    {ingredientsCurrent.map((data, index) =>
                        index < 7 && <div className={styles.frame} key={index}
                            style={{ zIndex: 10 - index }}>
                            <img src={data.image_mobile} className={styles.image} />
                        </div>)}
                </div>
                <div className={styles.price}>
                    <p className={`text text_type_digits-default`}>{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}