function Card(props){
  function handleClick(){
    debugger;
    props.onCardClick(props.card);
  };
  return(
    <li className="element">
      <button className="button button_type_delete"></button>
      <button className ="button button_type_enlarge" onClick={handleClick}>
        <img src={props.card.link} alt={props.card.name} class="element__image" />
      </button>
      <div className="element__container">
        <h2 className="element__title">{`${props.card.name}`}</h2>
        <div className="element__likes">
          <button className="button button_type_like"></button>
          <h3 className="element__likes_number">{props.card.likes.length}</h3>
        </div>
      </div>
    </li> 
  )
}
export default Card;