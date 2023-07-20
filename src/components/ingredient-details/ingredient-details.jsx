import IngridDetailsStyles from './ingredient-details.module.css'


export const IngredientDetails = ({ data }) => {
    return (
        <div>
            <h2 className={`text text_type_main-large pt-10 ${IngridDetailsStyles.title}`}>Детали ингредиента</h2>
            <div className={IngridDetailsStyles.content}>
                <img src={data.image} className={IngridDetailsStyles.image}></img>
                <p className={"text text_type_main-medium mb-8 mt-4"}>{data.name}</p>
                <div className={`${IngridDetailsStyles.items} mb-15`}>
                    <div className={IngridDetailsStyles.item}>
                        <p className='text text_type_main-default'>Калории,ккал</p>
                        <p className='text text_type_digits-default'>{data.calories}</p>
                    </div>
                    <div className={IngridDetailsStyles.item}>
                        <p className='text text_type_main-default'>Белки, г</p>
                        <p className='text text_type_digits-default'>{data.proteins}</p>
                    </div>
                    <div className={IngridDetailsStyles.item}>
                        <p className='text text_type_main-default'>Жиры, г</p>
                        <p className='text text_type_digits-default'>{data.fat}</p>
                    </div>
                    <div className={IngridDetailsStyles.item}>
                        <p className='text text_type_main-default'>Углеводы, г</p>
                        <p className='text text_type_digits-default'>
                            {data.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}