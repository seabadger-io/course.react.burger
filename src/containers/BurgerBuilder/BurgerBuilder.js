import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import networkErrorHandler from '../../hoc/networkErrorHandler/networkErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount = () => {
    this.props.initIngredients();
  }

  isPurchasable = () => {
    const sum = Object.keys(this.props.ingredients).map((igKey) => {
      return this.props.ingredients[igKey];
    })
    .reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: '/checkout'
    });
  };

  render() {

    let orderSummary = <Spinner/>;
    let content = <Spinner />;
    if (null !== this.props.ingredients && this.state.purchasing) {
      orderSummary = <OrderSummary
      ingredients={this.props.ingredients}
      price={this.props.totalPrice}
      oncancel={this.purchaseCancelHandler}
      oncontinue={this.purchaseContinueHandler}
      />;
    }
    if (null !== this.props.ingredients && !this.props.error) {
      const disabledControls = {};
      Object.keys(this.props.ingredients).forEach((key) => {
        disabledControls[key] = {
          more: this.props.ingredients[key] >= this.props.MAX_PER_INGREDIENT,
          less: this.props.ingredients[key] <= 0
        };
      });
      content = (<Aux>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabledControls={disabledControls}
          price={this.props.totalPrice}
          purchaseEnabled={this.isPurchasable()}
          order={this.purchaseHandler}
        />
      </Aux>);
    } else if (this.props.error) {
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    error: state.error,
    MAX_PER_INGREDIENT: state.MAX_PER_INGREDIENT
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    initIngredients: () => dispatch(actions.asyncInitIngredients())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(networkErrorHandler(BurgerBuilder, axios));