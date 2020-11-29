function ImagePopup(props){
  if (!props.card==={}){
  return(
    <div className="popup popup_openImage popup_opened">
      <div className="popup__container_image">
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <h2 className="popup__title_image">{props.card.name}</h2>
        <button className="button button_type_close" onClick={props.onClose}></button>
      </div>
    </div>
  )} else {
    return(
      <div className="popup popup_openImage">
        <div className="popup__container_image">
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
          <h2 className="popup__title_image">{props.card.name}</h2>
          <button className="button button_type_close" onClick={props.onClose}></button>
        </div>
      </div>
    )}
}
export default ImagePopup;