class Api {
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
    }

    getMoviesData() {

        return fetch(this.url, {
            method: "GET",
            headers: this.headers,
            //credentials: 'include'
        }).then(this._checkResponse);
    }

}

export const moviesApi = new Api({
    url: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
        "Content-Type": "application/json",
    }

})


