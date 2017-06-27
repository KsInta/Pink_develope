var message = document.querySelector(".form__btn--send");
var form_pink = document.querySelector(".form--pink");
var popup_failure = document.querySelector(".popup--failure");
var submit_failure = document.querySelector("#submit-failure");

var user_surname = form_pink.querySelector("#surname");
var user_name = form_pink.querySelector("#name");
var user_email = form_pink.querySelector("#email");

form_pink.addEventListener("submit", function(event) {
  if (!user_surname.value || !user_name.value || !user_email.value) {
    event.preventDefault();
    popup_failure.classList.add("popup--display");
  }
});

submit_failure.addEventListener("click", function(event) {
  event.preventDefault();
  if (popup_failure.classList.contains("popup--display")) {
    popup_failure.classList.remove("popup--display");
  }
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (popup_failure.classList.contains("popup--display")) {
      popup_failure.classList.remove("popup--display");
    }
  }
});
