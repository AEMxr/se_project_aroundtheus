import { userTemplate } from "./globalVariables.js";
import { openModal } from "./openCloseFunctions.js";
import { modals } from "./objects.js";

/*~----=)>. Card creation '<(=----~*/
function getCardElement(data) {
  const userElement = userTemplate.cloneNode(true);
  const cardImage = userElement.querySelector(".card__image");
  const cardLabel = userElement.querySelector(".card__label");
  const cardHeart = userElement.querySelector(".card__heart");
  const cardDelete = userElement.querySelector(".card__delete");

  const previewImage = document.getElementById("previewImage");
  const imageViewTitle = document.getElementById("imageViewTitle");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardLabel.textContent = data.name;

  cardHeart.addEventListener("click", () => {
    cardHeart.classList.toggle("card__heart_active");
  });

  cardDelete.addEventListener("click", () => {
    const card = cardDelete.closest(".card");
    card && card.remove();
  });

  cardImage.addEventListener("click", () => {
    previewImage.src = cardImage.src;
    previewImage.alt = cardImage.alt;
    imageViewTitle.textContent = data.name;
    openModal(modals.preview);
  });

  return userElement;
}

export { getCardElement };
