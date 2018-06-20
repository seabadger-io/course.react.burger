import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import networkErrorHandler from '../../../hoc/networkErrorHandler/networkErrorHandler';
import * as actions from '../../../store/actions';

class ContactData extends Component {
  state = {
    contactData: {},
    formIsValid: false
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
    this.setState( { contactData: contactData });
  }

  orderHandler = (e) => {
    e.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      contactData: {
        ...this.state.contactData
      }
    };
    this.props.startPurchase(order, this.props.idToken);
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

  validateForm = () => {
    for (const key in this.formDefinition) {
      if (! this.formDefinition[key].valid) {
        return this.setState({ formIsValid: false });
      }
    }
    this.setState({ formIsValid: true });
  }

  inputChangeHandler = (inputKey, event) => {
    const contactData = this.state.contactData;
    contactData[inputKey] = event.target.value;
    this.formDefinition[inputKey].touched = true;
    this.formDefinition[inputKey].valid = this.validateInput(inputKey, event.target.value);
    this.validateForm();
    this.setState({ contactData: contactData });
  }

  render = () => {
    if (this.props.loading) {
      return <Spinner />;
    } else {
      return (
        <div className={classes.ContactData}>
          <h4>Enter your contact information</h4>
          <form onSubmit={this.orderHandler} valid={this.state.formIsValid}>
            {
              Object.keys(this.formDefinition).map((key) => {
                return <Input {...this.formDefinition[key]} key={key} onChange={(event) => { this.inputChangeHandler(key, event) }} value={this.state.contactData[key]} />;
              })
            }
            <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
          </form>
        </div>
      );
    }
  }
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    idToken: state.auth.idToken
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startPurchase: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(networkErrorHandler(ContactData, axios));