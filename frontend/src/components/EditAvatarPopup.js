import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ onLoading, onClose, onUpdateAvatar, isOpen }) {
    const avatarRef = React.useRef(null);

    React.useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    function handleChangeAvatar() {
        return avatarRef.current.value;
    }
    
    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonText={onLoading ? `Сохранение` : `Сохранить`}
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}>
            <input
                className="popup__input popup__input_type_avatar"
                id="avatar-input"
                type="url"
                name="avatar"
                placeholder="Ссылка на аватар"
                required
                onChange={handleChangeAvatar}
                ref={avatarRef}
            />
            <span className="popup__input-error avatar-input-error" />
        </PopupWithForm>
    )
}
export default EditAvatarPopup;