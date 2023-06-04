import React from 'react';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardLike, onCardDelete, onCardClick }) {

  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some(user => user._id === currentUser._id);
  const isOwn = card.owner._id === currentUser._id;

  const cardLikeButtonClassName = `element__button-like ${isLiked ? 'element__button-like_is-active' : ''}`;
  const deleteButtonClassName = `element__button-delete ${isOwn ? 'element__button-delete_is-active' : ''}`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <article className="element">
      <img className="element__img"
        alt={card.name}
        src={card.link}
        onClick={handleCardClick} />
        
      {isOwn &&<button
        className={deleteButtonClassName}
        type="button"
        onClick={handleDeleteClick} />}
      <div className="element__info">
        <h3 className="element__title">{card.name}</h3>
        <div className="element__like-container">
          <button
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLikeClick} />
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;