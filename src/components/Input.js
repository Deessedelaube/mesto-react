import React from 'react';

function Input(props) {
  const [value, setValue] = React.useState(props.value);

  function handleChange(e) {
    setValue(e.target.value);
  };
  const errorId = `${props.id}-error`;

  return (
    <label htmlFor={props.id} className="form__field">
      <input type={props.type} 
        className={props.className}
        value={value}
        placeholder ={value}
        onChange={handleChange} 
        id ={props.id}
        name ={props.id}
        required
        minLength={props.minLength}
        maxLength={props.maxLength}
        />
      <span className="form__error" id={errorId}></span>
    </label>
  );
}
export default Input;