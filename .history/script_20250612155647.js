
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true, // Ensures infinite sliding and fills blank sides
  slidesPerView: "auto",
  initialSlide: 1, // Ensures a centered visible slide on start (optional tweak)
  autoplay: {
    delay: 2000, // 2 seconds
    disableOnInteraction: false, // Keeps autoplay running even after user swipes
  },
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


