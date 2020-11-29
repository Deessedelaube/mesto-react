import React from 'react';

function PopupWithForm(props){
  if (props.isOpen){
  return(
    <div className={`popup popup_${props.name} popup_opened`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="form" name={props.name} action="#" method="GET" noValidate>
          {props.children}
          <button className="button button_type_save" type="submit" value="Сохранить">Сохранить</button>
        </form>
        <button className="button button_type_close" onClick={props.onClose}></button>
      </div>
    </div>
  )} else {
    return(
      <div className={`popup popup_${props.name}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="form" name={props.name} action="#" method="GET" noValidate>
          {props.children}
          <button className="button button_type_save" type="submit" value="Сохранить">Сохранить</button>
        </form>
        <button className="button button_type_close"></button>
      </div>
    </div>
    )
  }
}
export default PopupWithForm;
