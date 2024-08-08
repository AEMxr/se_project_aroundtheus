import { openModal } from "./openCloseFunctions.js";

/*~----=)>. Modal opener '<(=----~*/
function addModalListeners(modal, openButton, openCallback) {
  openButton.addEventListener("click", () => {
    openCallback && openCallback();
    openModal(modal);
  });
}

export { addModalListeners };
