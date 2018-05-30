import React from 'react';
import classes from './Order.css';

export default (props) => {
  const ingredients = props.data.ingredients;
  if (!ingredients) return null;
  const ingredientsStr = Object.keys(ingredients).map((i) => {
    return i + ' (' + ingredients[i] + ')'; 
  }).join(', ');
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsStr}</p>
      <p>Price: {props.data.price}</p>
    </div>
  )
};
