import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  }

  render() {
    return (
      <Aux>
        <Toolbar
          openSidebar={this.sideDrawerOpenHandler}
        />
        <SideDrawer
          close={this.sideDrawerCloseHandler}
          isOpen={this.state.showSideDrawer}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
};

export default Layout;