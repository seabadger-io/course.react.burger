import React from 'react';

import classes from './SidebarToggle.css';

const sidebarToggle = (props) => {
  return (
      <button
        className={classes.SidebarToggle}
        onClick={props.clicked}
      >☰
      </button>
  );
};

export default sidebarToggle;
