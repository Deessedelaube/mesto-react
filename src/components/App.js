import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
    //открываем-закрываем попапы
  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  };
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
  };
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
  };
  function handleCardClick(card){
    setSelectedCard(card);
  };
  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };
    //обновляем данные профиля: отправляем запрос в API, затем обновляем контекст пользователя
  function handleUpdateUser(obj){
    api.updateUserInfo(obj)
        .then((res)=>{
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch((err)=>{console.log('Ошибка обновления данных профиля: ', err)});
  };
    //обновляем аватар: отправляем запрос в API, затем обновляем контекст пользователя
  function handleUpdateAvatar(obj){
    api.updateAvatar(obj)
        .then((res)=>{
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch((err)=>{console.log('Ошибка обновления аватара: ', err)});
  };
    //добавляем карточку: отправляем запрос в API, затем обновляем cards, добавляя новый элемент. Чистим форму и закрываем попап
  function handleAddPlaceSubmit(obj, cleanFormValues){
    api.addCard(obj)
    .then((res)=>{
      setCards([res, ...cards]);
      debugger;
      cleanFormValues();
      closeAllPopups();
    })
    .catch((err)=>{console.log('Ошибка добавления карточки: ', err)})
  };
    //обрабатываем лайк: проверяем, есть ли уже лайк на этой карточке. В зависимости от этого,
    //отправляем запрос в API, получаем обновленные данные карточек и обновляем cards
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const method = isLiked? 'DELETE':'PUT';
    
    api.changeLikeCardStatus(card._id, method).then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch((err)=>{console.log('Ошибка обновления статуса лайка карточки', err)});
  };
    //обрабатываем удаление карточки: отправляем запрос в API, затем формируем новый массв, исключая
    //удаленную карточку. Обновляем cards
  function handleCardDelete(card){
    api.deleteCard(card._id).then(() => {
    const newCards = cards.filter((c) => c._id !== card._id);
    setCards(newCards);
  })
  .catch((err)=>{console.log('Ошибка удаления карточки', err)});
  };
  //запрашиваем данные через API при монтировании компонента, затем обновляем cards и контекст пользователя
  React.useEffect(()=>{
    api.loadUserInfo().then((data)=>{
      setCurrentUser(data);
    })
    .catch((err)=>{console.log('Ошибка рендеринга данных пользователя', err)})
    .finally(()=>{
      console.log('Запрос данных пользователя был');
    });
  }, []);
  React.useEffect(()=>{
    api.getInitialCards().then((data)=>{
      setCards(data);
    })
    .catch((err)=>{console.log('Ошибка рендеринга карточек', err)})
    .finally(()=>{
      console.log('Обновили карточки');
    });
  }, []);


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick} onCardClick ={handleCardClick}
          cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
