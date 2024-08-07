/*~----=)>. Template and containers '<(=----~*/
const userTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".cards__grid");

/*~----=)>. Profile elements '<(=----~*/
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profession");

/*~----=)>. Universal close button handler '<(=----~*/
const closeButtons = document.querySelectorAll(".modal__close");

/*~----=)>. Modal Submit reference '<(=----~*/
const modalSubmit = document.querySelector(".modal__submit");

export {
  userTemplate,
  cardsContainer,
  profileName,
  profileJob,
  closeButtons,
  modalSubmit,
};
