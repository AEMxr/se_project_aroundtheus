export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  async patchAvatar(avatarData) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarData.avatar,
      }),
    });
    return this._handleServerResponse(res);
  }

  async getUserInformation() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return this._handleServerResponse(res);
  }

  async patchUserInformation(userData) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    });
    return this._handleServerResponse(res);
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return this._handleServerResponse(res);
  }

  async postNewCard(cardData) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    });
    return this._handleServerResponse(res);
  }

  async deleteCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._handleServerResponse(res);
  }

  async addLike(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._handleServerResponse(res);
  }

  async removeLike(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._handleServerResponse(res);
  }
}
