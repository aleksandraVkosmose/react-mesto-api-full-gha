import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';


function Main({ cards, onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (

    <main className="main">
      <section className="profile">
        <div className="profile__card">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="аватар"
          />
          <button
            className="profile__avatar-button"
            type="button"
            onClick={() => {
              onEditAvatar(true)
            }} />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="profile__button-edit button"
            type="button"
            onClick={() => {
              onEditProfile(true)
            }} />
          <h2 className="profile__subtitle">{currentUser.about}</h2>
        </div>
        <button
          className="profile__button-add button"
          type="button"
          onClick={() => {
            onAddPlace(true)
          }} />
      </section>
      <section className="elements" aria-label="Фотокарточки">

        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardDelete={onCardDelete}
            onCardClick={onCardClick}
            onCardLike={onCardLike} />
        ))}

      </section>
    </main>
  );
}
export default Main;