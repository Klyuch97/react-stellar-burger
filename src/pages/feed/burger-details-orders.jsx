import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed.module.css"
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import BurgerIngredientsStyles from "../../components/burger-Ingredients/burger-Ingredients.module.css"
import { useMemo } from "react";


export const BurgerDetailsOrders = ({ data }) => {
    const { ingrid } = useSelector(store => store.burger);
    let IngredientId = data.ingredients;
    const location = useLocation();
    const ingredientsCurrent = IngredientId.map((data) => {
        const item = ingrid.find(item => item._id === data);
        return item;
    });
    let totalPrice = ingredientsCurrent.reduce((sum, item) => sum += item.price, 0);
    const id = data['_id'];

    const uniqueId = ingredientsCurrent && ingredientsCurrent.reverse().reduce((acc, currentValue) => {
        if (!acc.find(data => data._id === currentValue._id)) {
            acc.push(currentValue);
        }
        return acc;
    }, []
    );

    const count = useMemo(() => {
        return ingredientsCurrent.reduce(
            (acc, item) => ({ ...acc, [item._id]: (acc[item._id] || 0) + 1 }),
            {}
        );
    }, [ingredientsCurrent]);
    return (

        <Link
            className={BurgerIngredientsStyles.link}
            key={id}
            // Тут мы формируем динамический путь для нашего ингредиента
            to={`/feed/${id}`}
            // а также сохраняем в свойство background роут,
            // на котором была открыта наша модалка
            state={{ background: location }}>
            <div className={styles.burgerContainer}>
                <div className={`${styles.orderId} pb-6 pt-6`}>
                    <p className={`text text_type_digits-default`}>#{data.number}</p>
                    <p className={`text text_type_main-default text_color_inactive`}><FormattedDate date={new Date(data.createdAt)} /> </p>
                </div>
                <p className={`${styles.burgerName} text text_type_main-medium pb-6`}>{data.name}</p>
                <div className={`${styles.imgAndPrice} pb-6`}>
                    <div className={styles.containerImage}>
                        {uniqueId.map((data, index) =>
                            index < 7 && <div className={styles.frame} key={index}
                                style={{ zIndex: 10 - index }}>
                                <img src={data.image_mobile} className={styles.image}
                                 style={count[data._id] > 1 ? { opacity: "60%" } : {}} />
                                 {count[data._id] > 1 && <span className={`${styles.count} text text_type_main-medium`}>+{count[data._id]}</span>}
                            </div>)}
                    </div>
                    <div className={styles.price}>
                        <p className={`text text_type_digits-default`}>{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </Link>
    )
}