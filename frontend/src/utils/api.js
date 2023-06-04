class Api {
  constructor(options) {
    this._options = options;
    this._url = options.baseUrl;
    this._headers = options.headers;
  }
  _handleOriginalResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Получение карточек с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(res => this._handleOriginalResponse(res))
  }

  // Добавление новой карточки через попап
  setCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(res => this._handleOriginalResponse(res))
  }

  // Ставим лайк карточке
  setLike(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    }).then(res => this._handleOriginalResponse(res))
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._handleOriginalResponse(res));
  }

  // Получение информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(res => this._handleOriginalResponse(res))
  }

  // Редактирование информации о пользователе через попап
  setUserInfo(forms) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(forms)
    }).then(res => this._handleOriginalResponse(res))
  }

  // Редактирование аватара пользователя через попап
  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(res => this._handleOriginalResponse(res));
  }
}

const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/cohort-59`,
  headers: {
    authorization: 'f7e16f72-6fdb-4cb4-9e4c-1f17e80e3d75',
    "Content-Type": "application/json",
  }
})

export default api;