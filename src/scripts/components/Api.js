import ErrorBoundary from "../components/ErrorBoundary.js";
import ConfigManager from "./ConfigManager.js";

export default class Api {
  static apiMethods = {
    toggleLike: {
      endpoint: (id) => ["cards", id, "likes"],
      method: (isLiking) => (isLiking ? "PUT" : "DELETE"),
      errorMessage: "Card Like Update",
    },
    patchAvatar: {
      endpoint: () => ["users/me", "avatar"],
      method: () => "PATCH",
      formatData: (data) => ({ avatar: data.avatar }),
      errorMessage: "Profile Update",
    },
    getUserInformation: {
      endpoint: () => ["users/me"],
      method: () => "GET",
      errorMessage: "User Information Request",
    },
    patchUserInformation: {
      endpoint: () => ["users/me"],
      method: () => "PATCH",
      formatData: (data) => ({ name: data.name, about: data.about }),
      errorMessage: "Profile Update",
    },
    getInitialCards: {
      endpoint: () => ["cards"],
      method: () => "GET",
      errorMessage: "Initial Cards Request",
    },
    postNewCard: {
      endpoint: () => ["cards"],
      method: () => "POST",
      formatData: (data) => ({ name: data.name, link: data.link }),
      errorMessage: "Card Creation",
    },
    deleteCard: {
      endpoint: (id) => ["cards", id],
      method: () => "DELETE",
      errorMessage: "Card Delete",
    },
  };

  constructor() {
    const apiConfig = ConfigManager.config.api;
    this._baseUrl = apiConfig.baseUrl;
    this._headers = apiConfig.headers;
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

  _getEndpoint(...parts) {
    return `${this._baseUrl}/${parts.filter(Boolean).join("/")}`;
  }

  async _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  async executeMethod(methodName, ...args) {
    const config = Api.apiMethods[methodName];
    return ErrorBoundary.tryCatch(async () => {
      const endpoint = this._getEndpoint(...config.endpoint(...args));
      const method = config.method(...args);
      const data = config.formatData ? config.formatData(...args) : null;

      const res = await fetch(endpoint, this._getRequestConfig(method, data));
      return this._handleServerResponse(res);
    }, config.errorMessage);
  }

  async toggleLike(cardId, isLiking) {
    return this.executeMethod("toggleLike", cardId, isLiking);
  }

  async patchAvatar(avatarData) {
    return this.executeMethod("patchAvatar", avatarData);
  }

  async getUserInformation() {
    return this.executeMethod("getUserInformation");
  }

  async patchUserInformation(userData) {
    return this.executeMethod("patchUserInformation", userData);
  }

  async getInitialCards() {
    return this.executeMethod("getInitialCards");
  }

  async postNewCard(cardData) {
    return this.executeMethod("postNewCard", cardData);
  }

  async deleteCard(cardId) {
    return this.executeMethod("deleteCard", cardId);
  }
}
