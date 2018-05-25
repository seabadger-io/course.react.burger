import React, { Component } from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';

const networkErrorHandler = (WrappedComponent, axios) => {  
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.responseInterceptor =  axios.interceptors.response.use(
      response => response,
      (error) => {
        this.setState({ error: error });
      });
      this.requestInterceptor = axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
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