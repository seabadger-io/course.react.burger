import React, { Component } from 'react';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

export default class ContactData extends Component {
  state = {
    name: '',
    email: '',
    totalPrice: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault();
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
        this.setState({ loading: false });
        this.props.history.push('/');
      });
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return (
        <div className={classes.ContactData}>
          <h4>Enter your contact information</h4>
          <form>
            <input type="text" name="name" placeholder="Your name" className={classes.Input} />
            <input type="email" name="email" placeholder="Your email" className={classes.Input} />
            <input type="text" name="street" placeholder="Street" className={classes.Input} />
            <input type="text" name="postalCode" placeholder="Postal code" className={classes.Input} />
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
          </form>
        </div>
      );
    }
  }
};
