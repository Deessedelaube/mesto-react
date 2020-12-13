import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props){
    //объявляем стейты, записываем их в value инпутов
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
    //обновляем стейты при изменении инпутов
  function handleChange(e){
    e.target.id === "elemTitle"? setName(e.target.value) : setLink(e.target.value);
  }; 
  function handleSubmit(e){
    e.preventDefault();
      // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: name,
      link: link,
    });
    setName('');
    setLink('');
  };
  return(
    <PopupWithForm isOpen ={props.isOpen} name='addPlace' title='Новое меcто' onClose ={props.onClose} onSubmit={handleSubmit}>
        <label htmlFor="elemTitle" className="form__field">
          <input type="text" className="form__input form__input_name"
            placeholder="Название" name="elemTitle" id ="elemTitle"
            value ={name}
            required
            minLength="2"
            maxLength="30"
            onChange={handleChange} />
          <span className="form__error" id="elemTitle-error"></span>
        </label>
        <label htmlFor="link" class="form__field">
          <input type="url" className="form__input form__input_description"
            placeholder="Ссылка на картинку" name="link" id ="link"
            value={link}
            required
            onChange={handleChange} />
          <span className="form__error" id="link-error"></span>
        </label>
      </PopupWithForm>
  )
};
export default AddPlacePopup;