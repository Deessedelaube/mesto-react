import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props){
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    //если карточка принадлежит пользователю, то делаем видимой кнопку удаления
  const cardDeleteButtonClassName = (
    `button button_type_delete ${isOwn ? '' : 'button_type_delete_hidden'}`
  ); 
    //если пользователь уже лайкнул карточку, то добавляем стиль
  const cardLikeButtonClassName = (
    `button button_type_like ${isLiked? 'button_type_like_clicked':''}`
  );

  function handleClick(){
    props.onCardClick(props.card);
  };
  function handleLikeClick(){
    props.onCardLike(props.card);
  };
  function handleDeleteClick(){
    props.onCardDelete(props.card);
  }
  return(
    <li className="element">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <button className ="button button_type_enlarge" onClick={handleClick}>
        <img src={props.card.link} alt={props.card.name} class="element__image" />
      </button>
      <div className="element__container">
        <h2 className="element__title">{`${props.card.name}`}</h2>
        <div className="element__likes">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <h3 className="element__likes_number">{props.card.likes.length}</h3>
        </div>
      </div>
    </li> 
  )
}
export default Card;