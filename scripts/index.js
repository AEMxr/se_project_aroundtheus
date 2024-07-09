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
const modal = document.getElementById("modalEdit");
const modalOpen = document.getElementById("editButton");
const modalClose = document.getElementsByClassName("modal__close")[0];

modalOpen.addEventListener("click", function (event) {
  modal.style.display = "block";
});

modalClose.addEventListener("click", function (event) {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

//***Save submit button event***

// find the form in the DOM
const profileForm = document.querySelector(".modal__form");

// find the form fields in the DOM
const nameInput = document.getElementById("name");
const jobInput = document.getElementById("description");

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
  const newJob = jobInput.value;

  // insert new values into the textContent property of the
  // corresponding profile elements
  profileName.textContent = newName;
  profileJob.textContent = newJob;

  // Close the modal
  modal.style.display = "none";
}

// connect the handler to the form:
// it will watch the submit event
profileForm.addEventListener("submit", saveChanges);
