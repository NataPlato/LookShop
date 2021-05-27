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
  navigation: {
    nextEl: ".swiper-shop__next",
    prevEl: ".swiper-shop__prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
    },
    780: {
      slidesPerView: 3.5,
    },
    970: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
  speed: 1000,
});

const swiperProducts = new Swiper(".swiper-products", {
  navigation: {
    nextEl: ".swiper-products__next",
    prevEl: ".swiper-products__prev",
  },
  speed: 1000,
  pagination: {
    el: ".swiper-products__pagination",
    type: "bullets",
    clickable: true,
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});

const paddingSlider = document.querySelector(".filter__line");
if (paddingSlider) {
  noUiSlider.create(paddingSlider, {
    start: [0, 200],
    connect: [false, true, false],
    range: {
      min: 0,
      max: 200,
    },
    format: wNumb({
      decimals: 0,
      thousand: ".",
      suffix: " $",
    }),
  });

  const skipValues = [
    document.getElementById("skip-value-lower"),
    document.getElementById("skip-value-upper"),
  ];

  paddingSlider.noUiSlider.on("update", function (values, handle) {
    skipValues[handle].innerHTML = values[handle];
  });
}
