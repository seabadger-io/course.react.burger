import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import networkErrorHandler from '../../hoc/networkErrorHandler/networkErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount = () => {
    // this.setState({ loading: true });
    // axios.get('/ingredients.json').then((response) => {
    //   if (response.status >= 200 && response.status < 400) {
    //     this.setState({ ingredients: response.data });
    //     this.updatePurchaseState(this.state.ingredients);
    //   } else {
    //     this.setState({ error: true });
    //   }
    // }).catch(() => {
    //   this.setState({ error: true });
    // })
    // .finally(() => {
    //   this.setState({ loading: false });
    // });
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
    // alert('Ok. Yet to implement this functionality');
    const ingredients = Object.keys(this.state.ingredients)
    .map(k => k + '=' + this.state.ingredients[k])
    .join('&');
    const price = 'price=' + this.props.totalPrice;
    this.props.history.push({
      pathname: '/checkout',
      search: '?ingredients=' + encodeURIComponent(ingredients) + '&' + price
    });
  };

  render() {
    const disabledControls = {};
    Object.keys(this.props.ingredients).forEach((key) => {
      disabledControls[key] = {
        more: this.props.ingredients[key] >= this.props.MAX_PER_INGREDIENT,
        less: this.props.ingredients[key] <= 0
      };
    });
    let orderSummary = <OrderSummary
    ingredients={this.props.ingredients}
    price={this.props.totalPrice}
    oncancel={this.purchaseCancelHandler}
    oncontinue={this.purchaseContinueHandler}
    />;
    let content = <Spinner />;
    if (this.state.loading && this.state.purchasing) {
      orderSummary = <Spinner />;
    }
    if (!this.state.loading && !this.state.error) {
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    MAX_PER_INGREDIENT: state.MAX_PER_INGREDIENT
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName }),
    onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(networkErrorHandler(BurgerBuilder, axios));