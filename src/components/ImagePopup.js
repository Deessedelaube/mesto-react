function ImagePopup(props){
  let className = 'popup popup_openImage';
  if (props.card._id){ 
    className += ' popup_opened'};
  return(
    <div className={className}>
      <div className="popup__container_image">
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <h2 className="popup__title_image">{props.card.name}</h2>
        <button className="button button_type_close" onClick={props.onClose}></button>
      </div>
    </div>
  )
}
export default ImagePopup;