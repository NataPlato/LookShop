const swiperHeader = new Swiper(".swiper-header", {
  navigation: {
    nextEl: ".swiper-header__next",
    prevEl: ".swiper-header__prev",
  },
  speed: 1000,
  pagination: {
    el: ".swiper-header__pagination",
    type: "bullets",
    clickable: true,
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});

const swiperShop = new Swiper(".swiper-shop", {
  slidesPerView: 4.5,
  navigation: {
    nextEl: ".swiper-shop__next",
    prevEl: ".swiper-shop__prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 3.5
    },
    780: {
      slidesPerView: 4
    },
    970: {
      slidesPerView: 4.5
    },
    1200: {
      slidesPerView: 5
    },
  },
  speed: 1000,
});
