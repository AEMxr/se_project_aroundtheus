export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  loadUserInformation() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "GET",
      headers: {
        about: "Placeholder description",
        avatar:
          "https://practicum-content.s3.amazonaws.com/resources/default-avatar_1704458546.png",
        name: "Placeholder name",
        _id: "f4e39d2a7f9c1bd764a38d2a",
        authorization: "4b5891e6-236c-4083-9664-b0567d688b97",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        console.log("API Response:", data);
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setUserInformation() {
    fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "4b5891e6-236c-4083-9664-b0567d688b97",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist",
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        console.log("API Response:", data);
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "GET",
      headers: {
        authorization: "4b5891e6-236c-4083-9664-b0567d688b97",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        console.log("API Response:", data);
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
