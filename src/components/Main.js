import React from 'react';
import api from '../Api';
import Card from './Card';

function Main(props){
  const [userName, setUserName] = React.useState('');
  const [userDescription, setDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  
  React.useEffect(()=>{
    Promise.all([api.loadUserInfo(), api.getInitialCards()])
    .then((data)=>{
      console.log(data);
      setUserName(data[0].name);
      setDescription(data[0].about);
      setUserAvatar(data[0].avatar);
      
      const initialCards = data[1].map(card =>
          <Card card={card} onCardClick={props.onCardClick}/>        
        );
      setCards(initialCards);      
    })
    .catch((err)=>{console.log('InitialRenderingError', err)})
    .finally(()=>{
      console.log('Запрос был');
    });
  }, [props.onCardClick])

    return(
    <main className="content">
      <section className="profile">
        <button className="button button_type_avatar" onClick={props.onEditAvatar}>
          <img src={userAvatar} alt={userName} className="avatar" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className ="button button_type_edit" onClick={props.onEditProfile}></button>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button className="button button_type_add" onClick={props.onAddPlace}></button>
      </section>
      <section>
    <ul className="elements">{cards}</ul>
      </section>
    </main>
  )
}
export default Main;