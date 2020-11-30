import React from 'react';
import api from '../Api';
import Card from './Card';

function Main(props){
  const [userName, setUserName] = React.useState('');
  const [userDescription, setDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const handleClickCard= props.onCardClick;

  React.useEffect(()=>{
    api.loadUserInfo().then((data)=>{
      setUserName(data.name);
      setDescription(data.about);
      setUserAvatar(data.avatar);
    })
    .catch((err)=>{console.log('Ошибка рендеринга профиля', err)})
    .finally(()=>{
      console.log('Запрос данных профиля был');
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
    <ul className="elements">{cards.map(item=><Card key={item._id} card={item} onCardClick={handleClickCard} />)}</ul>
      </section>
    </main>
  )
}
export default Main;