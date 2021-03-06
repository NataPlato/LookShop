const menu = document.querySelectorAll(".menu"),
  menuIcon = document.querySelectorAll(".menu-icon"),
  headerNav = document.querySelector(".header__nav"),
  footerNav = document.querySelector(".footer__nav_items"),
  selectItem = document.querySelectorAll(".select__item > span"),
  mainBlockNavItem = document.querySelectorAll(".main-block__nav-item");

let workWithMenu = function () {
  menuIcon.forEach(e => {
    e.addEventListener("click", function () {
      this.classList.contains("_active")
        ? this.classList.remove("_active")
        : this.classList.add("_active");
    });
  });
};
workWithMenu();

let workWithNav = function () {
  menu.forEach(e => {
    e.addEventListener("click", function () {
      if (this.classList.contains("footer__menu")) {
        footerNav.classList.contains("vizible-footer")
          ? footerNav.classList.remove("vizible-footer")
          : footerNav.classList.add("vizible-footer");
      } else {
        headerNav.classList.contains("vizible")
          ? headerNav.classList.remove("vizible")
          : headerNav.classList.add("vizible");
      }
    });
  });
};
workWithNav();

const selectSize = function () {
  selectItem.forEach(el => {
    el.addEventListener("click", function () {
      if (this.classList.contains("_active")) {
        this.classList.remove("_active");
      } else {
        this.classList.add("_active");
      }
    });
  });
};
selectSize();

const workWithProductsNav = () => {
  mainBlockNavItem.forEach(e => {
    e.addEventListener("click", function () {
      mainBlockNavItem.forEach(el => {
        if (el.classList.contains("nav-item_active")) {
          el.classList.remove("nav-item_active");
        }
        e.classList.add("nav-item_active");
      });
    });
  });
};
workWithProductsNav();
