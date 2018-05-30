import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

export default class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 0,
      cheese: 2,
      bacon: 0
    }
  }

  cancelHandler = () => {
    this.props.history.goBack();
  }

  submitHandler = () => {
    this.props.history.push('/checkout/order-data')
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCancel={this.cancelHandler}
          onSubmit={this.submitHandler}
        />
      </div>
    )
  }
};
