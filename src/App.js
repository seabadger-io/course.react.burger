import React, { Component } from 'react';
import { Route, withRouter,  Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

class App extends Component {

  componentWillMount = () => {
    this.props.authCheckState();
  }

  render() {
    let authenticatedRoutes = [];
    if (this.props.isAuthenticated) {
      authenticatedRoutes = [
        { path: '/orders', component: Orders },
        { path: '/checkout', component: Checkout }
      ];
    }
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/auth" component={Auth} />
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
