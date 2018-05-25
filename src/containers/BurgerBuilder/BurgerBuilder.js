import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import networkErrorHandler from '../../hoc/networkErrorHandler/networkErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.9,
  bacon: 1,
  meat: 2
};

const MAX_PER_INGREDIENT = 3;

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map((igKey) => {
      return ingredients[igKey];
    })
    .reduce((sum, el) => {
      return sum + el;
    }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    if (this.state.ingredients[type] >= MAX_PER_INGREDIENT) return;
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) return;
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    // alert('Ok. Yet to implement this functionality');
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Dummy Joe',
        address: {
          street: 'DM Str 1',
          zipCode: '1234',
          country: 'Switzerland'
        },
        email: 'dummy@gmail-test.com'
      },
      deliveryMethod: 'fastest'
    };
    this.setState({ loading: true });
    axios.post('/orders.json', order)
      .then(response => console.log)
      .catch(error => console.log)
      .finally(() => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledControls = {};
    Object.keys(this.state.ingredients).forEach((key) => {
      disabledControls[key] = {
        more: this.state.ingredients[key] >= MAX_PER_INGREDIENT,
        less: this.state.ingredients[key] <= 0
      };
    });
    let orderSummary = <OrderSummary
    ingredients={this.state.ingredients}
    price={this.state.totalPrice}
    oncancel={this.purchaseCancelHandler}
    oncontinue={this.purchaseContinueHandler}
    />;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledControls={disabledControls}
          price={this.state.totalPrice}
          purchaseEnabled={this.state.purchasable}
          order={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default networkErrorHandler(BurgerBuilder, axios);