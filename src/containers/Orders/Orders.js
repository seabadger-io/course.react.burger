import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import networkErrorHandler from '../../hoc/networkErrorHandler/networkErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders(this.props.idToken);
  }

  render() {
    if (this.props.loading) {
      return <Spinner />
    }
    return (
      <div>
        {this.props.orders.map((order) => <Order key={order.id} data={order} />)}
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    idToken: state.auth.idToken
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(networkErrorHandler(Orders, axios));