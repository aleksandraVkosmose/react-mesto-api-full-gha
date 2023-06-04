import React from "react";

function InfoTooltip({ name, onClose, isOpen, isSuccess }) {
    return (
        <div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className={`popup__container popup__container-state`}>
                <button
                    className={`popup__button-close button`}
                    type="button"
                    onClick={onClose}
                />
                <div
                    className={`popup__success ${isSuccess
                        ? "popup__success_type_ok"
                        : "popup__success_type_fail"
                        }`}
                />
                <h4 className="popup__title">
                    {isSuccess
                        ? "Вы успешно зарегистрировались!"
                        : "Что-то пошло не так! Попробуйте еще раз."}
                </h4>
               
            </div>
        </div>


    );
}

export default InfoTooltip;