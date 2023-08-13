import IngridDetailsStyles from './ingredient-details.module.css'
import { ingredientPropType } from '../../utils/prop-types';
import { useSelector } from 'react-redux';


export const IngredientDetails = () => {
const data = useSelector(state=>state.burger.currentIngrid)
    return (
        <div>
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
        </div>
    )
}

IngredientDetails.propTypes = {
    data: ingredientPropType
}