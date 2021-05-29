"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const accordionBtn = document.querySelectorAll(".categories__block_title"),
      accordionTitle = document.querySelectorAll(".accordion__block_title");

  accordionBtn.forEach(e => {
    e.addEventListener("click", () => {
      accordionBtn.forEach(btn => {
        if (btn.classList.contains("categories__block_title-active") && btn !== e)
          btn.classList.remove("categories__block_title-active");
      });
      e.classList.toggle("categories__block_title-active");
    });
  });
  accordionTitle.forEach(e => {
    e.addEventListener("click", () => {
      accordionTitle.forEach(btn => {
        if (btn.classList.contains("accordion__block_title-active") && btn !== e)
          btn.classList.remove("accordion__block_title-active");
      });
      e.classList.toggle("accordion__block_title-active");
    });
  });
});
