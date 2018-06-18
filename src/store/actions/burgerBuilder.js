import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = (ingredients) => {
  const orderedIngredients = {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
    ...ingredients
  };
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: orderedIngredients
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const asyncInitIngredients = () => {
  return (dispatch) => {
    axios.get('/ingredients.json').then((response) => {
      if (response.status >= 200 && response.status < 400) {
        dispatch(setIngredients(response.data));
      } else {
        dispatch(fetchIngredientsFailed());
      }
    }).catch(() => {
      dispatch(fetchIngredientsFailed());
    });
  };
}
