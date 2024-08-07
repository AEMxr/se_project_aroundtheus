import { openModal } from "./openCloseFunctions.js";

/*~----=)>. Event listeners '<(=----~*/
function addModalListeners(modal, openButton, openCallback) {
  openButton.addEventListener("click", () => {
    openCallback && openCallback();
    openModal(modal);
  });
}

export { addModalListeners };
