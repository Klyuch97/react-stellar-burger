import IngridDetailsStyles from './ingredient-details.module.css'
import { ingredientPropType } from '../../utils/prop-types';
import { useParams } from 'react-router-dom';
import { getIngrid } from '../../services/actions/burgerState';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { Ingregient } from '../../types/types';


export const IngredientDetails: FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getIngrid());
    }, [dispatch]);
    const { id } = useParams();
    const ingrids = useSelector((state) => state.burger.ingrid);
    const data: Ingregient | undefined = ingrids.find((elem: Ingregient) => elem._id === id);

    return (
        <>
            {data && <div>
                <h2 className={`text text_type_main-large pt-10 ${IngridDetailsStyles.title}`}>Детали ингредиента</h2>
                <div className={IngridDetailsStyles.content}>
                    <img src={data.image} className={IngridDetailsStyles.image} alt={data.name}></img>
                    <p className={"text text_type_main-medium mb-8 mt-4"}>{data.name}</p>
                    <div className={`${IngridDetailsStyles.items} mb-15`}>
                        <div className={IngridDetailsStyles.item}>
                            <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                            <p className='text text_type_digits-default text_color_inactive'>{data.calories}</p>
                        </div>
                        <div className={IngridDetailsStyles.item}>
                            <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                            <p className='text text_type_digits-default text_color_inactive'>{data.proteins}</p>
                        </div>
                        <div className={IngridDetailsStyles.item}>
                            <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                            <p className='text text_type_digits-default text_color_inactive'>{data.fat}</p>
                        </div>
                        <div className={IngridDetailsStyles.item}>
                            <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                            <p className='text text_type_digits-default text_color_inactive'>
                                {data.carbohydrates}</p>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

