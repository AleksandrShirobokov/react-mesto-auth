class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _getResponseData(res) {
        if(!res.ok) {
            return Promise.reject(`Ошибка:${res.status}`);
        }
            return res.json();  
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method:"GET",
            headers: this._headers
        })
        .then(this._getResponseData)
    }

    postNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method:'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._getResponseData)
    }

    getUserInfoMe() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this._getResponseData)
    }

    changeUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._getResponseData)
    }    

    editAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body:JSON.stringify({
                avatar: data.link
            })
        })
        .then(this._getResponseData)

    }

    changeLikeCardStatus(cardId, isLiked) {
        if(isLiked)
            {return fetch(`${this._url}/cards/likes/${cardId}`, {
                method:'PUT',
                headers: this._headers
            })
            .then(this._getResponseData)}
        else {
            return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._getResponseData)
        }    
    }

    delCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method:'DELETE',
            headers: this._headers
        })
        .then(this._getResponseData)

    }
}    

const api = new Api({
    url:"https://mesto.nomoreparties.co/v1/cohort-20",
    headers: {
        authorization:'3fe373ef-33cc-49b3-8f02-e54eba1f506e',
        "content-type":'application/json'
    } 
}) 

export default api;