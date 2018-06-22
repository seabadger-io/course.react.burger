import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions';

class Checkout extends Component {

  cancelHandler = () => {
    this.props.history.goBack();
  }

  submitHandler = () => {
    this.props.history.push('/checkout/order-data')
  }

  render() {
    if (this.props.ingredients === null ||
        this.props.purchased) {
      return <Redirect to="/" />;
    }
    if (! this.props.isAuthenticated) {
      this.props.setAuthContinueUrl('/checkout');
      return <Redirect to="/auth" />;
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
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
    isAuthenticated: state.auth.idToken !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthContinueUrl: (url) => { dispatch(actions.setAuthContinueUrl(url)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);