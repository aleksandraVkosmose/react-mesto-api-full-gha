import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_photo-card ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__container-card">
        <button
          className="popup__button-close button popup__button-close-photo"
          type="button"
          onClick={onClose}
        />
        <img className="popup__img-card" src={card.link} alt={card.name} />
        <h4 className="popup__title-card">{card.name}</h4>
      </div>
    </div>
  )
}
export default ImagePopup;