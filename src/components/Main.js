import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props){
    //используем контекст
  const currentUser = React.useContext(CurrentUserContext);
    //возвращаем элемент. Берем массив карточек из пропсов и добавляем компонент Card для каждой,
    //прокидывая в него обработчики клика, лайка и удаления из пропсов
  return(
    <main className="content">
      <section className="profile">
        <button className="button button_type_avatar" onClick={props.onEditAvatar}>
          <img src={currentUser.avatar} alt={currentUser.name} className="avatar" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className ="button button_type_edit" onClick={props.onEditProfile}></button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="button button_type_add" onClick={props.onAddPlace}></button>
      </section>
      <section>
        <ul className="elements">
          {props.cards.map(item=>
            <Card key={item._id} card={item} onCardClick={props.onCardClick}
              onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
          )}
        </ul>
      </section>
    </main>
  )
}
export default Main;