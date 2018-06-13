import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  cancelHandler = () => {
    this.props.history.goBack();
  }

  submitHandler = () => {
    this.props.history.push('/checkout/order-data')
  }

  render() {
    if (this.props.ingredients === null) {
      return <Spinner />;
    }
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          onCancel={this.cancelHandler}
          onSubmit={this.submitHandler}
        />
        <Route
          path={this.props.match.path + '/order-data'}
          component={ContactData}
        />;
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);