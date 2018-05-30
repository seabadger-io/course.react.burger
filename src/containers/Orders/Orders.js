import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import networkErrorHandler from '../../hoc/networkErrorHandler/networkErrorHandler';

class Orders extends Component {
  state = {
    loading: true,
    orders: []
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then((response) => {
        const orders = [];
        for (let key in response.data) {
          orders.push({ id: key, ...response.data[key] });
        }
        this.setState({ orders: orders });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => <Order key={order.id} data={order} />)}
      </div>
    )
  }
};

export default networkErrorHandler(Orders, axios);