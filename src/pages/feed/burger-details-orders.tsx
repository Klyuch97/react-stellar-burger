import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed.module.css"
import { Link, useLocation } from "react-router-dom";
import BurgerIngredientsStyles from "../../components/burger-Ingredients/burger-Ingredients.module.css"
import { FC, useMemo } from "react";
import { IIngregient, IOrderDetails } from "../../types/types";
import { useSelector } from "../../services/hooks";

interface IBurgerDetailsOrders {
    data: IOrderDetails
}

export const BurgerDetailsOrders: FC<IBurgerDetailsOrders> = ({ data }) => {
    const { ingrid } = useSelector(store => store.burger);
    const IngredientId: string[] = data.ingredients;
    const location = useLocation();
    const ingredientsCurrent: IIngregient[] | undefined = IngredientId && IngredientId
    .map((data: string) =>
        ingrid.find((item: IIngregient) =>
            item._id === data))
    .filter((item: IIngregient | undefined): item is IIngregient =>
        item !== undefined);
    const totalPrice: number = ingredientsCurrent.reduce((sum: number, item: IIngregient) => sum += item.price, 0);
    const id: string = data['_id'];

    const uniqueId: IIngregient[] = ingredientsCurrent && ingredientsCurrent.reverse().reduce((acc: Array<IIngregient>, currentValue: IIngregient) => {
        if (!acc.find((data: IIngregient) => data._id === currentValue._id)) {
            acc.push(currentValue);
        }
        return acc;
    }, []
    );

    const count: { [key: string]: number } = useMemo(() => {
        return ingredientsCurrent.reduce(
            (acc: { [key: string]: number }, item: IIngregient) => ({ ...acc, [item._id]: (acc[item._id] || 0) + 1 }),
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
                        {uniqueId.map((data: IIngregient, index: number) =>
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