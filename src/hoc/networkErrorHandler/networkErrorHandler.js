import React, { Component } from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';

const networkErrorHandler = (WrappedComponent, axios) => {  
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      axios.interceptors.response.use(response => response, (error) => {
        this.setState({ error: error });
      });
      axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });
    }

    closeErrorMessage = () => {
      this.setState({ error: null });
    }
  
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.closeErrorMessage}>
            {this.state.error ? this.state.error.message : ''}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default networkErrorHandler;