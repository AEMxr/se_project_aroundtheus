import { loadOut } from "./loadOut.js";
import { enableValidation } from "./validate.js";

document.addEventListener("DOMContentLoaded", () => {
  /*~----=)>. Body and modal functionality '<(=----~*/
  loadOut();

  /*~----=)>. Validation function '<(=----~*/
  enableValidation(enableValidation);
});
