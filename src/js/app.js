const menu = document.querySelectorAll(".menu"),
  menuIcon = document.querySelectorAll(".menu-icon"),
  headerNav = document.querySelector(".header__nav"),
  footerNav = document.querySelector(".footer__nav_items");


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
