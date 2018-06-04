import React, { Component } from 'react';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export default class ContactData extends Component {
  state = {
    ingredients: [],
    totalPrice: '',
    contactData: {},
    loading: false
  }

  formDefinition = {
    name: {
      inputType: 'input',
      label: 'Full name',
      attributes: {
        id: 'name',
        name: 'name',
        type: 'text',
        placeholder: 'Your name',
      },
      value: '',
      valid: false,
      validations: {
        required: true
      },
      touched: false
    },
    email: {
      inputType: 'input',
      label: 'Email',
      attributes: {
        id: 'email',
        name: 'email',
        type: 'email',
        placeholder: 'Your email',
      },
      value: '',
      valid: false,
      validations: {
        required: true
      },
      touched: false
    },
    street: {
      inputType: 'input',
      label: 'Street',
      attributes: {
        id: 'street',
        name: 'street',
        type: 'text',
        placeholder: 'Street',
      },
      value: '',
      valid: false,
      validations: {
        required: true
      },
      touched: false
    },
    postalCode: {
      inputType: 'input',
      label: 'Postal code',
      attributes: {
        id: 'postalCode',
        name: 'postalCode',
        type: 'text',
        placeholder: 'Postal code',
      },
      value: '',
      valid: false,
      validations: {
        required: true,
        minLength: 3,
        maxLength: 6
      },
      touched: false
    },
    country: {
      inputType: 'input',
      label: 'Country',
      attributes: {
        id: 'country',
        name: 'country',
        type: 'text',
        placeholder: 'Your country',
      },
      value: '',
      valid: false,
      validations: {
        required: true
      },
      touched: false
    },
    deliveryMethod: {
      inputType: 'select',
      label: 'Delivery method',
      attributes: {
        id: 'deliveryMethod',
        name: 'deliveryMethod',
      },
      value: 'fastest',
      options: [
        ['fastest', 'Fastest'],
        ['cheapest', 'Cheapest']
      ],
      valid: true,
      touched: false
    }
  }

  componentDidMount = () => {
    const contactData = {};
    Object.keys(this.formDefinition).forEach(key => contactData[key] = this.formDefinition[key].value);
    this.setState( { ingredients: this.props.ingredients, contactData: contactData });
  }

  orderHandler = (e) => {
    e.preventDefault();
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      contactData: {
        ...this.state.contactData
      }
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

  validateInput = (inputKey, value) => {
    const validations = this.formDefinition[inputKey].validations;
    if (typeof validations !== 'object' || validations === null) return true;
    for (const validation in validations) {
      if (validation === 'required' && validations[validation]) {
        if (value.trim() === '') return false;
      }
      if (validation === 'minLength') {
        if (value.length < validations[validation]) return false;
      }
      if (validation === 'maxLength') {
        if (value.length > validations[validation]) return false;
      }
    }
    return true;
  }

  inputChangeHandler = (inputKey, event) => {
    const contactData = this.state.contactData;
    contactData[inputKey] = event.target.value;
    this.formDefinition[inputKey].touched = true;
    this.formDefinition[inputKey].valid = this.validateInput(inputKey, event.target.value);
    this.setState({ contactData: contactData });
  }

  render = () => {
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return (
        <div className={classes.ContactData}>
          <h4>Enter your contact information</h4>
          <form onSubmit={this.orderHandler}>
            {
              Object.keys(this.formDefinition).map((key) => {
                return <Input {...this.formDefinition[key]} key={key} onChange={(event) => { this.inputChangeHandler(key, event) }} value={this.state.contactData[key]} />;
              })
            }
            <Button btnType="Success">Order</Button>
          </form>
        </div>
      );
    }
  }
};
