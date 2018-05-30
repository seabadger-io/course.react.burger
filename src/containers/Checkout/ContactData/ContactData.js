import React, { Component } from 'react';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';

export default class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact information</h4>
        <form>
          <input type="text" name="name" placeholder="Your name" className={classes.Input} />
          <input type="email" name="email" placeholder="Your email" className={classes.Input} />
          <input type="text" name="street" placeholder="Street" className={classes.Input} />
          <input type="text" name="postalCode" placeholder="Postal code" className={classes.Input} />
          <Button btnType="Success">Order</Button>
        </form>
      </div>
    )
  }
};
