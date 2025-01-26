import ErrorBoundary from "../components/ErrorBoundary.js";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getRequestConfig(method = "GET", body = null) {
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

  _getUserEndpoint(action = "") {
    const base = `${this._baseUrl}/users/me`;
    return action ? `${base}/${action}` : base;
  }

  _getCardEndpoint(id = "", action = "") {
    return this._getEndpoint("cards", id, action);
  }

  async _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  async toggleLike(cardId, isLiking) {
    return ErrorBoundary.tryCatch(async () => {
      const method = isLiking ? "PUT" : "DELETE";
      console.log(`Sending ${method} request for card ${cardId}`);
      const res = await fetch(
        this._getCardEndpoint(cardId, "likes"),
        this._getRequestConfig(method)
      );
      return this._handleServerResponse(res);
    }, "Card Like Update");
  }

  async patchAvatar(avatarData) {
    return ErrorBoundary.tryCatch(async () => {
      const res = await fetch(
        this._getUserEndpoint("avatar"),
        this._getRequestConfig("PATCH", { avatar: avatarData.avatar })
      );
      return this._handleServerResponse(res);
    }, "Profile Update");
  }

  async getUserInformation() {
    return ErrorBoundary.tryCatch(async () => {
      const res = await fetch(
        this._getUserEndpoint(),
        this._getRequestConfig()
      );
      return this._handleServerResponse(res);
    }, "User Information Request");
  }

  async patchUserInformation(userData) {
    return ErrorBoundary.tryCatch(async () => {
      const res = await fetch(
        this._getUserEndpoint(),

        this._getRequestConfig("PATCH", {
          name: userData.name,
          about: userData.about,
        })
      );
      return this._handleServerResponse(res);
    }, "Profile Update");
  }

  async getInitialCards() {
    return ErrorBoundary.tryCatch(async () => {
      const res = await fetch(this._getEndpoint(), this._getRequestConfig());
      return this._handleServerResponse(res);
    }, "Initial Cards Request");
  }

  async postNewCard(cardData) {
    return ErrorBoundary.tryCatch(async () => {
      const res = await fetch(
        this._getEndpoint(),
        this._getRequestConfig("POST", {
          name: cardData.name,
          link: cardData.link,
        })
      );
      return this._handleServerResponse(res);
    }, "Card Creation");
  }

  async deleteCard(cardId) {
    return ErrorBoundary.tryCatch(async () => {
      const res = await fetch(
        this._getEndpoint("cards", cardId),
        this._getRequestConfig("DELETE")
      );
      return this._handleServerResponse(res);
    }, "Card Delete");
  }
}
