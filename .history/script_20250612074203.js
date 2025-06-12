
gsap.from(".hero-title", {
  opacity: 0,
  x: -80,
  duration: 1.2,
  ease: "power3.out",
});

gsap.from(".hero-subtext", {
  opacity: 0,
  x: -80,
  delay: 0.4,
  duration: 1.2,
  ease: "power3.out",
});

gsap.from(".btn-consultation", {
  opacity: 0,
  y: 40,
  delay: 0.8,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".hero-img", {
  opacity: 0,
  x: 100,
  delay: 0.6,
  duration: 1.2,
  ease: "power3.out",
});




var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

