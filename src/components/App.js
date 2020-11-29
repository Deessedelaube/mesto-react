import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, openEditProfile] = React.useState(false);
  const [isEditAvatarPopupOpen, openEditAvatarPopup] = React.useState(false);
  const [isAddPlacePopupOpen, openAddPlacePopup] = React.useState(false);
  const [selectedCard, openImagePopup] = React.useState({});
    
  function handleEditAvatarClick(){
    openEditAvatarPopup(true);
  };
  function handleEditProfileClick(){
    openEditProfile(true);
  };
  function handleAddPlaceClick(){
    openAddPlacePopup(true);
  };
  function handleCardClick(card){
    openImagePopup(card);
  }
  function closeAllPopups(){
    openEditAvatarPopup(false);
    openEditProfile(false);
    openAddPlacePopup(false);
    openImagePopup({});
  }

  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick ={handleCardClick}/>
      <PopupWithForm isOpen ={isEditAvatarPopupOpen} name='editAvatar' title='Обновить аватар' onClose ={closeAllPopups}>
        <label htmlFor="link" className="form__field">
          <input type="url" placeholder="Ссылка на картинку" name="avatarLink" id ="avatar" className="form__input form__input_avatarLink"
            required />
          <span className="form__error" id="link-error"></span>
        </label>
      </PopupWithForm>;
      <PopupWithForm isOpen ={isEditProfilePopupOpen} name='editProfile' title='Редактировать профиль' onClose ={closeAllPopups}>
        <label htmlFor="fullname" className="form__field">
          <input type="text" placeholder="Имя" name="fullname" id="fullname" className="form__input form__input_name"
            required
            minLength="2"
            maxLength="40" />
          <span className="form__error" id="fullname-error"></span>
        </label>
        <label htmlFor="job" className="form__field">
          <input type="text" placeholder="О себе" name="job" id="job" className="form__input form__input_description"
            required
            minLength="2"
            maxLength="200" />
          <span className="form__error" id="job-error"></span>
        </label>
      </PopupWithForm>;
      <PopupWithForm isOpen ={isAddPlacePopupOpen} name='addPlace' title='Новое меcто' onClose ={closeAllPopups}>
        <label htmlFor="elemTitle" className="form__field">
          <input type="text" placeholder="Название" name="elemTitle" id ="elemTitle" className="form__input form__input_name"
            required
            minLength="2"
            maxLength="30" />
          <span className="form__error" id="elemTitle-error"></span>
        </label>
        <label htmlFor="link" class="form__field">
          <input type="url" placeholder="Ссылка на картинку" name="link" id ="link" className="form__input form__input_description"
            required />
          <span className="form__error" id="link-error"></span>
        </label>
      </PopupWithForm>;
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      <Footer />

      <template className="element_template">
        
      </template>

    </div>
  );
}

export default App;
