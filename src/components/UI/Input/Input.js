import React from 'react';
import classes from './Input.css';

const Input = (props) => {
  let inputElement = null;

  const attributes = props.attributes ? props.attributes : {};
  switch (props.inputType) {
    case ('input'):
      inputElement = <input {...attributes} className={classes.InputElement} onChange={props.onChange} />;
      break;
    case ('textarea'):
      inputElement = <textarea {...attributes} className={classes.InputElement} onChange={props.onChange} />;
      break;
    case ('select'):
    inputElement = <select {...attributes} className={classes.InputElement} onChange={props.onChange}>
      { props.options.map((option) => {
        return <option key={option[0]} value={option[0]}>{option[1]}</option>;
      })}
    </select>;
      break;
    default:
      inputElement = <input {...attributes} className={classes.InputElement} onChange={props.onChange} />;
  }

  let forElement = {};
  if (attributes.id) {
    forElement = { htmlFor: attributes.id };
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label} {...forElement}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
