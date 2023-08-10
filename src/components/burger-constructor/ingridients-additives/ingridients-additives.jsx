import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from '../burger-constructor.module.css';
import { ingredientPropType } from '../../../utils/prop-types'

const Ingridients = ({ data }) => {
    return (<li className={`${BurgerConstructorStyles.ingridients} mb-4`}>
        <DragIcon type="primary" />
        <ConstructorElement
            text={data.name}
            price={data.price}
            thumbnail={data.image}
        />
    </li>
    )
}

Ingridients.propTypes = {
    data: ingredientPropType
}

export default Ingridients