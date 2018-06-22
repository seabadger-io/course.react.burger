import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SidebarToggle from './SidebarToggle/SidebarToggle';

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <SidebarToggle
        clicked={props.openSidebar}
      />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </nav>
    </header>
  )
};

export default toolbar;
