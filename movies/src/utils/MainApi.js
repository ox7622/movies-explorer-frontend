class Api {
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            console.log(res);
            return Promise.reject(`${res.status} ${res.statusText}`);
        }
    }

    getMoviesData() {

        return fetch(`${this.url}/movies`, {
            method: "GET",
            headers: this.headers,
            credentials: 'include'
        }).then(this._checkResponse);
    }

    createMovie(data) {

        return fetch(`${this.url}/movies`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: this.headers,
            credentials: 'include'
        }).then(this._checkResponse);

    }

    deleteMovie(id) {

        return fetch(`${this.url}/movies/${id}`, {
            method: "DELETE",
            headers: this.headers,
            credentials: 'include'
        }).then(this._checkResponse);
    }

    getProfileInfo() {
        return fetch(`${this.url}/users/me`, {
            method: "GET",
            headers: this._headers,
            credentials: 'include',
        }).then(this._checkResponse);
    }


    editProfileInfo(data) {
        return fetch(`${this.url}/users/me`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json", },
            credentials: 'include',
        }).then(this._checkResponse);
    }


    register({ name, password, email }) {
        return fetch(`${this.url}/signup`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ name, password, email })
        }).then(this._checkResponse);
    };

    login({ password, email }) {
        return fetch(`${this.url}/signin`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ password, email }),
            credentials: 'include',
        }).then(this._checkResponse);
    };

    checkToken() {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: this.headers,
            credentials: 'include',
        }).then(this._checkResponse);

    }

    logout() {
        return fetch(`${this.url}/signout`, {
            method: 'POST',
            headers: this.headers,
            credentials: 'include',
        }).then(this._checkResponse);
    }


}

export const myMoviesApi = new Api({
    url: "https://api.mox.nomoredomains.work",
    //url: 'http://localhost:3001',
    headers: {
        "Content-Type": "application/json",
        'Origin': 'https://mox.nomoredomains.work',
        'Accept': 'application/json',
    }

})

