const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// open and close modal events
var modal = document.getElementById("modalEdit");
var btn = document.getElementById("editButton");
var span = document.getElementsByClassName("modal__close")[0];

btn.addEventListener("click", function (event) {
  modal.style.display = "block";
});

span.addEventListener("click", function (event) {
  modal.style.display = "none";
});

// window.addEventListener("click", function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// });

// // Get modal elements
// const modal = document.querySelector(".modal");
// const openModalButton = document.querySelector(".profile__edit-button"); // Update with the correct selector
// const closeModalButton = document.querySelector(".modal__close");
// const saveButton = document.querySelector(".modal__save");

// // Function to open modal
// function openModal() {
//   modal.classList.add("modal_open");
// }

// // Function to close modal
// function closeModal() {
//   modal.classList.remove("modal_open");
// }

// // Function to save changes
// function saveChanges(evt) {
//   // Implement save functionality here
//   // For example, updating profile information
//   const profileName = document.querySelector(".profile__name");
//   const profileJob = document.querySelector(".profile__job");
//   const nameInput = document.querySelector('.modal__form-input[name="name"]');
//   const jobInput = document.querySelector('.modal__form-input[name="job"]');

//   evt.preventDefault();

//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;

//   closeModal();
// }

// Event listeners
// openModalButton.addEventListener("click", openModal);
// closeModalButton.addEventListener("click", closeModal);
// saveButton.addEventListener("click", saveChanges);

//Save submit button events
// find the form in the DOM
const profileForm = document.querySelector(".modal__form");

// find the form fields in the DOM
const nameInput = document.querySelector(".modal__name-input[name=`name`]");
const jobInput = document.querySelector(".modal__job-input[name=`job`]");

// find the profile elements in the DOM
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profession");

// the form submission handler. Note that its name
// starts with a verb and concisely describes what it does
function saveChanges(evt) {
  evt.preventDefault();

  // get the values of each field from the value property
  // of the corresponding input element
  const newName = nameInput.value;
  const newJob = jobInput.vlue;

  // insert new values into the textContent property of the
  // corresponding profile elements
  profileName.textContent = newName;
  profileJob.textContent = newJob;
}

// connect the handler to the form:
// it will watch the submit event
formElement.addEventListener("submit", saveChanges);

// const profileSaveButton = document.querySelector(".modal__save");
