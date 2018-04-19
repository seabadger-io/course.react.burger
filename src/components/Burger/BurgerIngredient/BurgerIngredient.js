import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component {

  ingredientClasses = {
    'bread-bottom': 'BreadBottom',
    'bread-top': {
      class: 'BreadTop',
      subclasses: ['Seeds1', 'Seeds2']
    },
    'meat': 'Meat',
    'cheese': 'Cheese',
    'salad': 'Salad',
    'bacon': 'Bacon'
  };

  render() {
    const type = this.props.type;
    if (!(type in this.ingredientClasses)) return null;
    if (typeof this.ingredientClasses[type] === 'object') {
      const mainClass = this.ingredientClasses[type].class;
      return (
        <div className={classes[mainClass]}>
          {this.ingredientClasses[type]['subclasses'].map((sc) => {
            return <div className={classes[sc]}></div>;
          })}
        </div>
      );
    } else {
      const mainClass = this.ingredientClasses[type];
      return <div className={classes[mainClass]}></div>;
    }
  };

};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;
