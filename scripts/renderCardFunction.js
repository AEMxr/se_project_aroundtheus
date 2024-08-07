import { getCardElement } from "./getCardElementFunction.js";
import { cardsContainer } from "./globalVariables.js";

/*~----=)>. Universal function for rendering cards '<(=----~*/
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsContainer[method](cardElement);
}

export { renderCard };
