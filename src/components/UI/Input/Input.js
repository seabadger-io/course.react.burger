import React from 'react';
import classes from './Input.css';

const Input = (props) => {
  let inputElement = null;

  const attributes = props.attributes ? props.attributes : {};
  const elementClasses = [ classes.InputElement ];
  if (props.touched && !props.valid) {
    elementClasses.push(classes.Invalid);
  }
  if (props.value) {
    attributes.value = props.value;
  }
  switch (props.inputType) {
    case ('input'):
      inputElement = <input {...attributes} className={elementClasses.join(' ')} onChange={props.onChange} />;
      break;
    case ('textarea'):
      inputElement = <textarea {...attributes} className={elementClasses.join(' ')} onChange={props.onChange} />;
      break;
    case ('select'):
      inputElement = <select {...attributes} className={elementClasses.join(' ')} onChange={props.onChange}>
        { props.options.map((option) => {
          return <option key={option[0]} value={option[0]}>{option[1]}</option>;
        })}
      </select>;
      break;
    default:
      inputElement = <input {...attributes} className={elementClasses.join(' ')} onChange={props.onChange} />;
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
