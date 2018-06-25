import React, { Component } from 'react';
import { Route, withRouter,  Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {

  componentWillMount = () => {
    this.props.authCheckState();
  }

  render() {
    let authenticatedRoutes = [];
    if (this.props.isAuthenticated) {
      authenticatedRoutes = [
        { path: '/orders', component: asyncOrders },
        { path: '/checkout', component: asyncCheckout }
      ];
    }
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/logout" component={Logout} />
            {
              authenticatedRoutes.map(({path, component}) => {
                return <Route key={path} path={path} component={component} />
              })
            }
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCheckState: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
