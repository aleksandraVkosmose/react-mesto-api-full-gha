import React, { useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ onClose, onUpdateUser, onLoading, isOpen }) {
//подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    const [about, setAbout] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        setName(currentUser.name || "");
        setAbout(currentUser.about || "");
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
// передаем значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: name,
            about: about,
        });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setAbout(e.target.value);
    }

    return (
        
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            buttonText={onLoading ? `Сохранение` : `Сохранить`}
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}>
            <input
                className="popup__input popup__input_type_name"
                id="name-input"
                type="text"
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
                value={name || ""}
                onChange={handleChangeName}
            />
            <span className="popup__input-error name-input-error" />
            <input
                className="popup__input popup__input_type_job"
                id="job-input"
                type="text"
                name="about"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required
                value={about || ""}
                onChange={handleChangeAbout}
            />
            <span className="popup__input-error job-input-error" />
        </PopupWithForm>
    )
}
export default EditProfilePopup;