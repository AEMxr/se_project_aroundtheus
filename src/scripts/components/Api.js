export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getRequestConfig(method, body = null) {
    const config = {
      method,
      headers: this._headers,
    };
    if (body) {
      config.body = JSON.stringify(body);
    }
    return config;
  }

  _getEndpoint(type = "cards", id = "", action = "") {
    const base = `${this._baseUrl}/${type}`;
    if (!id) return base;
    const path = `${base}/${id}`;
    if (!action) return path;
    return `${path}/${action}`;
  }

  async _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  async patchAvatar(avatarData) {
    const res = await fetch(
      this._getEndpoint("users/me/avatar"),
      this._getRequestConfig("PATCH", { avatar: avatarData.avatar })
    );
    return this._handleServerResponse(res);
  }

  async getUserInformation() {
    const res = await fetch(
      this._getEndpoint("users/me"),
      this._getRequestConfig("GET")
    );
    return this._handleServerResponse(res);
  }

  async patchUserInformation(userData) {
    const res = await fetch(
      this._getEndpoint("users/me"),
      this._getRequestConfig("PATCH", {
        name: userData.name,
        about: userData.about,
      })
    );
    return this._handleServerResponse(res);
  }

  async getInitialCards() {
    const res = await fetch(this._getEndpoint(), this._getRequestConfig("GET"));
    return this._handleServerResponse(res);
  }

  async postNewCard(cardData) {
    const res = await fetch(
      this._getEndpoint(),
      this._getRequestConfig("POST", {
        name: cardData.name,
        link: cardData.link,
      })
    );
    return this._handleServerResponse(res);
  }

  async deleteCard(cardId) {
    const res = await fetch(
      this._getEndpoint("cards", cardId),
      this._getRequestConfig("DELETE")
    );
    return this._handleServerResponse(res);
  }

  async addLike(cardId) {
    const res = await fetch(
      this._getEndpoint("cards", cardId, "likes"),
      this._getRequestConfig("PUT")
    );
    return this._handleServerResponse(res);
  }

  async removeLike(cardId) {
    const res = await fetch(
      this._getEndpoint("cards", cardId, "likes"),
      this._getRequestConfig("DELETE")
    );
    return this._handleServerResponse(res);
  }
}
