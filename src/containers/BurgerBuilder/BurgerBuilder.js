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
    loading: false,
    error: false
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    axios.get('/ingredients.json').then((response) => {
      if (response.status >= 200 && response.status < 400) {
        this.setState({ ingredients: response.data });
        this.updatePurchaseState(this.state.ingredients);
      } else {
        this.setState({ error: true });
      }
    }).catch(() => {
      this.setState({ error: true });
    })
    .finally(() => {
      this.setState({ loading: false });
    });
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
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Dummy Joe',
    //     address: {
    //       street: 'DM Str 1',
    //       zipCode: '1234',
    //       country: 'Switzerland'
    //     },
    //     email: 'dummy@gmail-test.com'
    //   },
    //   deliveryMethod: 'fastest'
    // };
    // this.setState({ loading: true });
    // axios.post('/orders.json', order)
    //   .then(response => console.log)
    //   .catch(error => console.log)
    //   .finally(() => {
    //     this.setState({ loading: false, purchasing: false });
    //   });
    const ingredients = Object.keys(this.state.ingredients)
    .map(k => k + '=' + this.state.ingredients[k])
    .join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?ingredients=' + encodeURIComponent(ingredients)
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
    let content = <Spinner />;
    if (this.state.loading && this.state.purchasing) {
      orderSummary = <Spinner />;
    }
    if (!this.state.loading && !this.state.error) {
      content = (<Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledControls={disabledControls}
          price={this.state.totalPrice}
          purchaseEnabled={this.state.purchasable}
          order={this.purchaseHandler}
        />
      </Aux>);
    } else if (this.state.error) {
      content = <div>The application has failed to load</div>;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {content}
      </Aux>
    );
  }
}

export default networkErrorHandler(BurgerBuilder, axios);