

class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
      this.profileTitle = document.querySelector('.profile__title');
      this.profileAbout = document.querySelector('.profile__subtitle')
    }
    _checkResponse(res){
        if(res.ok){
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo(){
       return fetch(`${this.baseUrl}/users/me`, {
                headers: this.headers
            })
            .then((res) => {return this._checkResponse(res)})
        }
  
    getInitialCards() {
       return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
        .then((res) => {return this._checkResponse(res)})
    }

    setUserInfo(name, about){
    return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
              name: `${name}`,
             about: `${about}`
            })})
            .then(res => {return this._checkResponse(res)})
    }

    setAddCard(name, link){
    return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
              name: `${name}`,
              link: `${link}`
             })   
         })
         .then(res => {return this._checkResponse(res)})
        }

    setDeleteCard(id){ 
    return fetch(`${this.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
            })
            .then(res => {return this._checkResponse(res)})
    }  

    setAddLike(id){
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                headers: this.headers,
             }) 
             .then(res => {return this._checkResponse(res)})
    }

    setRemoveLike(id){
          return fetch(`${this.baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: this.headers,
             })
             .then(res => {return this._checkResponse(res)})
    }

    setChangeAvatar(url){
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
        avatar: `${url}`
        })})
      .then(res => {return this._checkResponse(res)})
    }
  }

  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
    headers: {
      authorization: 'e16750ca-eb0a-41b4-ae7b-01be71799fd1',
      'Content-Type': 'application/json'
    }
  }); 