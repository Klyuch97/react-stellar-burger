import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import s from './profile-orders.module.css'
import { Link, useLocation } from 'react-router-dom';
import { FC, useMemo } from 'react';
import { useSelector } from '../../services/hooks';
import { Ingregient, OrderDetails } from '../../types/types';

type ProfileOrder ={
    data: OrderDetails
}

export const ProfileOrderUser: FC<ProfileOrder> = ({ data }) => {
    const { ingrid } = useSelector(store => store.burger);
    const IngredientId = data.ingredients;
    const location = useLocation();
    const ingredientsCurrent: Ingregient[] | undefined = IngredientId && IngredientId
        .map((data: string) =>
            ingrid.find((item: Ingregient) =>
                item._id === data))
        .filter((item: Ingregient | undefined): item is Ingregient =>
            item !== undefined);


    const uniqueId: Ingregient[]= ingredientsCurrent && ingredientsCurrent.reverse().reduce((acc: Array<Ingregient>, currentValue: Ingregient) => {
        if (!acc.find((data) => data._id === currentValue._id)) {
            acc.push(currentValue);
        }
        return acc;
    }, []
    );

    const totalPrice: number = ingredientsCurrent.reduce((sum: number, item: Ingregient) => sum += item.price, 0);

    const id: string = data['_id'];

    const count: { [key: string]: number } = useMemo(() => {
        return ingredientsCurrent.reduce(
            (acc: { [key: string]: number }, item: Ingregient) => ({ ...acc, [item._id]: (acc[item._id] || 0) + 1 }),
            {}
        );
    }, [ingredientsCurrent]);

    const Status = (): JSX.Element => {
        return (
            data.status === "done" ? <p className={`text text_type_main-default ${s.statusDone}`}>Выполнен</p>
                : <p className={`text text_type_main-default`}>Готовится</p>
        )
    }
    return (
        <Link
            className={s.link}
            key={id}
            // Тут мы формируем динамический путь для нашего ингредиента
            to={`/profile/orders/${id}`}
            // а также сохраняем в свойство background роут,
            // на котором была открыта наша модалка
            state={{ background: location }}>
            <div className={`${s.items} mb-6`}>
                <div className={s.item}>
                    <div className={`${s.numberTime} pt-6 pb-6`}>
                        <p className="text text_type_digits-default">#{data.number}</p>
                        <p className={`text text_type_main-default text_color_inactive`}><FormattedDate date={new Date(data.createdAt)} /> </p>
                    </div>
                    <p className="text text_type_main-medium mb-2">{data.name}</p>
                    {<Status />}
                    <div className={`${s.imgAndPrice} pb-6 pt-6`}>
                        <div className={s.containerImage}>
                            {uniqueId.map((data: Ingregient, index: number) =>
                                index < 7 && <div className={s.frame} key={index}
                                    style={{ zIndex: 10 - index }}>
                                    <img src={data.image_mobile} className={s.image}
                                        style={count[data._id] > 1 ? { opacity: "60%" } : {}} />
                                    {count[data._id] > 1 && <span className={`${s.count} text text_type_main-medium`}>+{count[data._id]}</span>}
                                </div>)}
                        </div>
                        <div className={s.price}>
                            <p className={`text text_type_digits-default`}>{totalPrice}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    )
}