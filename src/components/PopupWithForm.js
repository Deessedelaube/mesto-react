import React from 'react';

function PopupWithForm(props){
  let className =`popup popup_${props.name}`;
  if (props.isOpen){
    className += ' popup_opened';
  }
  return(
    <div className={className}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="form" name={props.name} noValidate>
          {props.children}
          <button className="button button_type_save" type="submit" value="Сохранить">Сохранить</button>
        </form>
        <button className="button button_type_close" onClick={props.onClose}></button>
      </div>
    </div>
  )
}
export default PopupWithForm;
