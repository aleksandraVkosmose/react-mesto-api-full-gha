import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api";
import Register from "./Register";
import Login from "./Login";
import authApi from "../utils/authApi";
import InfoTooltip from "./InfoTooltip";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [headerEmail, setHeaderEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  
    if (isLoggedIn){
    api.getUserInfo()
      .then(profileInfo => setCurrentUser(profileInfo))
      .catch(err => console.log(err))
    api.getCards().then(data => {
      setCards(data.map((card) => ({
        _id: card._id,
        name: card.name,
        link: card.link,
        likes: card.likes,
        owner: card.owner
      })))
    })
      .catch(err => console.log(err))
  }}, [isLoggedIn]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsSuccessPopupOpen(false)
    setSelectedCard({});
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api.setUserAvatar(newAvatar)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api.setUserInfo(newUserInfo)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.setCard(data)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.setLike(card._id, !isLiked)
      .then(newCard => setCards((state) => state.map((item) => item._id === card._id ? newCard : item)))
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards(state => state.filter(item => item._id !== card._id)))
      .catch(err => console.log(err));
  }

  const isOpen = isEditAvatarPopupOpen
    || isEditProfilePopupOpen
    || isAddPlacePopupOpen
    || isSuccessPopupOpen
    || selectedCard;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => document.removeEventListener("keydown", closeByEscape);
    }
  }, [isOpen]);

  function handleRegisterUser(email, password) {
    authApi
      .registerUser(email, password)
      .then((data) => {
        if (data) {
          setIsInfoTooltipSuccess(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        setIsInfoTooltipSuccess(false);
        console.log(err);
      })
      .finally(() => setIsSuccessPopupOpen(true));
  }

  function handleAuthUser(email, password) {
    authApi
      .loginUser(email, password)
      .then((data) => {
        if (data.token) {
          setHeaderEmail(email);
          setIsLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsInfoTooltipSuccess(false);
        setIsSuccessPopupOpen(true);
        console.log(err);
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setIsLoggedIn(true);
            setHeaderEmail(data.data.email);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setHeaderEmail(null);
    setIsLoggedIn(false);
    navigate("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header
          onSignOut={handleSignOut}
          headerEmail={headerEmail}
          signUp="Регистрация"
          signIn="Войти"
          signOut="Выйти" />

        {/* <ProtectedRoute
          component={Main}
          onEditProfile={setIsEditProfilePopupOpen}
          onEditAvatar={setIsEditAvatarPopupOpen}
          onAddPlace={setIsAddPlacePopupOpen}
          onCardClick={setSelectedCard}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          cards={cards}
          isLoggedIn={isLoggedIn}
          path="/"/> */}

        <Routes>
          <Route path="/sign-up" element={
            <Register onRegister={handleRegisterUser} />
          }
          />

          <Route path="/sign-in" element={
            <Login onLogin={handleAuthUser} />
          }
          />

          <Route path="/" element={
            <ProtectedRoute
              component={Main}
              onEditProfile={setIsEditProfilePopupOpen}
              onEditAvatar={setIsEditAvatarPopupOpen}
              onAddPlace={setIsAddPlacePopupOpen}
              onCardClick={setSelectedCard}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              cards={cards}
              isLoggedIn={isLoggedIn}
              path="/" />
          }
          />

          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? '/' : '/sign-in'} />}
          />
        </Routes>

        <Footer />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
          onLoading={isLoading}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onLoading={isLoading}
        />

        {/* popup полноразмерное фото */}

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />

        {/* popup подтверждения*/}

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonText="Да" />

        <InfoTooltip
          isSuccess={isInfoTooltipSuccess}
          isOpen={isSuccessPopupOpen}
          onClose={closeAllPopups}
          name={"success"}
        />

      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
