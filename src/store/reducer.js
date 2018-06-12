import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.9,
  bacon: 1,
  meat: 2
};

const MAX_PER_INGREDIENT = 3;

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4,
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
    default:
      return state;
  }
};

export default reducer;