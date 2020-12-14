import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props){
    //подписываемся на контекст
  const currentUser = React.useContext(CurrentUserContext);
    //объявляем стейты, записываем их в value инпутов
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);
    //обновляем стейты при изменении контекста
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 
  
  function handleSubmit(e) {
    e.preventDefault();
      // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  };
    //обновляем стейты при изменении инпутов
  function handleChange(e){
    e.target.id === "name"? setName(e.target.value) : setDescription(e.target.value);
  }; 

return(
  <PopupWithForm isOpen ={props.isOpen} name='editProfile' title='Редактировать профиль'
    onClose ={props.onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
    <label htmlFor="name" className="form__field">
      <input type="text" className="form__input form__input_name" 
        value={name} placeHolder={name} id="name" name ="name"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
        />
      <span className="form__error" id="name-error"></span>
    </label>
    <label htmlFor="description" className="form__field">
      <input type="text" className="form__input form__input_description"
        value={description} placeHolder={description} id="description" name ="description"
        required
        minLength="2"
        maxLength="200"
        onChange={handleChange}
        />
      <span className="form__error" id="description-error"></span>
    </label>
  </PopupWithForm>
)
};
export default EditProfilePopup;