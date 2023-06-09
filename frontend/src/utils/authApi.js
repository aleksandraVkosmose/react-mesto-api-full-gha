class AuthApi {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    registerUser(email, password) {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        }).then(res => this._handleOriginalResponse(res));
    }

    loginUser(email, password) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        }).then(res => this._handleOriginalResponse(res));
    }

    checkToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then(res => this._handleOriginalResponse(res));
    }

    _handleOriginalResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }
}

const authApi = new AuthApi({
    baseUrl: 'https://api.mestoaalexandera.nomoredomains.rocks',
  //baseUrl: 'http://localhost:3000',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

export default authApi;