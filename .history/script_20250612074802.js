
gsap.timeline()
  .from(".hero-text h1", {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  })
  .from(".hero-text p", {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }, "-=0.5")
  .from(".btn-glow", {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(1.7)"
  }, "-=0.4")
  .from(".hero-img", {
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
  }, "-=1");


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

