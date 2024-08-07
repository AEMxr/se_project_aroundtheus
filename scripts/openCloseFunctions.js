/*~----=)>. Open/close modal functions '<(=----~*/
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

/*~----=)>. Universal close modal overlay event handler '<(=----~*/
function setupModalCloseHandlers() {
  document.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(evt.target);
    }
  });
}

export { openModal, closeModal, setupModalCloseHandlers };
