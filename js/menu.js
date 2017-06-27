var page_header = document.querySelector(".page-header");

var main_nav = document.querySelector(".main-nav");
var main_menu = document.querySelector(".main-nav__list");
var main_menu_button = document.querySelector(".main-nav__toggle");

page_header.classList.add("page-header--opacity");
main_nav.classList.remove("no-js");

main_menu_button.addEventListener("click", function(event) {
  page_header.classList.toggle("page-header--opacity");
  main_nav.classList.toggle("main-nav--opened");
});
