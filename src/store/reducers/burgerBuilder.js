import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.9,
  bacon: 1,
  meat: 2
};

const MAX_PER_INGREDIENT = 3;

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  MAX_PER_INGREDIENT: MAX_PER_INGREDIENT
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      if (state.ingredients[action.ingredientName] >= MAX_PER_INGREDIENT) return state;
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      if (state.ingredients[action.ingredientName] <= 0) return state;
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;