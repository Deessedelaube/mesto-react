import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props){
    //объявляем Ref
  const avatarRef = React.useRef();
    //убираем стандартную отправку, вызываем обработчик сабмита из пропсов, передавая в него значение DOM-элемента
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };
    //возвращаем компонент PopupWithForm, передаваем в него children, обработчики из пропсов. 
    //Назначаем Ref для инпута
  return (
    <PopupWithForm name='editAvatar' title='Обновить аватар' isOpen ={props.isOpen} onClose ={props.onClose} onSubmit={handleSubmit}>
      <label htmlFor="link" className="form__field">
        <input type="url" className="form__input form__input_avatarLink"
          placeholder="Ссылка на картинку"
          name="avatarLink" id ="avatar" 
          required 
          ref={avatarRef}/>
        <span className="form__error" id="link-error"></span>
      </label>
    </PopupWithForm>
  )
}
export default EditAvatarPopup;