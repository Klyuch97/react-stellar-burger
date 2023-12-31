import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
  //укажите здесь prop-types для ингридиента
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name:PropTypes.string.isRequired,
  _id:PropTypes.string.isRequired,
  type:PropTypes.string.isRequired,
  proteins:PropTypes.number.isRequired,
  fat:PropTypes.number.isRequired,
  carbohydrates:PropTypes.number.isRequired,
  calories:PropTypes.number.isRequired,
  image_mobile:PropTypes.string.isRequired,
  image_large:PropTypes.string.isRequired,
  __v:PropTypes.number.isRequired
});
