import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component {
  state = {
    ingredients: null
  }

  componentWillMount = () => {
    const params = new URLSearchParams(this.props.location.search);
    const ingredientsStr = params.get('ingredients');
    if (!ingredientsStr) {
      this.props.history.replace('/');
      return;
    }
    const ingredientsParams = new URLSearchParams(decodeURIComponent(ingredientsStr));
    const ingredients = {};
    for (const i of ingredientsParams.entries()) {
      ingredients[i[0]] = +i[1];
    }
    this.setState({ ingredients: ingredients });
  }

  cancelHandler = () => {
    this.props.history.goBack();
  }

  submitHandler = () => {
    this.props.history.push('/checkout/order-data')
  }

  render() {
    if (this.state.ingredients === null) {
      return <Spinner />;
    }
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCancel={this.cancelHandler}
          onSubmit={this.submitHandler}
        />
        <Route path={this.props.match.path + '/order-data'} component={ContactData} />;
      </div>
    )
  }
};
