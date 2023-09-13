import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import s from './profile-orders.module.css'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';



export const ProfileOrderUser = ({ data }) => {
    const { ingrid } = useSelector(store => store.burger);
    let IngredientId = data.ingredients;
    const location = useLocation();
    const ingredientsCurrent = IngredientId.map((data) => {
        const item = ingrid.find(item => item._id === data);
        return item;
    });

    const uniqueId = ingredientsCurrent && ingredientsCurrent.reduce((acc, currentValue) => {
        if (!acc.find(data => data._id === currentValue._id)) {
            acc.push(currentValue);
        }
        return acc;
    }, []
    );

    let totalPrice = ingredientsCurrent.reduce((sum, item) => sum += item.price, 0);
    const id = data['_id'];
    const count = useMemo(() => {
        return ingredientsCurrent.reduce(
            (acc, item) => ({ ...acc, [item._id]: (acc[item._id] || 0) + 1 }),
            {}
        );
    }, [ingredientsCurrent]);
    return (
        <>
            <div className={`${s.items} mb-6`}>
                <div className={s.item}>
                    <div className={`${s.numberTime} pt-6 pb-6`}>
                        <p className="text text_type_digits-default">#{data.number}</p>
                        <p className={`text text_type_main-default text_color_inactive`}><FormattedDate date={new Date(data.createdAt)} /> </p>
                    </div>
                    <p className="text text_type_main-medium mb-2">{data.name}</p>
                    <p className="text text_type_main-default">Создан</p>

                    <div className={`${s.imgAndPrice} pb-6 pt-6`}>
                        <div className={s.containerImage}>
                            {uniqueId.map((data, index) =>
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
        </>
    )
}