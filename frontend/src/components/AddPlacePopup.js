import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onClose, onAddPlace, onLoading, isOpen }) {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');

  useEffect(() => {
      setPlaceName('');
      setPlaceLink('');
  }, [isOpen]);


  
  function handleSubmit(e) {
      e.preventDefault();
      onAddPlace({
        name: placeName,
        link: placeLink,
    });
  }

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText={onLoading ? `Сохранение` : `Создать`}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}>
      <input
          className="popup__input popup__input_type_place"
          id="place-input"
          type="text"
          placeholder="Название"
          name="name"
          minLength="2"
          maxLength="30"
          required
          value={placeName}
          onChange={handleChangePlaceName}
      />
      <span className="popup__input-error place-input-error" />
        <input
          className="popup__input popup__input_type_link"
          id="link-input"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          required
          value={placeLink}
          onChange={handleChangePlaceLink}
      />
        <span className="popup__input-error link-input-error" />

    </PopupWithForm>
    )
}

export default AddPlacePopup;