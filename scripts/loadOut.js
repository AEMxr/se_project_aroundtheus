import { initialCards, modals, forms, inputs } from "./objects.js";
import { profileName, profileJob, closeButtons } from "./globalVariables.js";
import { closeModal, universalClose } from "./openCloseFunctions.js";
import { addModalListeners } from "./addModalListenersFunction.js";
import { renderCard } from "./renderCardFunction.js";

function loadOut() {
  /*~----=)>. Close functionality '<(=----~*/
  universalClose();

  closeButtons.forEach((button) => {
    const popup = button.closest(".modal");
    button.addEventListener("click", () => closeModal(popup));
  });

  /*~----=)>. Profile modal setup '<(=----~*/
  addModalListeners(
    modals.profile,
    document.getElementById("profileEditButton"),
    () => {
      inputs.profile.name.value = profileName.textContent;
      inputs.profile.description.value = profileJob.textContent;
    }
  );

  forms.profile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileName.textContent = inputs.profile.name.value;
    profileJob.textContent = inputs.profile.description.value;
    closeModal(modals.profile);
  });

  /*~----=)>. Image modal setup '<(=----~*/
  addModalListeners(modals.image, document.getElementById("imageEditButton"));

  forms.image.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const newCardData = {
      name: inputs.image.title.value,
      link: inputs.image.link.value,
    };

    renderCard(newCardData, "prepend");
    evt.target.reset();
    closeModal(modals.image);
  });

  /*~----=)>. Initial card rendering '<(=----~*/
  initialCards.forEach((cardData) => {
    renderCard(cardData, "append");
  });
}

export { loadOut };
