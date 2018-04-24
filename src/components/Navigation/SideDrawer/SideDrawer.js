import React from 'react';

import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) => {
  const attachedClasses = [classes.SideDrawer];
  attachedClasses.push(props.isOpen ? classes.Open : classes.Close);
  return (
    <Aux>
      <Backdrop clicked={props.close} show={props.isOpen}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
