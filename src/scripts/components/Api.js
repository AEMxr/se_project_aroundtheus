import ErrorBoundary from "../components/ErrorBoundary.js";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(endpoint, options = {}) {
    return ErrorBoundary.tryCatch(async () => {
      const finalOptions = {
        headers: this._headers,
        ...options,
      };
      const url = `${this._baseUrl}${endpoint}`;
      const res = await fetch(url, finalOptions);
      return this._handleServerResponse(res);
    }, options.errorContext || "API Request");
  }

  _getEndpoint(type = "cards", id = "", action = "") {
    const parts = [type];
    if (id) parts.push(id);
    if (action) parts.push(action);
    return `/${parts.join("/")}`;
  }

  _getUserEndpoint(action = "") {
    return this._getEndpoint("users/me", "", action);
  }

  async _handleServerResponse(res) {
    if (res.ok) return res.json();
    throw new Error(`Error: ${res.status}`);
  }

  getUserInformation() {
    return this._request(this._getUserEndpoint(), {
      errorContext: "User Information Request",
    });
  }

  patchUserInformation(userData) {
    return this._request(this._getUserEndpoint(), {
      method: "PATCH",
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
      errorContext: "Profile Update",
    });
  }

  patchAvatar(avatarData) {
    return this._request(this._getUserEndpoint("avatar"), {
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatarData.avatar,
      }),
      errorContext: "Profile Update",
    });
  }

  getInitialCards() {
    return this._request(this._getEndpoint(), {
      errorContext: "Initial Cards Request",
    });
  }

  postNewCard(cardData) {
    return this._request(this._getEndpoint(), {
      method: "POST",
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
      errorContext: "Card Creation",
    });
  }

  deleteCard(cardId) {
    return this._request(this._getEndpoint("cards", cardId), {
      method: "DELETE",
      errorContext: "Card Delete",
    });
  }

  toggleLike(cardId, isLiking) {
    return this._request(this._getEndpoint("cards", cardId, "likes"), {
      method: isLiking ? "PUT" : "DELETE",
      errorContext: "Card Like Update",
    });
  }
}
